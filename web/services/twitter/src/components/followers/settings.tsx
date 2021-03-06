import { Box, Button, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../../hooks/authentication";
import { useFollowersSettings } from "../../hooks/followers";
import { SignIn } from "../buttons/signin";

type Props = {
    instance: string;
    save?: () => void;
};

export const FollowersSettings: React.FC<Props> = (props) => {
    const { authentication, getAuthentication } = useAuthentication();
    const {
        followersSettings,
        error,
        setFollowersSettings,
    } = useFollowersSettings(props.instance);
    const { register, errors, handleSubmit } = useForm();

    const [username, setUsername] = useState("");

    useEffect(() => {
        setUsername(followersSettings?.user || "");
    }, [followersSettings]);

    const afterSubmit = async (data: any) => {
        setFollowersSettings(data.username);

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
                        color={"secondary"}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                    >
                        Save
                    </Button>
                </form>
            )}
        </Box>
    );
};
