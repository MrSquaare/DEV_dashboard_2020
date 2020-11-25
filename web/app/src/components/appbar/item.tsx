import * as React from "react"
import {Button, createStyles, Menu, MenuItem, Theme, Toolbar, Typography} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Image from "next/image";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import SidebarItemComponent from "../sidebar/item";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        },
        titleBox: {
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        appBar: {
            zIndex: 1400,
        },
        title: {
            marginLeft: theme.spacing(1),
        },
        content: {
            flexGrow: 1,
            height: "100vh",
            overflow: "auto"
        },
    }),
);

type Props = {drawerOpen: boolean, drawerSetOpen: (drawerOpen: boolean) => void}

const AppBarItemComponent: React.FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerClick = () => {
        props.drawerSetOpen(!props.drawerOpen);
    };

    return (
        <div>
            <AppBar
                position={"fixed"}
                className={classes.appBar}
            >
                <Toolbar>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.menuButton}
                        startIcon={<AddBoxIcon/>}
                        onClick={handleDrawerClick}
                    >
                        Add widget
                    </Button>
                    <div className={classes.titleBox}>
                        <Image
                            src="/assets/logo/dashboard-512.png"
                            width="32"
                            height="32"
                        />
                        <Typography variant="h6" className={classes.title}>
                            Dashboard
                        </Typography>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.menuButton}
                            endIcon={<AccountCircle/>}
                            onClick={handleMenu}
                        >
                            Replace with email
                        </Button>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AppBarItemComponent;