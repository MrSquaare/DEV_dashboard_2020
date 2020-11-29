import { Button, makeStyles } from "@material-ui/core";
import React from "react";

declare global {
    interface Window {
        successSignal: () => void;
    }
}

type Props = {
    getAuthentication: () => void;
}

const useStyle = makeStyles({
    button: {
        "margin-bottom": "0.75rem",
    },
});

function openPopUp(): Promise<void> {
    return new Promise((resolve, reject) => {
        const redirect = `${window.location.origin}/authentication/services/twitter`;
        const popUp = window.open(
            `/api/server/redirect/services/twitter/authentication?redirect=${redirect}`
        );

        if (popUp) {
            window.successSignal = () => resolve();
        } else {
            reject();
        }
    });
}

export const SignIn: React.FC<Props> = (props) => {
    const classes = useStyle();

    const handleClick = async (event: React.MouseEvent) => {
        event.preventDefault();

        await openPopUp();

        props.getAuthentication();
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.button}
            onClick={handleClick}
        >
            Sign in to Twitter
        </Button>
    );
};
