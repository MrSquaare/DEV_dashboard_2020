import {
    Button,
    Container,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import React from "react";

interface SignUpFormEventTarget extends EventTarget {
    username: HTMLInputElement;
    password: HTMLInputElement;
    email: HTMLInputElement;
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
}

class SignUpPage extends React.Component {
    render() {
        return (
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form onSubmit={this.handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="First Name"
                                id="firstName"
                                name="firstName"
                                autoComplete="firstName"
                                autoFocus
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Last Name"
                                id="lastName"
                                name="lastName"
                                autoComplete="lastName"
                                autoFocus
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Email"
                                id="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Username"
                                id="username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Password"
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="password"
                                autoFocus
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                </form>
            </Container>
        );
    }

    private handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const target = event.target as SignUpFormEventTarget;

        await fetch(
            "http://localhost:4242/v1/authentication/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: target.username.value,
                    password: target.password.value,
                    email: target.email.value,
                    firstName: target.firstName.value,
                    lastName: target.lastName.value,
                }),
            }
        );
    };
}

export default SignUpPage;
