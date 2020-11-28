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

    const [video, setVideo] = useState("");

    useEffect(() => {
        setVideo(videoSettings?.video || "");
    }, [videoSettings]);

    const afterSubmit = async (data: any) => {
        setVideoSettings(data.video);

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
                    label="video"
                    id="video"
                    name="video"
                    autoComplete="video"
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                    inputRef={register({ required: true })}
                    error={!!errors.video}
                    helperText={
                        errors.video && "A valid video is required"
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
