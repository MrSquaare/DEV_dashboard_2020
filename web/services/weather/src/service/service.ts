import { Service, Widget } from "@dashboard-web/service";
import { CityWidget } from "../widgets";
import { SvgIconComponent, Cloud } from '@material-ui/icons/';

export class WeatherService extends Service {
    readonly id: string = "weather";
    readonly name: string = "Weather";
    readonly description: string = "Weather widget collection";
    readonly version: string = "1.0.0";
    readonly widgets: Widget[] = [new CityWidget()];
    readonly icon: SvgIconComponent = Cloud;
}
