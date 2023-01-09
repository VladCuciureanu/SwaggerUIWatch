import { execSync } from "child_process";
import { getVersion } from "./getVersion.js";
import { logger } from "./logger.js";

export const renderVersionWarning = (npmVersion: string) => {
  const currentVersion = getVersion();

  //   console.log("current", currentVersion);
  //   console.log("npm", npmVersion);

  if (currentVersion !== npmVersion) {
    logger.warn("  You are using an outdated version of swagger-ui-watch.");
    logger.warn(
      "  Your version:",
      currentVersion + ".",
      "Latest version in the npm registry:",
      npmVersion,
    );
    logger.warn("  Please run the CLI with @latest to get the latest updates.");
  }
  console.log("");
};

import https from "https";

type DistTagsBody = {
  latest: string;
};

function checkForLatestVersion(): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(
        "https://registry.npmjs.org/-/package/swagger-ui-watch/dist-tags",
        (res) => {
          if (res.statusCode === 200) {
            let body = "";
            res.on("data", (data) => (body += data));
            res.on("end", () => {
              resolve((JSON.parse(body) as DistTagsBody).latest);
            });
          } else {
            reject();
          }
        },
      )
      .on("error", () => {
        // logger.error("Unable to check for latest version.");
        reject();
      });
  });
}

export const getNpmVersion = () =>
  // `fetch` to the registry is faster than `npm view` so we try that first
  checkForLatestVersion().catch(() => {
    try {
      return execSync("npm view swagger-ui-watch version").toString().trim();
    } catch {
      return null;
    }
  });
