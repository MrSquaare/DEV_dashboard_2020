import {
    Box,
    CardContent,
    CircularProgress, makeStyles,
    Typography
} from "@material-ui/core";
import { Adjust, ArrowDownward, ArrowUpward, Flare, Remove } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import Image from "next/image";
import * as React from "react";
import { images } from "../../constants/images";
import { useCity } from "../../hooks";

type Props = {
    instance: string;
};

function convert(value: string): string {
    const celsius = parseFloat(value);

    return celsius.toFixed(1);
}

const useStyle = makeStyles({
    card: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
    },
});

export const CityContent: React.FC<Props> = (props: Props) => {
    const classes = useStyle();

    const { city, error } = useCity(props.instance);

    if (!city && !error) {
        return (
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                padding={"1rem"}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">Not Found or Maximum Rate Limit</Alert>;
    }

    return (
        <CardContent className={classes.card}>
            <Box display={"flex"} flexDirection={"column"}>
                <Box display={"flex"} justifyContent={"center"}>
                    <Image
                        src={images(city?.weather.id, city?.day)}
                        width={"64"}
                        height={"64"}
                    />
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        marginLeft={"1rem"}
                    >
                        <Typography variant="h5" component="h2">
                            {city?.name}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    marginTop={"2rem"}
                >
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography variant="body1" component="h3">
                            Current (°C)
                        </Typography>
                        <Box display={"flex"}>
                            <Adjust />
                            <Typography variant="h5" component="p">
                                {convert(city?.temperatures.current)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        marginLeft={"2rem"}
                    >
                        <Typography variant="body1" component="h3">
                            Feels (°C)
                        </Typography>
                        <Box display={"flex"}>
                            <Flare />
                            <Typography variant="h5" component="p">
                                {convert(city?.temperatures.feels)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        marginLeft={"2rem"}
                    >
                        <Typography variant="body1" component="h3">
                            Minimum (°C)
                        </Typography>
                        <Box display={"flex"}>
                            <ArrowDownward />
                            <Typography variant="h5" component="p">
                                {convert(city?.temperatures.min)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        marginLeft={"2rem"}
                    >
                        <Typography variant="body1" component="h3">
                            Maximum (°C)
                        </Typography>
                        <Box display={"flex"}>
                            <ArrowUpward />
                            <Typography variant="h5" component="p">
                                {convert(city?.temperatures.max)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </CardContent>
    );
};
