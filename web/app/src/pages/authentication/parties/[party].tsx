import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect } from "react";
import { usePartySignIn } from "../../../hooks/authentication/";

const useStyle = makeStyles({
    backdrop: {
        color: "#ffffff",
        zIndex: 100,
    },
});

const PartySignInPage: React.FC = () => {
    const classes = useStyle();

    const { partySignedIn, error, partySignIn } = usePartySignIn();

    useEffect(() => {
        if (partySignedIn) {
            window.opener.successSignal();

            window.close();
        }
    }, [partySignedIn]);

    useEffect(() => {
        const url = new URL(window.location.href);
        const party = url.pathname.substr("/authentication/parties/".length);
        const query: Record<string, string> = {};

        url.searchParams.forEach((value, key) => {
            //  deepcode ignore PrototypePollution: False positive
            query[key] = value;
        });

        partySignIn(party, query);
    }, []);

    return (
        <div>
            {error ? <Alert severity="error">{error.message}</Alert> : null}
            {partySignedIn ? (
                <Alert severity="success">Success, closing...</Alert>
            ) : null}

            <Backdrop
                open={!partySignedIn && !error}
                className={classes.backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default PartySignInPage;
