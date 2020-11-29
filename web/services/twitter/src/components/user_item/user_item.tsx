import { TwitterUser } from "@dashboard/service-twitter";
import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import Image from "next/image";
import React from "react";

type Props = {
    user: TwitterUser;
};

const useStyle = makeStyles({
    avatar: {
        width: 32,
        height: 32,
    },
});

const UserItem: React.FC<Props> = (props) => {
    const classes = useStyle();

    return (
        <Box display={"flex"}>
            <Avatar className={classes.avatar}>
                <Image src={props.user.avatarURL} width={256} height={256} />
            </Avatar>
            <Box display={"flex"} alignItems={"center"} marginLeft={"0.5rem"}>
                <Typography variant="h6" component="h2">
                    {props.user?.username}
                </Typography>
            </Box>
        </Box>
    );
};

export default UserItem;
