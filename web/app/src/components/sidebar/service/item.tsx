import * as React from 'react';
import {Icon, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import WidgetListComponent from "../widget/list";
import GitHubIcon from "@material-ui/icons/GitHub";

type Props = {serviceName: string, serviceIcon: string};

const ServiceItemComponent: React.FunctionComponent<Props> = (props: Props) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open)
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <GitHubIcon/>
                    {/* TODO: Implement Icon factory */}
                </ListItemIcon>
                <ListItemText primary={props.serviceName}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <WidgetListComponent isOpen={open}/>
        </div>
    );
};


export default ServiceItemComponent;