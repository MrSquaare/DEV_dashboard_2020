const GitHubService = require("@dashboard/service-github").default;
const TwitterService = require("@dashboard/service-twitter").default;
const WeatherService = require("@dashboard/service-weather").default;
const YouTubeService = require("@dashboard/service-youtube").default;

/**
 * @type {import("@dashboard/core").Configuration}
 */
module.exports = {
    port: "4242",
    mailer: {
        hostname: "smtp.gmail.com",
        port: 465,
        user: "noreply.dashboard.project@gmail.com",
        password: "7$ER*Q9gT@9u5B",
    },
    services: [GitHubService, TwitterService, WeatherService, YouTubeService],
};
