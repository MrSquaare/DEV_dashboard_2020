import { Button, Container, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useAuthentication } from "../../hooks/authentication/parties";

interface SignInFormEventTarget extends EventTarget {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

const TwitterButton: React.FC = () => {
    const { authenticate } = useAuthentication();

    const handleClick = async (event: React.MouseEvent) => {
        authenticate();
    };

    return (
        <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClick}
        >
            SignIn with Twitter
        </Button>
    );
};

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
                <TwitterButton />
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

        if (response.status !== 200) {
            return;
        }

        const json = await response.json();

        sessionStorage.setItem("jwt", json["data"]);
    };
}

export default SignInPage;
