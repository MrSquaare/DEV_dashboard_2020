interface IWeatherCity {
    id: number;
    name: string;
    day: string;
    weather: {
        id: number,
        name: string;
        description: string;
    };
    temperatures: {
        current: number;
        feels: number;
        min: number;
        max: number;
    };
}

export class WeatherCity implements IWeatherCity {
    id: number;
    name: string;
    day: string;
    weather: {
        id: number,
        name: string;
        description: string;
    };
    temperatures: {
        current: number;
        feels: number;
        min: number;
        max: number;
    };

    constructor(weather: IWeatherCity) {
        this.id = weather.id;
        this.name = weather.name;
        this.day = weather.day;
        this.weather = weather.weather;
        this.temperatures = weather.temperatures;
    }

    static fromJSON(json: any): WeatherCity {
        return new WeatherCity({
            id: json.id,
            name: json.name,
            day: (json.weather[0].icon.slice(-1) === 'd') ? "day" : "night",
            weather: {
                id: json.weather[0].id,
                name: json.weather[0].main,
                description: json.weather[0].description,
            },
            temperatures: {
                current: json.main?.temp,
                feels: json.main?.feels_like,
                min: json.main?.temp_min,
                max: json.main?.temp_max,
            },
        });
    }
}
