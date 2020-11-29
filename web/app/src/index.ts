import { Configuration, Core } from "@dashboard-web/core";
import GitHubService from "@dashboard-web/service-github";
import TwitterService from "@dashboard-web/service-twitter";
import WeatherService from "@dashboard-web/service-weather";

const configuration: Configuration = {
    services: [GitHubService, TwitterService, WeatherService],
};
const core = new Core(configuration);

export default core;
