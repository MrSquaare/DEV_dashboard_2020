import { Box, Button, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useChannelSettings } from "../../hooks/channel";

type Props = {
    instance: string;
    save?: () => void;
};

export const ChannelSettings: React.FC<Props> = (props) => {
    const { channelSettings, error, setChannelSettings } = useChannelSettings(
        props.instance
    );
    const { register, errors, handleSubmit } = useForm();

    const [channelURL, setChannelURL] = useState("");

    useEffect(() => {
        setChannelURL(channelSettings?.channelURL || "");
    }, [channelSettings]);

    const afterSubmit = async (data: any) => {
        setChannelSettings(data.channelURL);

        if (props.save) {
            props.save();
        }
    };

    return (
        <Box padding={"2rem"}>
            {error ? <Alert severity="error">{error.message}</Alert> : null}
            <form noValidate onSubmit={handleSubmit(afterSubmit)}>
                <TextField
                    required
                    label="Channel URL"
                    id="channelURL"
                    name="channelURL"
                    autoComplete="channelURL"
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={channelURL}
                    onChange={(e) => setChannelURL(e.target.value)}
                    inputRef={register({ required: true })}
                    error={!!errors.channelURL}
                    helperText={
                        errors.channelURL &&
                        "A valid channelURL URL is required"
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
        </Box>
    );
};
