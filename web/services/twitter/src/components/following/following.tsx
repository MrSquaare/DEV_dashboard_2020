import { TwitterUser } from "@dashboard/service-twitter";
import {
    Box,
    CardContent,
    CircularProgress,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import * as React from "react";
import { useFollowing } from "../../hooks";
import UserItem from "../user_item/user_item";
import {GitHub, Twitter} from "@material-ui/icons";

type Props = {
    instance: string;
};

const useStyle = makeStyles({
    card: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
    },
    text: {
        marginLeft: "0.5rem",
    },
});

export const FollowingContent: React.FC<Props> = (props: Props) => {
    const classes = useStyle();

    const { following, error } = useFollowing(props.instance);

    if (!following && !error) {
        return (
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                padding={"1rem"}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">Not Found or Maximum Rate Limit</Alert>;
    }

    return (
        <CardContent className={classes.card}>
            <Box width={"100%"}>
                <Box display={"flex"}>
                    <Twitter/>
                    <Typography variant="h5" component="h2" className={classes.text}>
                        Following
                    </Typography>
                </Box>
                {following?.map((following: TwitterUser) => {
                    return (
                        <Box key={following.id} margin={"0.5rem"}>
                            <UserItem user={following} />
                        </Box>
                    );
                })}
            </Box>
        </CardContent>
    );
};
