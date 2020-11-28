import { Configuration, Core } from "@dashboard-web/core";
import GitHubService from "@dashboard-web/service-github";

const configuration: Configuration = {
    services: [GitHubService],
};
const core = new Core(configuration);

export default core;
