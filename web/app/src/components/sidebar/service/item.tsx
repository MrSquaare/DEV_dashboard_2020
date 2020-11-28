import { Service } from "@dashboard-web/service";
import { WidgetSettings } from "@dashboard-web/types";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore, Help } from "@material-ui/icons";
import * as React from "react";
import WidgetListComponent from "../widget/list";

type Props = {
    service: Service;
    addWidget: (widget: WidgetSettings) => void;
};

const ServiceItemComponent: React.FunctionComponent<Props> = (props: Props) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <Help />
                </ListItemIcon>
                <ListItemText primary={props.service.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <WidgetListComponent
                isOpen={open}
                service={props.service}
                addWidget={props.addWidget}
            />
        </div>
    );
};

export default ServiceItemComponent;
