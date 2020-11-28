import { Widget } from "@dashboard-web/service";
import React from "react";
import { CityContent, CitySettings } from "../components/city";

export class CityWidget extends Widget {
    readonly id: string = "city";
    readonly name: string = "City";
    readonly description: string = "City widget";
    readonly actionId: string = "city";

    createContent(instance: string): JSX.Element {
        return <CityContent instance={instance} />;
    }

    createSettings(instance: string, save?: () => void): JSX.Element {
        return <CitySettings instance={instance} save={save} />;
    }
}
