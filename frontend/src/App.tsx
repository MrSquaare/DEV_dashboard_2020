import React, { Component } from "react";
import { Box } from "@material-ui/core";
import Backend from "./components/Backend";

interface AppProps {
    backendHost: string;
}

class App extends Component<AppProps> {
    constructor(props: AppProps) {
        super(props);
    }

    render() {
        return (
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Backend host={this.props.backendHost} />
            </Box>
        );
    }
}

export default App;
