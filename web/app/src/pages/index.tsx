import github from "@dashboard-web/service-github";
import twitter from "@dashboard-web/service-twitter";
import { Container } from "@material-ui/core";
import * as React from "react";

class IndexPage extends React.Component {
    render() {
        return (
            <Container component="main" maxWidth="xs">
                {github.widgets[0].create("1")}
                {github.widgets[0].create("2")}
                {twitter.widgets[0].create("1")}
            </Container>
        );
    }
}

export default IndexPage;
