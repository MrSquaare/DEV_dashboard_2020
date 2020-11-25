interface IWeatherCity {
    id: number;
    name: string;
    weather: {
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
    weather: {
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
        this.weather = weather.weather;
        this.temperatures = weather.temperatures;
    }

    static fromJSON(json: any) {
        return new WeatherCity({
            id: json.weather?.id,
            name: json.name,
            weather: {
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
