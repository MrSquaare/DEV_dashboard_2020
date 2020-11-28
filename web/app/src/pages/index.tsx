import { Backdrop, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import * as React from "react";
import AppBarItemComponent from "../components/appbar/item";
import CardGridComponent from "../components/card/grid";
import SidebarItemComponent from "../components/sidebar/item";
import { useUser } from "../hooks/user";
import { useWidgets } from "../hooks/widgets/widgets";
import { WidgetData } from "../types/widget";

const IndexPage: React.FunctionComponent = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const { user } = useUser("/authentication/signin");
    const { widgets, error: error, addWidget, updateWidget } = useWidgets();
    const loading = !user || (!widgets && !error);

    if (loading) {
        return (
            <Backdrop open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    const addWidgetFunc = (widget: WidgetData) => {
        addWidget(widget);

        setDrawerOpen(false);
    };

    const updateWidgetFunc = async (widget: WidgetData) => {
        await updateWidget(widget);
    };

    return (
        <div>
            <AppBarItemComponent
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
            />
            <SidebarItemComponent
                drawerOpen={drawerOpen}
                drawerSetOpen={setDrawerOpen}
                addWidget={addWidgetFunc}
            />
            {error ? <Alert severity="error">{error.message}</Alert> : null}
            {widgets ? (
                <CardGridComponent
                    widgets={widgets}
                    updateWidget={updateWidgetFunc}
                />
            ) : null}
        </div>
    );
};

export default IndexPage;
