import {
    AppBar,
    Box,
    Button,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { AccountCircle, AddBox } from "@material-ui/icons";
import * as React from "react";

type Props = {
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
};

const AppBarItemComponent: React.FC<Props> = (props: Props) => {
    const [profileAnchor, setProfileAnchor] = React.useState<
        Element | undefined
    >();

    const handleProfileClick = (event: React.MouseEvent) => {
        setProfileAnchor(event.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileAnchor(undefined);
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
                    <Box flexGrow={"1"}>
                        <Typography align={"center"} variant={"h6"}>
                            Dashboard
                        </Typography>
                    </Box>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        endIcon={<AccountCircle />}
                        onClick={handleProfileClick}
                    >
                        john.doe@email.com
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
                        <MenuItem onClick={handleProfileClose}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleProfileClose}>
                            My account
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
