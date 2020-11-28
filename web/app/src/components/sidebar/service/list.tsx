import * as React from "react";
import core from "../../../index";
import { WidgetData } from "../../../types/widget";
import ServiceItemComponent from "./item";

type Props = {
    addWidget: (widget: WidgetData) => void;
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
