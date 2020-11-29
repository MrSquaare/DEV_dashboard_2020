const GitHubService = require("@dashboard/service-github").default;
const TwitterService = require("@dashboard/service-twitter").default;
const WeatherService = require("@dashboard/service-weather").default;
const YouTubeService = require("@dashboard/service-youtube").default;

/**
 * @type {import("@dashboard/core").Configuration}
 */
module.exports = {
    services: [GitHubService, TwitterService, WeatherService, YouTubeService],
};
