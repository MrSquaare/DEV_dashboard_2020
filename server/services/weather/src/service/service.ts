import { Service, ServiceAction } from "@dashboard/service";
import { WeatherCityAction } from "../actions";

export class WeatherService extends Service {
    readonly id = "weather";
    readonly name = "Weather";
    readonly description = "Weather service";
    readonly version = "1.0.0";
    readonly actions: ServiceAction[] = [new WeatherCityAction()];
}
