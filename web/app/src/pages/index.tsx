import * as React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import GitHubIcon from '@material-ui/icons/GitHub';
import {
    Button, Collapse,
    createStyles, Divider,
    Drawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader,
    Menu,
    MenuItem,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {FunctionComponent} from "react";
import Image from "next/image";
import {ExpandLess, ExpandMore} from "@material-ui/icons";


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        titleBox: {
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        drawerPaper: {
            width: drawerWidth,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        list: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        hide: {
            display: 'none',
        },
        title: {
            marginLeft: theme.spacing(1),
        },
    }),
);

const IndexPage: FunctionComponent = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [drawerOpen, drawerSetOpen] = React.useState(false);
    const [githubOpen, githubSetOpen] = React.useState(false);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerClick = () => {
        drawerSetOpen(!drawerOpen);
    };

    const handleGithubClick = () => {
        githubSetOpen(!githubOpen)
    };

    return (<div className={classes.root}>
        <AppBar
            position={"fixed"}
            className={clsx(classes.appBar, {
                [classes.appBarShift]: drawerOpen,
            })}
        >
            <Toolbar>
                <Button
                    variant="contained"
                    color="secondary"
                    className={clsx(classes.menuButton, drawerOpen && classes.hide)}
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
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
        <Drawer
            variant={"persistent"}
            anchor={"left"}
            open={drawerOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClick}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            <List
                component={"nav"}
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Services List
                    </ListSubheader>
                }
                className={classes.list}
            >
                <ListItem button onClick={handleGithubClick}>
                    <ListItemIcon>
                        <GitHubIcon/>
                    </ListItemIcon>
                    <ListItemText primary="GitHub"/>
                    {githubOpen ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={githubOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <GitHubIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Widget 1"/>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    </div>);
};

export default IndexPage;
