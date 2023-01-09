import swaggerParser from "@apidevtools/swagger-parser";
import * as fs from "fs";
import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";

export default function bundleFile(
  swaggerFilePath: string,
  _targetPath: string | undefined,
  bundlePath: string,
) {
  const app = express();
  const server = createServer(app);
  const io = new Server(server);

  swaggerParser.bundle(swaggerFilePath).then(
    function (bundled) {
      const bundleString = JSON.stringify(bundled, null, 2);
      if (typeof bundlePath === "string") {
        fs.writeFile(bundlePath, bundleString, function (err) {
          if (err) {
            io.emit("showError", err);
            return;
          }
          console.log("💾 Saved bundle file at " + bundlePath);
        });
      }
    },
    function (err) {
      io.sockets.emit("showError", err.message);
    },
  );
}
