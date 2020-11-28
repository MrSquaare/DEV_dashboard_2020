import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Grid,
    makeStyles,
    TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSignIn } from "../../../hooks/authentication/signin";

const useStyle = makeStyles({
    alert: {
        margin: "1rem 0",
    },
    backdrop: {
        color: "#ffffff",
        zIndex: 100,
    },
    form: {
        margin: "1rem 0",
    },
});

export const SignInForm: React.FC = () => {
    const classes = useStyle();

    const { register, errors, handleSubmit } = useForm();
    const { signedIn, error, signIn } = useSignIn();
    const [loading, setLoading] = useState(false);

    const afterSubmit = (data: any) => {
        setLoading(true);

        signIn(data.username, data.password);
    };

    useEffect(() => {
        if (loading && (signedIn || error)) {
            setLoading(false);
        }
    }, [signedIn, error]);

    if (signedIn) {
        Router.push("/").catch((err) => console.error(err));
    }

    return (
        <Box>
            <Backdrop open={loading} className={classes.backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {error ? (
                <Alert severity="error" className={classes.alert}>
                    {error.message}
                </Alert>
            ) : null}
            {signedIn ? (
                <Alert severity="success" className={classes.alert}>
                    Success, redirecting...
                </Alert>
            ) : null}
            <form
                noValidate
                className={classes.form}
                onSubmit={handleSubmit(afterSubmit)}
            >
                <Grid container spacing={2}>
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
                            inputRef={register({ required: true })}
                            error={!!errors.username}
                            helperText={
                                errors.username &&
                                "A valid username is required"
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Password"
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="password"
                            variant="outlined"
                            fullWidth
                            inputRef={register({ required: true })}
                            error={!!errors.password}
                            helperText={
                                errors.password &&
                                "A valid password is required"
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Sign In
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};
