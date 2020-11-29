import { TwitterUser } from "@dashboard/service-twitter";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import * as React from "react";
import { useFollowing } from "../../hooks";
import UserItem from "../user_item/user_item";

type Props = {
    instance: string;
};

export const FollowingContent: React.FC<Props> = (props: Props) => {
    const { following, error } = useFollowing(props.instance);

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

    const followingBody = (
        <div>
            <Typography variant="h5" component="h2">
                Following
            </Typography>
            {following?.map((follower: TwitterUser) => {
                return <UserItem key={follower.id} user={follower} />;
            })}
        </div>
    );

    return <div>{following ? followingBody : loadingBody}</div>;
};
