import {
    Divider,
    Drawer,
    List,
    ListSubheader,
    Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import { WidgetData } from "../../types/widget";
import ServiceListComponent from "./service/list";

const useStyles = makeStyles({
    drawer: {
        width: 300,
        zIndex: 1100,
    },
});

type Props = {
    drawerOpen: boolean;
    drawerSetOpen: (open: boolean) => void;
    addWidget: (widget: WidgetData) => void;
};

const SidebarItemComponent: React.FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <Drawer
            open={props.drawerOpen}
            className={classes.drawer}
            classes={{
                paper: classes.drawer,
            }}
        >
            <Toolbar />
            <div>
                <Divider />
                <List subheader={<ListSubheader>Services</ListSubheader>}>
                    <ServiceListComponent addWidget={props.addWidget} />
                </List>
            </div>
        </Drawer>
    );
};

export default SidebarItemComponent;
