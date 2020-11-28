import { Widget } from "@dashboard-web/service";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Help as HelpIcon } from "@material-ui/icons";
import * as React from "react";
import { v4 } from "uuid";
import { WidgetData } from "../../../types/widget";

type Props = {
    serviceId: string;
    widget: Widget;
    addWidget: (widget: WidgetData) => void;
};

const WidgetItemComponent: React.FC<Props> = (props) => {
    const handleClick = () => {
        props.addWidget({
            service: props.serviceId,
            action: props.widget.actionId,
            id: v4(),
            width: "1",
            height: "2",
            posX: "0",
            posY: "0",
            refreshMs: "2000",
        });
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <HelpIcon /> {/* TODO: Support native icon */}
                </ListItemIcon>
                <ListItemText primary={props.widget.name} />
            </ListItem>
        </div>
    );
};

export default WidgetItemComponent;
