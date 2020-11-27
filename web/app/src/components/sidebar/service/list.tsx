import * as React from "react"
import {Box, CircularProgress, createStyles, List, ListSubheader, Theme} from "@material-ui/core";
import ServiceItemComponent from "./item";
import {makeStyles} from "@material-ui/core/styles";
import {useServices} from "../../../hooks/services/services";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: "100%",
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        circularProgress: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    }),
);

type Props = {
    drawerSetOpen: (drawerOpen: boolean) => void,
    items: object[],
    setItems: (items: any) => void
};

const ServiceListComponent: React.FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();

    const { services, error } = useServices()

    if (!services && !error) {
        return (
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <CircularProgress/>
            </Box>);
    }

    if (error) {
        return (<Alert severity="error">{error.message}</Alert>);
    }

    return (
        <div>
            {services.map((service: any) => {
                return <ServiceItemComponent
                    key={service.id}
                    serviceData={service}
                    drawerSetOpen={props.drawerSetOpen}
                    items={props.items}
                    setItems={props.setItems}
                />;
            })}
        </div>
    );
};

export default ServiceListComponent;