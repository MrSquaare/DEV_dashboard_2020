import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    IconButton,
    Modal,
    TextField,
    Typography,
} from "@material-ui/core";
import { Settings as SettingsIcon } from "@material-ui/icons";
import * as React from "react";
import { useState } from "react";
import { useUser } from "../hooks";

type Props = {
    instance: string;
};

type SettingsProps = Props & {
    settings: any;
    get: () => void;
    set: (user: string) => void;
};

type SettingsFormEventTarget = {
    username: HTMLInputElement;
};

const Settings: React.FC<SettingsProps> = (props) => {
    const [username, setUsername] = useState(props.settings?.user);

    const handleChange = async (event: React.ChangeEvent) => {
        event.preventDefault();

        setUsername(event.target.nodeValue);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const target = (event.target as unknown) as SettingsFormEventTarget;

        props.set(target.username.value);
    };

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Box bgcolor={"white"} padding={"2rem"}>
                <Typography component="h1" variant="h5">
                    Settings
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
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
        </Box>
    );
};

const SettingsModal: React.FC<SettingsProps> = (props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <IconButton onClick={() => setOpen(true)}>
                <SettingsIcon />
            </IconButton>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Settings
                    instance={props.instance}
                    settings={props.settings}
                    get={props.get}
                    set={props.set}
                />
            </Modal>
        </div>
    );
};

export const UserComponent: React.FC<Props> = (props: Props) => {
    const { user, userSettings, getUserSettings, setUserSettings } = useUser(
        props.instance
    );

    const loadingBody = (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} padding={"1rem"}>
            <CircularProgress />
        </Box>
    );

    const loadedBody = (
        <CardContent>
            <Typography gutterBottom>{user?.name}</Typography>
            <Typography variant="h5" component="h2">
                {user?.username}
            </Typography>
            <Typography variant="body2" component="p">
                Followers: {user?.counters.followers}
                <br />
                Following: {user?.counters.following}
            </Typography>
        </CardContent>
    );

    return (
        <div>
            <Card>
                {user ? loadedBody : loadingBody}
                <CardActions>
                    <SettingsModal
                        instance={props.instance}
                        settings={userSettings}
                        get={getUserSettings}
                        set={setUserSettings}
                    />
                </CardActions>
            </Card>
        </div>
    );
};
