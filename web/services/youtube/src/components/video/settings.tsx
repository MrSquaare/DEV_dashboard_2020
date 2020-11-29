import { Box, Button, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useVideoSettings } from "../../hooks/video";

type Props = {
    instance: string;
    save?: () => void;
};

export const VideoSettings: React.FC<Props> = (props) => {
    const { videoSettings, error, setVideoSettings } = useVideoSettings(
        props.instance
    );
    const { register, errors, handleSubmit } = useForm();

    const [videoURL, setVideoURL] = useState("");

    useEffect(() => {
        setVideoURL(videoSettings?.videoURL || "");
    }, [videoSettings]);

    const afterSubmit = async (data: any) => {
        setVideoSettings(data.videoURL);

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
                    label="Video URL"
                    id="videoURL"
                    name="videoURL"
                    autoComplete="videoURL"
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={videoURL}
                    onChange={(e) => setVideoURL(e.target.value)}
                    inputRef={register({ required: true })}
                    error={!!errors.videoURL}
                    helperText={
                        errors.videoURL && "A valid video URL is required"
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
