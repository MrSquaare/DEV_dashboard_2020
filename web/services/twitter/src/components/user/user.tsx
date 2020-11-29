import {
    Avatar,
    Box,
    CardContent,
    CircularProgress,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { Favorite, PeopleAlt, Person, Send } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import Image from "next/image";
import * as React from "react";
import { useUser } from "../../hooks";

type Props = {
    instance: string;
};

const useStyle = makeStyles({
    avatar: {
        width: 64,
        height: 64,
    },
    card: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
    },
});

export const UserContent: React.FC<Props> = (props: Props) => {
    const classes = useStyle();

    const { user, error } = useUser(props.instance);

    if (!user && !error) {
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
            <Box display={"flex"} flexDirection={"column"}>
                <Box display={"flex"} justifyContent={"center"}>
                    <Avatar className={classes.avatar}>
                        <Image src={user?.avatarURL} width={256} height={256} />
                    </Avatar>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        marginLeft={"1rem"}
                    >
                        <Typography variant="h5" component="h2">
                            {user?.username}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    marginTop={"2rem"}
                >
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography variant="body1" component="h3">
                            Followers
                        </Typography>
                        <Box display={"flex"}>
                            <Person />
                            <Typography variant="h5" component="p">
                                {user?.counters?.followers}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        marginLeft={"2rem"}
                    >
                        <Typography variant="body1" component="h3">
                            Following
                        </Typography>
                        <Box display={"flex"}>
                            <PeopleAlt />
                            <Typography variant="h5" component="p">
                                {user?.counters?.following}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        marginLeft={"2rem"}
                    >
                        <Typography variant="body1" component="h3">
                            Favourites
                        </Typography>
                        <Box display={"flex"}>
                            <Favorite />
                            <Typography variant="h5" component="p">
                                {user?.counters?.favourites}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        marginLeft={"2rem"}
                    >
                        <Typography variant="body1" component="h3">
                            Tweets
                        </Typography>
                        <Box display={"flex"}>
                            <Send />
                            <Typography variant="h5" component="p">
                                {user?.counters?.tweets}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </CardContent>
    );
};
