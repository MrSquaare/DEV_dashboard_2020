import {
    Avatar,
    Box,
    CardContent,
    CircularProgress,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { PersonAdd, Visibility } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import Image from "next/image";
import * as React from "react";
import { useChannel } from "../../hooks";

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

export const ChannelContent: React.FC<Props> = (props: Props) => {
    const classes = useStyle();

    const { channel, error } = useChannel(props.instance);

    if (!channel && !error) {
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
                        <Image
                            src={channel?.avatarURL}
                            width={256}
                            height={256}
                        />
                    </Avatar>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        marginLeft={"1rem"}
                    >
                        <Typography variant="h5" component="h2">
                            {channel?.name}
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
                            Subscribers
                        </Typography>
                        <Box display={"flex"}>
                            <PersonAdd />
                            <Typography variant="h5" component="p">
                                {channel?.counters?.subscribers}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        marginLeft={"2rem"}
                    >
                        <Typography variant="body1" component="h3">
                            Views
                        </Typography>
                        <Box display={"flex"}>
                            <Visibility />
                            <Typography variant="h5" component="p">
                                {channel?.counters?.views}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </CardContent>
    );
};
