import {
    Card,
    CardActions,
    CardContent,
    IconButton,
    makeStyles,
} from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import React from "react";

type Props = {
    setOpen: (open: boolean) => void;
    content: JSX.Element;
    settings: JSX.Element;
};

const useStyle = makeStyles({
    card: {
        height: "100%",
    },
});

export const WidgetCard: React.FC<Props> = (props) => {
    const classes = useStyle();

    return (
        <Card className={classes.card}>
            <CardContent>{props.content}</CardContent>
            <CardActions className={classes.card}>
                <IconButton onClick={() => props.setOpen(true)}>
                    <Settings />
                </IconButton>
            </CardActions>
            {props.settings}
        </Card>
    );
};
