import { Widget } from "@dashboard-web/service";
import React from "react";
import { CityComponent } from "../components";

export class CityWidget extends Widget {
    readonly id: string = "city";
    readonly name: string = "City";
    readonly description: string = "City widget";
    readonly actionId: string = "city";

    create(instance: string): JSX.Element {
        return <CityComponent instance={instance} />;
    }
}
