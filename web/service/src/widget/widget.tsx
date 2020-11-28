import React, { useState } from "react";
import { WidgetCard } from "../components/card/card";
import { WidgetSettingsDialog } from "../components/settings/dialog";

export abstract class Widget {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly actionId: string;

    abstract createContent(instance: string): JSX.Element;

    abstract createSettings(instance: string, save?: () => void): JSX.Element;

    wrapContent(
        instance: string,
        deleteWidget: () => void,
        save?: () => void
    ): JSX.Element {
        const [open, setOpen] = useState(false);

        return (
            <WidgetCard
                setOpen={setOpen}
                content={this.createContent(instance)}
                settings={this.wrapSettings(
                    instance,
                    open,
                    setOpen,
                    deleteWidget,
                    save
                )}
            />
        );
    }

    wrapSettings(
        instance: string,
        open: boolean,
        setOpen: (open: boolean) => void,
        deleteWidget?: () => void,
        save?: () => void
    ) {
        return (
            <WidgetSettingsDialog
                open={open}
                setOpen={setOpen}
                deleteWidget={deleteWidget}
            >
                {this.createSettings(instance, save)}
            </WidgetSettingsDialog>
        );
    }
}
