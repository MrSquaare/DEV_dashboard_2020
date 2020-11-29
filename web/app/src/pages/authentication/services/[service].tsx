import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useServiceSignIn } from "../../../hooks/authentication/service";

const useStyle = makeStyles({
    backdrop: {
        color: "#ffffff",
        zIndex: 100,
    },
});

const ServiceSignInPage: React.FC = () => {
    const classes = useStyle();

    const { serviceSignedIn, error, serviceSignIn } = useServiceSignIn();

    useEffect(() => {
        if (serviceSignedIn) {
            window.opener.successSignal();

            window.close();
        }
    }, [serviceSignedIn]);

    useEffect(() => {
        const url = new URL(window.location.href);
        const service = url.pathname.substr("/authentication/services/".length);
        const query: Record<string, string> = {};

        url.searchParams.forEach((value, key) => {
            //  deepcode ignore PrototypePollution: False positive
            query[key] = value;
        });

        serviceSignIn(service, query);
    }, []);

    return (
        <div>
            {error ? <Alert severity="error">{error.message}</Alert> : null}
            {serviceSignedIn ? (
                <Alert severity="success">Success, closing...</Alert>
            ) : null}

            <Backdrop
                open={!serviceSignedIn && !error}
                className={classes.backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default ServiceSignInPage;
