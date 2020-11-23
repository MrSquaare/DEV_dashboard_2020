import * as React from "react"
import {CircularProgress, createStyles, List, ListSubheader, Theme} from "@material-ui/core";
import ServiceItemComponent from "./item";
import {makeStyles} from "@material-ui/core/styles";
import {serverHost} from "../../../constants";
import {useState} from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: "100%",
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        circularProgress: {
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
        },
    }),
);

type Props = {};

const ServiceListComponent: React.FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();

    const [data, setData] = React.useState<any>(undefined);
    fetch(serverHost + "/v1/services").then((result) => {
            result.json().then((json) => {
                setData(json);
            });
        }
    );

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
            {data ? data.data.map((service: any) => {
                return <ServiceItemComponent serviceData={service}/>;
            }) : <div className={classes.circularProgress}><CircularProgress/></div>}

        </div>
    );
};

export default ServiceListComponent;