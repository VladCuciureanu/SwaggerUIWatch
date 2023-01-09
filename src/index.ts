import path from "path";
import { runCli } from "./cli/index.js";
import { logger } from "./utils/logger.js";
import * as fs from "fs";
import bundleFile from "./swagger/bundle.js";
import startServer from "./swagger/server.js";
// import {
//   getNpmVersion,
//   renderVersionWarning,
// } from "./utils/renderVersionWarning.js";

const main = async () => {
  // const npmVersion = await getNpmVersion();
  // npmVersion && renderVersionWarning(npmVersion);

  const cliResult = await runCli().then((result) => result.flags);

  const { host, bundlePath, configPath, openBrowser } = cliResult;

  let { swaggerFilePath, targetPath, port } = cliResult;

  if (swaggerFilePath === undefined) {
    throw new Error("❗ Missing required argument: swaggerFile");
  }

  if (targetPath === undefined) {
    try {
      if (!path.isAbsolute(swaggerFilePath)) {
        swaggerFilePath = path.resolve(process.cwd(), swaggerFilePath);
      }
      targetPath = path.dirname(swaggerFilePath);
    } catch (err) {
      console.error(`❗ Failed to resolve path to [targetDir].`);
      process.exit(1);
    }
  }

  if (Number.isNaN(port)) {
    port = 8000;
  }

  if (bundlePath === swaggerFilePath) {
    console.error("❗ <bundle> value cannot be same as <swaggerFile> value.");
    process.exit(1);
  }

  if (!fs.existsSync(targetPath)) {
    console.error(targetPath + " does not exist.");
    process.exit(1);
  }

  if (!fs.existsSync(swaggerFilePath)) {
    console.error(swaggerFilePath + " does not exist.");
    process.exit(1);
  }

  let swaggerUIOptions = {};

  if (configPath) {
    swaggerUIOptions = JSON.parse(fs.readFileSync(configPath).toString());
  }

  if (bundlePath === undefined) {
    startServer(
      swaggerFilePath,
      targetPath,
      port,
      host,
      openBrowser,
      swaggerUIOptions,
    );
  } else {
    bundleFile(swaggerFilePath, targetPath, bundlePath);
    process.exit(0);
  }
};

main().catch((err) => {
  logger.error("An error occured while running Swagger UI...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:",
    );
    console.log(err);
  }
  process.exit(1);
});
