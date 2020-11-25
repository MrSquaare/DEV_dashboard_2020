import github from "@dashboard-web/service-github";
import twitter from "@dashboard-web/service-twitter";
import weather from "@dashboard-web/service-weather";
import youtube from "@dashboard-web/service-youtube";
import { Container } from "@material-ui/core";
import * as React from "react";

class IndexPage extends React.Component {
    render() {
        return (
            <Container component="main" maxWidth="xs">
                {github.widgets[0].create("1")}
                {github.widgets[0].create("2")}
                {twitter.widgets[0].create("1")}
                {weather.widgets[0].create("1")}
                {youtube.widgets[0].create("1")}
                {youtube.widgets[1].create("1")}
            </Container>
        );
    }
}

export default IndexPage;
