import React, { Component } from "react";

interface BackendProps {
    host: string;
}

interface BackendStates {
    data: string | null;
    error: string | null;
}

class Backend extends Component<BackendProps, BackendStates> {
    constructor(props: BackendProps) {
        super(props);

        this.state = {
            data: null,
            error: null,
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch(`${this.props.host}/api`);
            const data = await response.text();

            this.setState({
                data: data,
            });
        } catch (e) {
            this.setState({
                error: e.toString(),
            });
        }
    }

    render() {
        if (this.state.data) {
            return <div>Data: {this.state.data}</div>;
        }

        if (this.state.error) {
            return <div>Error: ${this.state.error}</div>;
        }

        return <div>Loading...</div>;
    }
}

export default Backend;
