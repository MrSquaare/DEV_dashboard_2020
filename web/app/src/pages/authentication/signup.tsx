import {
    Box,
    Container,
    CssBaseline,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React from "react";
import { SignUpSignIn } from "../../components/authentication/signup/buttons/signin";
import { SignUpForm } from "../../components/authentication/signup/form";
import Image from "next/image";

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
    text: {
        marginTop: 50,
    },
});

const SignUpPage: React.FC = () => {
    const baseClasses = useBaseStyle();
    const classes = useStyle();

    return (
        <Container component={"main"} maxWidth={"sm"} className={classes.main}>
            <CssBaseline classes={baseClasses} />
            <Box
                display={"flex"}
                height={"100%"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Image src={"/assets/images/logo.png"} width={"150"} height={"150"}/>
                <Typography component="h1" variant="h5" className={classes.text}>
                    Sign up
                </Typography>
                <SignUpForm />
                <SignUpSignIn />
            </Box>
        </Container>
    );
};

export default SignUpPage;
