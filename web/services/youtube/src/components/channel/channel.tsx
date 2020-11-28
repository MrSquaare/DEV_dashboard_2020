import {
    Box,
    CardContent,
    CircularProgress,
    Typography,
} from "@material-ui/core";
import * as React from "react";
import { useChannel } from "../../hooks";

type Props = {
    instance: string;
};

export const ChannelContent: React.FC<Props> = (props: Props) => {
    const { channel, error } = useChannel(props.instance);

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

    const channelBody = (
        <CardContent>
            <Typography gutterBottom>{channel?.name}</Typography>
            <Typography variant="h5" component="h2">
                {channel?.video}
            </Typography>
            <Typography variant="body2" component="p">
                Followers: {channel?.counters?.followers}
                <br />
                Following: {channel?.counters?.following}
            </Typography>
        </CardContent>
    );

    return <div>{channel ? channelBody : loadingBody}</div>;
};
