import { Button, makeStyles } from "@material-ui/core";
import React from "react";

declare global {
    interface Window {
        successSignal: () => void;
    }
}

const useStyle = makeStyles({
    button: {
        "margin-bottom": "0.75rem",
    },
});

function openPopUp(): Promise<void> {
    return new Promise((resolve, reject) => {
        const redirect = `${window.location.origin}/authentication/services/github`;
        const popUp = window.open(
            `/api/server/redirect/services/github/authentication?redirect=${redirect}`
        );

        if (popUp) {
            window.successSignal = () => resolve();
        } else {
            reject();
        }
    });
}

export const SignIn: React.FC = () => {
    const classes = useStyle();

    const handleClick = async (event: React.MouseEvent) => {
        event.preventDefault();

        await openPopUp();
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.button}
            onClick={handleClick}
        >
            Sign in to GitHub
        </Button>
    );
};
