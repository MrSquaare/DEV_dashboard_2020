import { Core } from "@dashboard/core";
import cli from "./cli";
import { getConfiguration, getConfigurationFile } from "./configuration";

async function main() {
    cli.parse(process.argv);

    const file = getConfigurationFile(cli);
    const configuration = getConfiguration(cli, file);
    const core = new Core(configuration);

    process.on("SIGINT", () => core.stop());
    process.on("SIGTERM", () => core.stop());

    core.initialize();

    await core.start();

    console.info(
        `ready - started server on http://${core.hostname}:${core.port}`
    );
}

main().catch((e) => console.error(e));
