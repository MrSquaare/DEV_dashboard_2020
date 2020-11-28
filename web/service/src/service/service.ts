import { SvgIconComponent } from "@material-ui/icons";
import { Widget } from "../widget";

export abstract class Service {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly version: string;
    abstract readonly widgets: Widget[];
    abstract readonly icon: SvgIconComponent;
}
