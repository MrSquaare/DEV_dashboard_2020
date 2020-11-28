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

    const [channel, setChannel] = useState("");

    useEffect(() => {
        setChannel(channelSettings?.channel || "");
    }, [channelSettings]);

    const afterSubmit = async (data: any) => {
        setChannelSettings(data.channel);

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
                    label="channel"
                    id="channel"
                    name="channel"
                    autoComplete="channel"
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    inputRef={register({ required: true })}
                    error={!!errors.channel}
                    helperText={
                        errors.channel && "A valid channel is required"
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
        </Box>
    );
};
