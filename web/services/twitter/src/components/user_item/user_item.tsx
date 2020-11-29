import { TwitterUser } from "@dashboard/service-twitter";
import { Box } from "@material-ui/core";
import React from "react";

type Props = {
    user: TwitterUser;
};

const UserItem: React.FC<Props> = (props) => {
    return (
        <Box>{props.user.username}</Box>
    );
};

export default UserItem;
