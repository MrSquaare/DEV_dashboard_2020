import * as React from "react"
import {createStyles, List, ListSubheader, Theme} from "@material-ui/core";
import ServiceItemComponent from "./item";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

type Props = {};

const ServiceListComponent: React.FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <div>
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
            </List>
            <ServiceItemComponent serviceName={"GitHub"} serviceIcon={"tmp"}/>
        </div>
    );
};

export default ServiceListComponent;