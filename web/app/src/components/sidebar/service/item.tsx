import * as React from "react";
import {Icon, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import WidgetListComponent from "../widget/list";
import IconFactory from "../../../utilities/icons/factory";

type Props = {serviceData: any};

const ServiceItemComponent: React.FunctionComponent<Props> = (props: Props) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open)
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <IconFactory iconName={props.serviceData.name}/>
                    {/* TODO: Implement Icon factory */}
                </ListItemIcon>
                <ListItemText primary={props.serviceData.name}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <WidgetListComponent isOpen={open} widgetsData={props.serviceData.actions}/>
        </div>
    );
};


export default ServiceItemComponent;