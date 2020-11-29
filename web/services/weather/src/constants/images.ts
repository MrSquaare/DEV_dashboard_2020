export const images = (weatherID: number, day: string) => {
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
            return "/assets/images/thunderstorm.png";

        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            return "/assets/images/sun-rain.png";

        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
            return "/assets/images/rain.png";

        case 511:
            return "/assets/images/winter.png";

        case 520:
        case 521:
        case 522:
        case 531:
            return "/assets/images/storm.png";

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
            return "/assets/images/blizzard.png";

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
            return "/assets/images/cloud.png";

        case 800:
            if (day === "day") {
                return "/assets/images/sunrise.png";
            } else {
                return "/assets/images/night.png";
            }

        case 801:
        case 802:
        case 803:
        case 804:
            return "/assets/images/cloudy.png";

        default:
            return "/assets/images/sunrise.png";
    }
};
