import {
    Box,
    CircularProgress,
    Typography,
} from "@material-ui/core";
import * as React from "react";
import { images } from "../../constants/images";
import { useCity } from "../../hooks";
import Image from "next/image";

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
            <Typography variant="h5" component="h2" align={"center"}>
                {city?.name}
            </Typography>

            <Image src={images(city?.weather.id, city?.day)} width={"64"} height={"64"}/>

            <Typography variant="h5" component="h3" align={"center"}>
                {city?.weather.main}
            </Typography>

            <Typography variant="body2" component="p" align={"center"}>
                Current: { (Number.parseFloat(city?.temperatures.current) - 273.15).toFixed(1) }
                <br />
                Feels: { (Number.parseFloat(city?.temperatures.feels) - 273.15).toFixed(1) }
                <br />
                Minimum: { (Number.parseFloat(city?.temperatures.current) - 273.15).toFixed(1) }
                <br />
                Maximum: { (Number.parseFloat(city?.temperatures.current) - 273.15).toFixed(1) }
            </Typography>
        </div>
    );

    return <div>{city ? cityBody : loadingBody}</div>;
};
