import { Command } from "commander";
import { SWAGGER_UI_WATCH } from "~/constants.js";
import { getVersion } from "~/utils/getVersion.js";

interface CliFlags {
  port: number;
  host: string;
  bundlePath?: string;
  configPath?: string;
  swaggerFilePath?: string;
  targetPath?: string;
  openBrowser: boolean;
}

interface CliResults {
  flags: CliFlags;
}

export const runCli = async () => {
  const program = new Command().name(SWAGGER_UI_WATCH);

  let targetPath: string | undefined = undefined;
  let swaggerFilePath: string | undefined = undefined;

  program
    .description(
      "A hot-reloading Swagger UI server. See live updates to your OpenAPI specifications!",
    )
    .arguments("[swaggerFile] [targetDir]")
    .option("-p, --port <port>", "Port to be used. Default is 8000", "8000")
    .option(
      "-h, --host <Hostname|Ip>",
      "Host to be used. Default is 127.0.0.1",
      "127.0.0.1",
    )
    .option(
      "-b, --bundle <bundleTo>",
      "Create bundle and save it to bundleTo",
      undefined,
    )
    .option(
      "-c, --config <JSON file>",
      "Path to json file containing swagger ui options",
      undefined,
    )
    .option(
      "--no-open",
      "Do not open the view page in the default browser",
      false,
    )
    .version(getVersion(), "-v, --version", "Display the version number")
    .action((swaggerFile: string, targetDir: string) => {
      targetPath = targetDir;
      swaggerFilePath = swaggerFile;
    })
    .parse(process.argv);

  const options = program.opts();

  const cliResults: CliResults = {
    flags: {
      port: Number(options.port),
      host: options.host,
      bundlePath: options.bundle,
      configPath: options.config,
      swaggerFilePath: swaggerFilePath,
      targetPath: targetPath,
      openBrowser: options.open,
    },
  };

  return cliResults;
};
