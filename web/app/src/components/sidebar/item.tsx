import { WidgetSettings } from "@dashboard-web/types";
import {
    Divider,
    Drawer,
    List,
    ListSubheader,
    Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import ServiceListComponent from "./service/list";

const useStyles = makeStyles({
    drawer: {
        "z-index": "1000 !important",
    },
    paper: {
        width: 300,
    }
});

type Props = {
    drawerOpen: boolean;
    drawerSetOpen: (open: boolean) => void;
    addWidget: (widget: WidgetSettings) => void;
};

const SidebarItemComponent: React.FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <Drawer
            open={props.drawerOpen}
            className={classes.drawer}
            classes={{
                paper: classes.paper,
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
