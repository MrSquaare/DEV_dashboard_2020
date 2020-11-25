import * as React from "react";
import {Collapse, List} from "@material-ui/core";
import WidgetItemComponent from "./item";
import {v4} from "uuid";

type Props = {
    isOpen: boolean,
    serviceName: string,
    widgetsData: any,
    drawerSetOpen: (drawerOpen: boolean) => void,
    items: object[],
    setItems: (items: any) => void
};

const WidgetListComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div>
            <Collapse in={props.isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {props.widgetsData.map((widget: any) => {
                        return <WidgetItemComponent
                            key={v4()}
                            serviceName={props.serviceName}
                            widgetData={widget}
                            drawerSetOpen={props.drawerSetOpen}
                            items={props.items}
                            setItems={props.setItems}
                        />;
                    })}
                </List>
            </Collapse>
        </div>
    );
};

export default WidgetListComponent;