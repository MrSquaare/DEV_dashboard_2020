import {
    Box,
    CircularProgress,
    Typography,
} from "@material-ui/core";
import * as React from "react";
import { useCity } from "../../hooks";
import Image from "next/image";

type Props = {
    instance: string;
};

const WeatherImages = (weatherID: number, day: string) => {
    switch (weatherID) {
        case 200:
        case 201:
        case 202:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
            return "/assets/images/005-thunderstorm.png"

        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            return "/assets/images/060-rain.png"

        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
            return "/assets/images/002-rain.png"

        case 511:
            return "/assets/images/043-winter.png"

        case 520:
        case 521:
        case 522:
        case 531:
            return "/assets/images/004-storm.png"

        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
            return "/assets/images/006-blizzard.png"

        case 701:
        case 711:
        case 721:
        case 731:
        case 741:
        case 751:
        case 761:
        case 762:
        case 771:
        case 781:
            return "/assets/images/014-cloud.png"

        case 800:
            if (day === "day") {
                return "/assets/images/029-sunrise.png";
            } else {
                return "/assets/images/031-night.png";
            }

        case 801:
        case 802:
        case 803:
        case 804:
            return "/assets/images/013-cloudy.png"

        default:
            return "/assets/images/029-sunrise.png";
    }
}

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

            <Image src={WeatherImages(city?.weather.id, city?.day)} width={"64"} height={"64"}/>

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
