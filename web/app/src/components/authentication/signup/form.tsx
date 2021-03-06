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
import React from "react";
import { useForm } from "react-hook-form";
import { emailRegex } from "../../../constants/regexs";
import { useSignUp } from "../../../hooks/authentication/signup";

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

export const SignUpForm: React.FC = () => {
    const classes = useStyle();
    const { register, errors, handleSubmit } = useForm();
    const { loading, signedUp, error, signUp } = useSignUp();

    const afterSubmit = async (data: any) => {
        await signUp(
            data.username,
            data.password,
            data.email,
            data.firstName,
            data.lastName
        );
    };

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
            {signedUp ? (
                <Alert severity="success" className={classes.alert}>
                    Success, an email has been sent to verify your account.
                </Alert>
            ) : null}
            <form
                noValidate
                className={classes.form}
                onSubmit={handleSubmit(afterSubmit)}
            >
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
                            inputRef={register({ required: true })}
                            error={!!errors.firstName}
                            helperText={
                                errors.firstName &&
                                "A valid first name is required"
                            }
                            color={"secondary"}
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
                            inputRef={register({ required: true })}
                            error={!!errors.lastName}
                            helperText={
                                errors.lastName &&
                                "A valid last name is required"
                            }
                            color={"secondary"}
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
                            inputRef={register({
                                required: true,
                                pattern: emailRegex,
                            })}
                            error={!!errors.email}
                            helperText={
                                errors.email && "A valid email is required"
                            }
                            color={"secondary"}
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
                            inputRef={register({ required: true })}
                            error={!!errors.username}
                            helperText={
                                errors.username &&
                                "A valid username is required"
                            }
                            color={"secondary"}
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
                            inputRef={register({ required: true })}
                            error={!!errors.password}
                            helperText={
                                errors.password &&
                                "A valid password is required"
                            }
                            color={"secondary"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                        >
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};
