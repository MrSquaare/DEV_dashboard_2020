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
import { useCity } from "../../hooks";

type Props = {
    instance: string;
};

type SettingsProps = Props & {
    settings: any;
    get: () => void;
    set: (city: string) => void;
};

type FormEventTarget = {
    city: HTMLInputElement;
};

const SettingsForm: React.FC<SettingsProps> = (props) => {
    const [city, setCity] = useState(props.settings?.city);

    const handleChange = async (event: React.ChangeEvent) => {
        event.preventDefault();

        setCity(event.target.nodeValue);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const target = (event.target as unknown) as FormEventTarget;

        props.set(target.city.value);
    };

    return (
        <Box paddingX={"2rem"} paddingBottom={"2rem"}>
            <form noValidate onSubmit={handleSubmit}>
                <TextField
                    required
                    label="City"
                    id="city"
                    name="city"
                    autoComplete="city"
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={city}
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

export const CityContent: React.FC<Props> = (props: Props) => {
    const { city, citySettings, getCitySettings, setCitySettings } = useCity(
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
            <Typography variant="h5" component="h2">
                {city?.name}
            </Typography>
            <Typography variant="h6" component="h4">
                {city?.weather.name}
            </Typography>
            <Typography variant="h6" component="h4">
                Temperature
            </Typography>
            <Typography variant="body2" component="p">
                Current: {city?.temperatures.current}
                <br />
                Feels: {city?.temperatures.feels}
                <br />
                Minimum: {city?.temperatures.min}
                <br />
                Maximum: {city?.temperatures.max}
            </Typography>
        </CardContent>
    );

    return (
        <div>
            <Card>
                {city ? loadedBody : loadingBody}
                <CardActions>
                    <SettingsDialog
                        instance={props.instance}
                        settings={citySettings}
                        get={getCitySettings}
                        set={setCitySettings}
                    />
                </CardActions>
            </Card>
        </div>
    );
};
