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
import { useUser } from "../hooks";
import { useAuthentication } from "../hooks/authentication";

type Props = {
    instance: string;
};

type SettingsProps = Props & {
    settings: any;
    get: () => void;
    set: (user: string) => void;
};

type SignInProps = {
    authenticate: () => void;
};

type FormEventTarget = {
    username: HTMLInputElement;
};

const SignInButton: React.FC<SignInProps> = (props) => {
    const handleClick = async (event: React.MouseEvent) => {
        props.authenticate();
    };

    return (
        <Button variant="contained" color="primary" onClick={handleClick}>
            Login to GitHub
        </Button>
    );
};

const SettingsForm: React.FC<SettingsProps> = (props) => {
    const [username, setUsername] = useState(props.settings?.user);
    const { authenticated, authenticate } = useAuthentication();

    const handleChange = async (event: React.ChangeEvent) => {
        event.preventDefault();

        setUsername(event.target.nodeValue);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const target = (event.target as unknown) as FormEventTarget;

        props.set(target.username.value);
    };

    return (
        <Box paddingX={"2rem"} paddingBottom={"2rem"}>
            {!authenticated ? (
                <SignInButton authenticate={authenticate} />
            ) : null}
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

export const UserComponent: React.FC<Props> = (props: Props) => {
    const { user, userSettings, getUserSettings, setUserSettings } = useUser(
        props.instance
    );

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
                    <SettingsDialog
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
