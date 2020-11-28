import { WidgetSettings } from "@dashboard-web/types";
import * as React from "react";
import core from "../../../index";
import ServiceItemComponent from "./item";

type Props = {
    addWidget: (widget: WidgetSettings) => void;
};

const ServiceListComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div>
            {core.services?.map((service: any) => {
                return (
                    <ServiceItemComponent
                        key={service.id}
                        service={service}
                        addWidget={props.addWidget}
                    />
                );
            })}
        </div>
    );
};

export default ServiceListComponent;
