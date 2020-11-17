import React, { Component } from "react";
import { Box } from "@material-ui/core";

interface IndexProps {
    data?: string;
    error?: string;
}

class IndexPage extends Component<IndexProps> {
    constructor(props: IndexProps) {
        super(props);
    }

    render() {
        return (
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                {this.props.data ? this.props.data : this.props.error}
            </Box>
        );
    }
}

export async function getServerSideProps() {
    try {
        const backendHost = process.env.BACKEND_HOST;

        const response = await fetch(`http://${backendHost}/api`);
        const data = await response.text();

        return {
            props: {
                data: data,
            },
        };
    } catch (e) {
        return {
            props: {
                error: e.toString(),
            },
        };
    }
}

export default IndexPage;
