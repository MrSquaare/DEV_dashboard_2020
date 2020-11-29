import { TwitterUser } from "@dashboard/service-twitter";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import * as React from "react";
import { useFollowers } from "../../hooks";
import UserItem from "../user_item/user_item";

type Props = {
    instance: string;
};

export const FollowersContent: React.FC<Props> = (props: Props) => {
    const { followers, error } = useFollowers(props.instance);

    const loadingBody = (
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"1rem"}
        >
            <CircularProgress />
        </Box>
    );

    const followersBody = (
        <div>
            <Typography variant="h5" component="h2">
                Followers
            </Typography>
            {followers?.map((follower: TwitterUser) => {
                return <UserItem key={follower.id} user={follower} />;
            })}
        </div>
    );

    return <div>{followers ? followersBody : loadingBody}</div>;
};
