import { WeatherCity } from "@dashboard/service-weather";
import { useEffect, useState } from "react";

async function apiGetCity(instance: string): Promise<WeatherCity> {
    const response = await fetch(
        `http://localhost:4242/v1/services/weather/city?instance=${instance}`,
        {
            headers: {
                authorization: `JWT ${sessionStorage.getItem("jwt")}`,
            },
        }
    );

    const json = await response.json();

    return json["data"];
}

async function apiGetCitySettings(instance: string): Promise<any> {
    const response = await fetch(
        `http://localhost:4242/v1/services/weather/city/settings?instance=${instance}`,
        {
            headers: {
                Authorization: `JWT ${sessionStorage.getItem("jwt")}`,
            },
        }
    );
    const json = await response.json();

    return json["data"];
}

async function apiSetCitySettings(
    instance: string,
    city: string
): Promise<any> {
    const response = await fetch(
        `http://localhost:4242/v1/services/weather/city/settings?instance=${instance}`,
        {
            method: "POST",
            headers: {
                Authorization: `JWT ${sessionStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                city: city,
            }),
        }
    );
    const json = await response.json();

    return json["data"];
}

export function useCity(instance: string) {
    const [city, setCityState] = useState<WeatherCity>();
    const [citySettings, setCitySettingsState] = useState<any>();

    const getCity = () => {
        apiGetCity(instance).then((city) => setCityState(city));
    };

    const getCitySettings = () => {
        apiGetCitySettings(instance).then((citySettings) =>
            setCitySettingsState(citySettings)
        );
    };

    const setCitySettings = (city: string) => {
        apiSetCitySettings(instance, city).then((citySettings) => {
            setCitySettingsState(citySettings);

            getCity();
        });
    };

    useEffect(() => {
        getCity();
        getCitySettings();
    }, []);

    return {
        city,
        citySettings,
        getCity,
        getCitySettings,
        setCitySettings,
    };
}
