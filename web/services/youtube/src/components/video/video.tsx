import {
    Box,
    CardContent,
    CircularProgress,
    Typography,
} from "@material-ui/core";
import * as React from "react";
import { useVideo } from "../../hooks";

type Props = {
    instance: string;
};

export const VideoContent: React.FC<Props> = (props: Props) => {
    const { video, error } = useVideo(props.instance);

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

    const videoBody = (
        <CardContent>
            <Typography variant="h5" component="h2">
                {video?.name}
            </Typography>
            <Typography variant="body2" component="p">
                Likes: {video?.counters.likes}
                <br />
                Dislikes: {video?.counters.dislikes}
                <br />
                Comments: {video?.counters.comments}
                <br />
                Views: {video?.counters.views}
            </Typography>
        </CardContent>
    );

    return <div>{video ? videoBody : loadingBody}</div>;
};
