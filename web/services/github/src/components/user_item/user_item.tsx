import { GitHubUser } from "@dashboard/service-github";
import { Box } from "@material-ui/core";
import React from "react";

type Props = {
    user: GitHubUser;
};

const UserItem: React.FC<Props> = (props) => {
    return (
        <Box>{props.user.username}</Box>
    );
};

export default UserItem;
