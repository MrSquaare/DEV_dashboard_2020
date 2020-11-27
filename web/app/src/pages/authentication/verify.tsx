import {
    Box,
    Container,
    CssBaseline,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React from "react";
import { VerifyForm } from "../../components/authentication/verify/form";

const useBaseStyle = makeStyles({
    "@global": {
        html: {
            height: "100%",
        },
        body: {
            height: "100%",
        },
        "#__next": {
            height: "100%",
        },
    },
});

const useStyle = makeStyles({
    main: {
        height: "100%",
    },
});

const VerifyPage: React.FC = () => {
    const baseClasses = useBaseStyle();
    const classes = useStyle();

    return (
        <Container
            component={"main"}
            maxWidth={"xs"}
            className={classes.main}
        >
            <CssBaseline classes={baseClasses} />
            <Box
                display={"flex"}
                height={"100%"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Typography component="h1" variant="h5">
                    Verify
                </Typography>
                <VerifyForm />
            </Box>
        </Container>
    );
};

export default VerifyPage;
