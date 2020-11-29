import { Button, makeStyles } from "@material-ui/core";
import Router from "next/router";
import React from "react";

const useStyle = makeStyles({
    button: {
        "margin-bottom": "0.75rem",
    },
});

function openPopUp(): Promise<void> {
    return new Promise((resolve, reject) => {
        const redirect = `${window.location.origin}/authentication/parties/twitter`;
        const popUp = window.open(
            `/api/server/redirect/authentication/parties/twitter?redirect=${redirect}`
        );

        if (popUp) {
            popUp.onclose = () => resolve();
        } else {
            reject();
        }
    });
}

export const SignInTwitter: React.FC = () => {
    const classes = useStyle();

    const handleClick = async (event: React.MouseEvent) => {
        event.preventDefault();

        await openPopUp();

        Router.push("/");
    };

    return (
        <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
            onClick={handleClick}
        >
            Sign in with Twitter
        </Button>
    );
};
