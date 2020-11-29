import {
    Box,
    CardContent,
    CircularProgress,
    Typography,
} from "@material-ui/core";
import * as React from "react";
import { useUser } from "../../hooks";

type Props = {
    instance: string;
};

export const UserContent: React.FC<Props> = (props: Props) => {
    const { user, error } = useUser(props.instance);

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

    const userBody = (
        <CardContent>
            <Typography gutterBottom>{user?.name}</Typography>
            <Typography variant="h5" component="h2">
                {user?.username}
            </Typography>
            <Typography variant="body2" component="p">
                Followers: {user?.counters?.followers}
                <br />
                Following: {user?.counters?.following}
            </Typography>
        </CardContent>
    );

    return <div>{user ? userBody : loadingBody}</div>;
};
