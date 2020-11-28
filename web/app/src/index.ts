import { Configuration, Core } from "@dashboard-web/core";
import GitHubService from "@dashboard-web/service-github";
import TwitterService from "@dashboard-web/service-twitter";

const configuration: Configuration = {
    services: [GitHubService, TwitterService],
};
const core = new Core(configuration);

export default core;
