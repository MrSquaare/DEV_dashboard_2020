import {
    Box,
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
};

const useStyle = makeStyles({
    card: {
        height: "100%",
    },
    overflow: {
        "overflow-y": "auto",
    },
});

export const WidgetCard: React.FC<Props> = (props) => {
    const classes = useStyle();

    return (
        <Card className={classes.card}>
            <Box display={"flex"} flexDirection={"column"} height={"100%"}>
                <Box
                    display={"flex"}
                    flexGrow={"1"}
                    className={classes.overflow}
                >
                    <Box flexGrow={"1"} className={"draggable"}>
                        {props.content}
                    </Box>
                </Box>
                <CardActions>
                    <IconButton onClick={() => props.setOpen(true)}>
                        <Settings />
                    </IconButton>
                </CardActions>
            </Box>
        </Card>
    );
};
