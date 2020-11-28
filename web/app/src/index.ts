import { Configuration, Core } from "@dashboard-web/core";
import GitHubService from "@dashboard-web/service-github";
import TwitterService from "@dashboard-web/service-twitter";
import WeatherService from "@dashboard-web/service-weather";
import YouTubeService from "@dashboard-web/service-youtube";

const configuration: Configuration = {
    services: [GitHubService, TwitterService, WeatherService, YouTubeService],
};
const core = new Core(configuration);

export default core;
