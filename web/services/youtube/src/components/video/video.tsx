import {
    Box,
    CardContent,
    CircularProgress,
    makeStyles,
    Typography,
} from "@material-ui/core";
import {
    Comment,
    ThumbDownAlt,
    ThumbUpAlt,
    Visibility,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import * as React from "react";
import { useVideo } from "../../hooks";

type Props = {
    instance: string;
};

const useStyle = (url: string) => {
    return makeStyles({
        card: {
            backgroundImage: `url(${url})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100%",
        },
        box: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            padding: "0.5rem",
        },
    });
};

export const VideoContent: React.FC<Props> = (props: Props) => {
    const { video, error } = useVideo(props.instance);

    const classes = useStyle(video?.thumbnailURL)();

    if (!video && !error) {
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
            <Box
                display={"flex"}
                flexDirection={"column"}
                color={"#fff"}
                className={classes.box}
            >
                <Box display={"flex"} justifyContent={"center"}>
                    <Typography variant="h5" component="h2">
                        {video?.name}
                    </Typography>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    marginTop={"2rem"}
                >
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography variant="body1" component="h3">
                            Views
                        </Typography>
                        <Box display={"flex"}>
                            <Visibility />
                            <Typography variant="h5" component="p">
                                {video?.counters?.views}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        marginLeft={"2rem"}
                    >
                        <Typography variant="body1" component="h3">
                            Likes
                        </Typography>
                        <Box display={"flex"}>
                            <ThumbUpAlt />
                            <Typography variant="h5" component="p">
                                {video?.counters?.likes}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        marginLeft={"2rem"}
                    >
                        <Typography variant="body1" component="h3">
                            Dislikes
                        </Typography>
                        <Box display={"flex"}>
                            <ThumbDownAlt />
                            <Typography variant="h5" component="p">
                                {video?.counters?.dislikes}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        marginLeft={"2rem"}
                    >
                        <Typography variant="body1" component="h3">
                            Comments
                        </Typography>
                        <Box display={"flex"}>
                            <Comment />
                            <Typography variant="h5" component="p">
                                {video?.counters?.comments}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </CardContent>
    );
};
