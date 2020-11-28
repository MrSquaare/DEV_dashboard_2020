import { Widget } from "@dashboard-web/service";
import { WidgetSettings } from "@dashboard-web/types";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import { v4 } from "uuid";
import { WidgetSettingsFactory } from "../../../utilities/widgets/factory";

type Props = {
    serviceId: string;
    widget: Widget;
    addWidget: (widget: WidgetSettings) => void;
};

const WidgetItemComponent: React.FC<Props> = (props) => {
    const [modal, setModal] = useState<JSX.Element>();

    const handleClick = () => {
        const id = v4();

        const modal = WidgetSettingsFactory(
            props.serviceId,
            props.widget.actionId,
            id,
            true,
            (bool) => {
                setModal(undefined);
            },
            undefined,
            () => {
                props.addWidget({
                    service: props.serviceId,
                    action: props.widget.actionId,
                    id: id,
                    width: "1",
                    height: "2",
                    posX: "0",
                    posY: "0",
                    refreshMs: "600000",
                });
            }
        );

        setModal(modal);
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <props.widget.icon />
                </ListItemIcon>
                <ListItemText primary={props.widget.name} />
            </ListItem>
            {modal ? modal : null}
        </div>
    );
};

export default WidgetItemComponent;
