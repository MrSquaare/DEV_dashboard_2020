import * as React from "react"
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {createStyles, Divider, Drawer, List, ListSubheader, Theme, Toolbar} from "@material-ui/core";
import ServiceListComponent from "./service/list";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: 300,
            flexShrink: 0,
            zIndex: 1300,
        },
        drawerPaper: {
            width: 300,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        list: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

type Props = {
    drawerOpen: boolean,
    drawerSetOpen: (drawerOpen: boolean) => void,
    items: object[],
    setItems: (items: any) => void
};

const SidebarItemComponent: React.FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <Drawer
            open={props.drawerOpen}
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar/>
            <div className={classes.drawerContainer}>
                <Divider/>
                <List
                    component={"nav"}
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Services List
                        </ListSubheader>
                    }
                    className={classes.list}
                >
                    <ServiceListComponent
                        drawerSetOpen={props.drawerSetOpen}
                        items={props.items}
                        setItems={props.setItems}
                    />
                </List>
            </div>
        </Drawer>
    );
}

export default SidebarItemComponent;