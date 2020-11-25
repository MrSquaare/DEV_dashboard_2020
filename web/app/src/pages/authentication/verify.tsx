import { Button, Container, TextField, Typography } from "@material-ui/core";
import { ParsedUrlQuery } from "querystring";
import React from "react";

interface VerifyFormEventTarget extends EventTarget {
    username: HTMLInputElement;
    id: HTMLInputElement;
}

interface VerifyProps {
    query: ParsedUrlQuery;
}

class VerifyPage extends React.Component<VerifyProps> {
    render() {
        return (
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5">
                    Verify
                </Typography>
                <form onSubmit={this.handleSubmit} noValidate>
                    <TextField
                        required
                        label="Username"
                        id="username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={this.props.query.username}
                    />
                    <TextField
                        required
                        label="ID"
                        id="id"
                        name="id"
                        autoComplete="id"
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={this.props.query.id}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Verify
                    </Button>
                </form>
            </Container>
        );
    }

    private handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const target = event.target as VerifyFormEventTarget;

        const response = await fetch(
            `http://localhost:4242/v1/authentication/verify?username=${target.username.value}&id=${target.id.value}`
        );

        if (response.status !== 200) {
            return;
        }

        const json = await response.json();

        sessionStorage.setItem("jwt", json["data"]);
    };
}

export function getServerSideProps({ query }: VerifyProps) {
    return {
        props: {
            query: query,
        },
    };
}

export default VerifyPage;
