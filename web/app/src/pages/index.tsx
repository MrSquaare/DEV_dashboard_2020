import * as React from "react";
import {createStyles, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CardGridComponent from "../components/card/grid";
import AppBarItemComponent from "../components/appbar/item";
import SidebarItemComponent from "../components/sidebar/item";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        content: {
            flexGrow: 1,
            height: "100vh",
            overflow: "auto"
        },
    }),
);

const IndexPage: React.FunctionComponent = () => {
    const classes = useStyles();

    const [drawerOpen, drawerSetOpen] = React.useState(false);
    const [items, setItems] = React.useState([]);

    console.log("pute");

    return (
        <div className={classes.root}>
            <AppBarItemComponent drawerOpen={drawerOpen} drawerSetOpen={drawerSetOpen}/>
            <SidebarItemComponent drawerOpen={drawerOpen} drawerSetOpen={drawerSetOpen} items={items} setItems={setItems}/>
            <CardGridComponent items={items} setItems={setItems}/>
        </div>
    );
};

export default IndexPage;
