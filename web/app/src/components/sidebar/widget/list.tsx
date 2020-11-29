import { Service } from "@dashboard-web/service";
import { WidgetSettings } from "@dashboard-web/types";
import { Collapse, List } from "@material-ui/core";
import * as React from "react";
import WidgetItemComponent from "./item";

type Props = {
    isOpen: boolean;
    service: Service;
    addWidget: (widget: WidgetSettings) => void;
};

const WidgetListComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div>
            <Collapse in={props.isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {props.service.widgets.map((widget: any) => {
                        return (
                            <WidgetItemComponent
                                key={widget.id}
                                serviceId={props.service.id}
                                widget={widget}
                                addWidget={props.addWidget}
                            />
                        );
                    })}
                </List>
            </Collapse>
        </div>
    );
};

export default WidgetListComponent;
