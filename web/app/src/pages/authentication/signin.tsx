import { Button, Container, TextField, Typography } from "@material-ui/core";
import Router from "next/router";
import React from "react";

interface SignInFormEventTarget extends EventTarget {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

class SignInPage extends React.Component {
    render() {
        return (
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5">
                    Sign in
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
                    />
                    <TextField
                        required
                        label="Password"
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Sign In
                    </Button>
                </form>
            </Container>
        );
    }

    private handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const target = event.target as SignInFormEventTarget;

        const response = await fetch(
            "http://localhost:4242/v1/authentication/signin",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: target.username.value,
                    password: target.password.value,
                }),
            }
        );
        const text = await response.text();

        console.log(text);

        const json = await response.json();

        sessionStorage.setItem("token", JSON.stringify(json["data"]));

        await Router.push("/");
    };
}

export default SignInPage;
