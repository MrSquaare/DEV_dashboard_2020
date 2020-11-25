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
import { useChannel } from "../hooks";

type Props = {
    instance: string;
};

type SettingsProps = Props & {
    settings: any;
    get: () => void;
    set: (channel: string) => void;
};

type FormEventTarget = {
    channelURL: HTMLInputElement;
};

const SettingsForm: React.FC<SettingsProps> = (props) => {
    const [channelURL, setChannelURL] = useState(props.settings?.channelURL);

    const handleChange = async (event: React.ChangeEvent) => {
        event.preventDefault();

        setChannelURL(event.target.nodeValue);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const target = (event.target as unknown) as FormEventTarget;

        props.set(target.channelURL.value);
    };

    return (
        <Box paddingX={"2rem"} paddingBottom={"2rem"}>
            <form noValidate onSubmit={handleSubmit}>
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

export const ChannelComponent: React.FC<Props> = (props: Props) => {
    const {
        channel,
        channelSettings,
        getChannelSettings,
        setChannelSettings,
    } = useChannel(props.instance);

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
                {channel?.name}
            </Typography>
            <Typography variant="body2" component="p">
                Subscribers: {channel?.counters.subscribers}
                <br />
                Views: {channel?.counters.views}
            </Typography>
        </CardContent>
    );

    return (
        <div>
            <Card>
                {channel ? loadedBody : loadingBody}
                <CardActions>
                    <SettingsDialog
                        instance={props.instance}
                        settings={channelSettings}
                        get={getChannelSettings}
                        set={setChannelSettings}
                    />
                </CardActions>
            </Card>
        </div>
    );
};
