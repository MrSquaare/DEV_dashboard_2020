import * as React from "react";
import {Collapse, List} from "@material-ui/core";
import WidgetItemComponent from "./item";

type Props = {isOpen: boolean, widgetsData: any};

const WidgetListComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div>
            <Collapse in={props.isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {props.widgetsData.map((widget: any) => {
                        return <WidgetItemComponent widgetData={widget}/>;
                    })}
                </List>
            </Collapse>
        </div>
    );
};

export default WidgetListComponent;