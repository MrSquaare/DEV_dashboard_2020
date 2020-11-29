import { GitHubUser } from "@dashboard/service-github";
import {
    Box,
    CardContent,
    CircularProgress,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import * as React from "react";
import { useFollowers } from "../../hooks";
import UserItem from "../user_item/user_item";
import {GitHub} from "@material-ui/icons";

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

export const FollowersContent: React.FC<Props> = (props: Props) => {
    const classes = useStyle();

    const { followers, error } = useFollowers(props.instance);

    if (!followers && !error) {
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
                    <GitHub/>
                    <Typography variant="h5" component="h2" className={classes.text}>
                        Followers
                    </Typography>
                </Box>
                {followers?.map((follower: GitHubUser) => {
                    return (
                        <Box key={follower.id} margin={"0.5rem"}>
                            <UserItem user={follower} />
                        </Box>
                    );
                })}
            </Box>
        </CardContent>
    );
};
