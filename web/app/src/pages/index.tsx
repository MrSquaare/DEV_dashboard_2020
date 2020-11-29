import { useWidgets } from "@dashboard-web/hooks";
import { WidgetSettings } from "@dashboard-web/types";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import * as React from "react";
import AppBarItemComponent from "../components/appbar/item";
import CardGridComponent from "../components/card/grid";
import SidebarItemComponent from "../components/sidebar/item";
import { useUser } from "../hooks/user";

const IndexPage: React.FunctionComponent = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const { user } = useUser("/authentication/signin");
    const {
        widgets,
        error: error,
        addWidget,
        updateWidget,
        updateWidgets,
        removeWidget,
    } = useWidgets();
    const loading = !user || (!widgets && !error);

    if (loading) {
        return (
            <Backdrop open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    const addWidgetFunc = (widget: WidgetSettings) => {
        addWidget(widget);

        setDrawerOpen(false);
    };

    const updateWidgetFunc = async (widgets: WidgetSettings) => {
        await updateWidget(widgets, true);
    };

    const updateWidgetsFunc = async (widgets: WidgetSettings[]) => {
        await updateWidgets(widgets);
    };

    const removeWidgetFunc = async (widget: WidgetSettings) => {
        await removeWidget(widget);
    };

    return (
        <div>
            <AppBarItemComponent
                user={user}
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
                    updateWidgets={updateWidgetsFunc}
                    updateWidget={updateWidgetFunc}
                    removeWidget={removeWidgetFunc}
                />
            ) : null}
        </div>
    );
};

export default IndexPage;
