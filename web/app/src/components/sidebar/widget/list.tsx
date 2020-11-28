import { Service } from "@dashboard-web/service";
import * as React from "react";
import { Collapse, List } from "@material-ui/core";
import { WidgetData } from "../../../types/widget";
import WidgetItemComponent from "./item";

type Props = {
    isOpen: boolean;
    service: Service;
    addWidget: (widget: WidgetData) => void;
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
