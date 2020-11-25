import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Dialog,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
} from "@material-ui/core";
import { Settings as SettingsIcon } from "@material-ui/icons";
import * as React from "react";
import { useState } from "react";
import { useVideo } from "../hooks";

type Props = {
    instance: string;
};

type SettingsProps = Props & {
    settings: any;
    get: () => void;
    set: (video: string) => void;
};

type FormEventTarget = {
    videoURL: HTMLInputElement;
};

const SettingsForm: React.FC<SettingsProps> = (props) => {
    const [videoURL, setVideoURL] = useState(props.settings?.videoURL);

    const handleChange = async (event: React.ChangeEvent) => {
        event.preventDefault();

        setVideoURL(event.target.nodeValue);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const target = (event.target as unknown) as FormEventTarget;

        props.set(target.videoURL.value);
    };

    return (
        <Box paddingX={"2rem"} paddingBottom={"2rem"}>
            <form noValidate onSubmit={handleSubmit}>
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
                    onChange={handleChange}
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

const SettingsDialog: React.FC<SettingsProps> = (props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <IconButton onClick={() => setOpen(true)}>
                <SettingsIcon />
            </IconButton>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Settings</DialogTitle>
                <SettingsForm
                    instance={props.instance}
                    settings={props.settings}
                    get={props.get}
                    set={props.set}
                />
            </Dialog>
        </div>
    );
};

export const VideoComponent: React.FC<Props> = (props: Props) => {
    const {
        video,
        videoSettings,
        getVideoSettings,
        setVideoSettings,
    } = useVideo(props.instance);

    const loadingBody = (
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"1rem"}
        >
            <CircularProgress />
        </Box>
    );

    const loadedBody = (
        <CardContent>
            <Typography variant="h5" component="h2">
                {video?.name}
            </Typography>
            <Typography variant="body2" component="p">
                Likes: {video?.counters.likes}
                <br />
                Dislikes: {video?.counters.dislikes}
                <br />
                Comments: {video?.counters.comments}
                <br />
                Views: {video?.counters.views}
            </Typography>
        </CardContent>
    );

    return (
        <div>
            <Card>
                {video ? loadedBody : loadingBody}
                <CardActions>
                    <SettingsDialog
                        instance={props.instance}
                        settings={videoSettings}
                        get={getVideoSettings}
                        set={setVideoSettings}
                    />
                </CardActions>
            </Card>
        </div>
    );
};
