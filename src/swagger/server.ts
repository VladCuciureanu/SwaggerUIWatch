import { Server } from "socket.io";
import { createServer } from "http";
import chokidar from "chokidar";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import swaggerParser from "@apidevtools/swagger-parser";
import open from "open";

export default function startServer(
  swaggerFilePath: string,
  targetPath: string,
  port: number,
  host: string,
  openBrowser: boolean,
  swaggerUIOptions: { [id: string]: any },
) {
  const app = express();
  const server = createServer(app);
  const io = new Server(server);

  const __dirname = dirname(fileURLToPath(import.meta.url));

  const swaggerEditorDist = path.dirname(
    __dirname + "/../node_modules/swagger-editor-dist/index.html",
  );

  app.get("/", function (_req, res) {
    res.sendFile(__dirname + "/index.html");
  });

  app.use(express.static(swaggerEditorDist));
  app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );
    next();
  });

  io.on("connection", function (socket) {
    socket.on("swaggerReady", function (_data) {
      swaggerParser.bundle(swaggerFilePath).then(
        function (bundled) {
          socket.emit("updateSpec", JSON.stringify(bundled));
        },
        function (err) {
          socket.emit("showError", err.message);
        },
      );
    });
    socket.once("uiReady", function (_data) {
      socket.emit("swaggerOptions", swaggerUIOptions);
    });
  });

  chokidar.watch(targetPath).on("change", function (_eventType, _name) {
    swaggerParser.bundle(swaggerFilePath).then(
      function (bundled) {
        console.log("File changed. Sent updated spec to the browser.");
        const bundleString = JSON.stringify(bundled, null, 2);
        io.sockets.emit("updateSpec", bundleString);
      },
      function (err) {
        io.sockets.emit("showError", err.message);
      },
    );
  });

  server.listen(port, host, function () {
    const serverUrl = `http://${host}:${port}`;
    console.log(`🎊 Listening on ${serverUrl}`);
    if (openBrowser) void open(serverUrl);
  });
}
