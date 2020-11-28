import {
    Box,
    CardContent,
    CircularProgress,
    Typography,
} from "@material-ui/core";
import * as React from "react";
import { useCity } from "../../hooks";

type Props = {
    instance: string;
};

export const CityContent: React.FC<Props> = (props: Props) => {
    const { city, error } = useCity(props.instance);

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

    const cityBody = (
        <div>
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
        </div>
    );

    return <div>{city ? cityBody : loadingBody}</div>;
};
