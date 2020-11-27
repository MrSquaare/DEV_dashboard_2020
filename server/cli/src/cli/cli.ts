import { Command } from "commander";

const cli = new Command();

cli.version("1.0.0");

cli.option("-C, --config <path>", "configuration path");
cli.option(
    "-H, --hostname <hostname>",
    "hostname on which to start the application"
);
cli.option("-p, --port <port>", "port on which to start the application");

export default cli;
