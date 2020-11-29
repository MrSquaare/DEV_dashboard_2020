import { WidgetSettings } from "@dashboard-web/types";
import { Box } from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { WidgetCard } from "../components/card/card";
import { WidgetSettingsDialog } from "../components/settings/dialog";

export abstract class Widget {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly actionId: string;
    abstract readonly icon: SvgIconComponent;

    abstract createContent(instance: string): JSX.Element;

    abstract createSettings(instance: string, save?: () => void): JSX.Element;

    wrapContent(
        widget: WidgetSettings,
        updateWidget: (widget: WidgetSettings) => void,
        deleteWidget: (widget: WidgetSettings) => void,
        save?: () => void
    ): JSX.Element {
        const [open, setOpen] = useState(false);
        const [refresh, setRefresh] = useState(0);

        useEffect(() => {
            const timeout = setTimeout(() => {
                setRefresh(Date.now());
            }, parseInt(widget.refreshMs));

            return () => clearTimeout(timeout);
        }, []);

        return (
            <Box height={"100%"}>
                <WidgetCard
                    key={refresh}
                    setOpen={setOpen}
                    content={this.createContent(widget.id)}
                />
                {this.wrapSettings(
                    open,
                    setOpen,
                    widget,
                    updateWidget,
                    deleteWidget,
                    () => setRefresh(Date.now())
                )}
            </Box>
        );
    }

    wrapSettings(
        open: boolean,
        setOpen: (open: boolean) => void,
        widget: WidgetSettings,
        updateWidget?: (widget: WidgetSettings) => void,
        deleteWidget?: (widget: WidgetSettings) => void,
        save?: () => void
    ) {
        return (
            <WidgetSettingsDialog
                open={open}
                setOpen={setOpen}
                settings={this.createSettings(widget.id, save)}
                widget={widget}
                deleteWidget={deleteWidget}
                updateWidget={updateWidget}
            />
        );
    }
}
