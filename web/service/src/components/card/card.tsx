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
});

export const WidgetCard: React.FC<Props> = (props) => {
    const classes = useStyle();

    return (
        <Card className={classes.card}>
            <Box display={"flex"} flexDirection={"column"} height={"100%"}>
                <Box flexGrow={"1"} className={"draggable"}>
                    <CardContent>{props.content}</CardContent>
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
