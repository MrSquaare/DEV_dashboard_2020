import * as React from 'react';
import {Collapse, List} from "@material-ui/core";
import WidgetItemComponent from "./item";

type Props = {isOpen: boolean};

const WidgetListComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div>
            <Collapse in={props.isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <WidgetItemComponent widgetName={"Widget 1"} widgetIcon={"tmp"}/>
                </List>
            </Collapse>
        </div>
    );
};

export default WidgetListComponent;