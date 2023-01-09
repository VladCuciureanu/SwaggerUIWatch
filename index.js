"use strict";

var fs = require("fs");
var open = require("open");
var express = require("express");
var chokidar = require("chokidar");
var swaggerParser = require("@apidevtools/swagger-parser");
var path = require("path");
var swaggerEditorDist = path.dirname(
  require.resolve("swagger-editor-dist/index.html")
);

var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

function bundle(swaggerFile) {
  return swaggerParser.bundle(swaggerFile);
}

function start(
  swaggerFile,
  targetDir,
  port,
  hostname,
  openBrowser,
  swaggerUIOptions
) {
  app.get("/", function (_req, res) {
    res.sendFile(__dirname + "/index.html");
  });

  app.use(express.static(swaggerEditorDist));
  app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  io.on("connection", function (socket) {
    socket.on("swaggerReady", function (_data) {
      bundle(swaggerFile).then(
        function (bundled) {
          socket.emit("updateSpec", JSON.stringify(bundled));
        },
        function (err) {
          socket.emit("showError", err.message);
        }
      );
    });
    socket.once("uiReady", function (_data) {
      socket.emit("swaggerOptions", swaggerUIOptions);
    });
  });

  chokidar.watch(targetDir).on("change", function (_eventType, _name) {
    bundle(swaggerFile).then(
      function (bundled) {
        console.log("File changed. Sent updated spec to the browser.");
        var bundleString = JSON.stringify(bundled, null, 2);
        io.sockets.emit("updateSpec", bundleString);
      },
      function (err) {
        io.sockets.emit("showError", err.message);
      }
    );
  });

  server.listen(port, hostname, function () {
    var serverUrl = `http://${hostname}:${port}`;
    console.log(`Listening on ${serverUrl}`);
    if (openBrowser) open(serverUrl);
  });
}

function build(swaggerFile, _targetDir, bundleTo) {
  bundle(swaggerFile).then(
    function (bundled) {
      var bundleString = JSON.stringify(bundled, null, 2);
      if (typeof bundleTo === "string") {
        fs.writeFile(bundleTo, bundleString, function (err) {
          if (err) {
            io.sockets.emit("showError", err);
            return;
          }
          console.log("Saved bundle file at " + bundleTo);
        });
      }
    },
    function (err) {
      io.sockets.emit("showError", err.message);
    }
  );
}

module.exports = {
  start: start,
  build: build,
};
