import { badRequestStatus, ServiceActionSettings } from "@dashboard/service";
import { ServiceActionRequest, ServiceActionResponse } from "@dashboard/types";
import { openWeatherMapKey } from "../constants";
import { WeatherCity } from "../models";
import fetch from "node-fetch";

type Settings = {
    city: string;
};

export class WeatherCityAction extends ServiceActionSettings<Settings> {
    readonly id: string = "city";
    readonly name: string = "City";
    readonly description: string = "City action";
    readonly settings: Record<keyof Settings, string> = {
        city: "string",
    };

    async run(request: ServiceActionRequest): Promise<ServiceActionResponse> {
        const settings = await this.settingsGet(
            request.user.username,
            request.instance
        );

        if (!settings) {
            throw badRequestStatus;
        }

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${settings.city}&appid=${openWeatherMapKey}`
        );

        if (response.status !== 200) {
            return {
                code: response.status,
            };
        }

        const jsonResponse = await response.json();

        const city = WeatherCity.fromJSON(jsonResponse);

        return {
            code: 200,
            data: city,
        };
    }

    mapRequestToSettings(request: ServiceActionRequest): Partial<Settings> {
        return {
            city: request.parameters?.city,
        };
    }
}
