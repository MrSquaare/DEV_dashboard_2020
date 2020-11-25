import * as React from "react";
import {Icon, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import WidgetListComponent from "../widget/list";
import IconFactory from "../../../utilities/icons/factory";

type Props = {
    serviceData: any,
    drawerSetOpen: (drawerOpen: boolean) => void,
    items: object[],
    setItems: (items: any) => void
};

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
            <WidgetListComponent
                isOpen={open}
                serviceName={props.serviceData.name}
                widgetsData={props.serviceData.actions}
                drawerSetOpen={props.drawerSetOpen}
                items={props.items}
                setItems={props.setItems}
            />
        </div>
    );
};


export default ServiceItemComponent;