import { Box, Button, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../../hooks/authentication";
import { useFollowingSettings } from "../../hooks/following";
import { SignIn } from "../buttons/signin";

type Props = {
    instance: string;
    save?: () => void;
};

export const FollowingSettings: React.FC<Props> = (props) => {
    const { authentication, getAuthentication } = useAuthentication();
    const {
        followingSettings,
        error,
        setFollowingSettings,
    } = useFollowingSettings(props.instance);
    const { register, errors, handleSubmit } = useForm();

    const [username, setUsername] = useState("");

    useEffect(() => {
        setUsername(followingSettings?.user || "");
    }, [followingSettings]);

    const afterSubmit = async (data: any) => {
        setFollowingSettings(data.username);

        if (props.save) {
            props.save();
        }
    };

    return (
        <Box padding={"2rem"}>
            {error ? <Alert severity="error">{error.message}</Alert> : null}
            {!authentication ? (
                <SignIn getAuthentication={getAuthentication} />
            ) : (
                <form noValidate onSubmit={handleSubmit(afterSubmit)}>
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        inputRef={register({ required: true })}
                        error={!!errors.username}
                        helperText={
                            errors.username && "A valid username is required"
                        }
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Save
                    </Button>
                </form>
            )}
        </Box>
    );
};
