import { Button, Container, TextField, Typography } from "@material-ui/core";
import { ParsedUrlQuery } from "querystring";
import React from "react";

interface VerifyFormEventTarget extends EventTarget {
    verification: HTMLInputElement;
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
                        label="Verification ID"
                        id="verification"
                        name="verification"
                        autoComplete="verification"
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
            `http://localhost:4242/v1/authentication/verify?id=${target.verification.value}`
        );
        const json = await response.json();

        console.log(json);
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
