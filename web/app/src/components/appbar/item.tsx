import { User } from "@dashboard/types";
import {
    AppBar,
    Box,
    Button, makeStyles,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { AccountCircle, AddBox } from "@material-ui/icons";
import Router from "next/router";
import Image from "next/image";
import * as React from "react";

type Props = {
    user: User;
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
};

const useStyle = makeStyles({
    text: {
        marginLeft: "0.5rem",
    },
});

const AppBarItemComponent: React.FC<Props> = (props: Props) => {
    const classes = useStyle();

    const [profileAnchor, setProfileAnchor] = React.useState<
        Element | undefined
    >();

    const handleProfileClick = (event: React.MouseEvent) => {
        setProfileAnchor(event.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileAnchor(undefined);
    };

    const handleMenuClose = () => {
        localStorage.removeItem("jwt");

        Router.push("/authentication/signin");
    };

    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        startIcon={<AddBox />}
                        onClick={() => props.setDrawerOpen(!props.drawerOpen)}
                    >
                        Add a widget
                    </Button>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexGrow={"1"}>
                        <Image src={"/assets/images/logo.png"} width={"30"} height={"30"} />
                        <Typography variant={"h6"} className={classes.text}>
                            Dashboard
                        </Typography>
                    </Box>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        endIcon={<AccountCircle />}
                        onClick={handleProfileClick}
                    >
                        {props.user.type === "local"
                            ? `${props.user.firstName} ${props.user.lastName}`
                            : props.user.firstName}
                    </Button>
                    <Menu
                        id="profile-menu"
                        anchorEl={profileAnchor}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={!!profileAnchor}
                        onClose={handleProfileClose}
                    >
                        <MenuItem onClick={handleMenuClose}>
                            Sign out
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <AppBar position="static">
                <Toolbar />
            </AppBar>
        </div>
    );
};

export default AppBarItemComponent;
