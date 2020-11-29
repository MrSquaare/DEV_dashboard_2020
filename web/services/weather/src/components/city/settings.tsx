import { Box, Button, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCitySettings } from "../../hooks/city";

type Props = {
    instance: string;
    save?: () => void;
};

export const CitySettings: React.FC<Props> = (props) => {
    const { citySettings, error, setCitySettings } = useCitySettings(
        props.instance
    );
    const { register, errors, handleSubmit } = useForm();

    const [city, setCity] = useState("");

    useEffect(() => {
        setCity(citySettings?.city || "");
    }, [citySettings]);

    const afterSubmit = async (data: any) => {
        setCitySettings(data.city);

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
                    label="City"
                    id="city"
                    name="city"
                    autoComplete="city"
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    inputRef={register({ required: true })}
                    error={!!errors.city}
                    helperText={
                        errors.city && "A valid city is required"
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
