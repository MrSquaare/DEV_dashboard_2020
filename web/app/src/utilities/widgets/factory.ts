import { WidgetSettings } from "@dashboard-web/types";
import core from "../../index";

export const WidgetFactory = (
    widget: WidgetSettings,
    updateWidget: (widget: WidgetSettings) => void,
    deleteWidget: (widget: WidgetSettings) => void,
): JSX.Element | undefined => {
    const service = core.services?.find(
        (serviceItem) => serviceItem.id === widget.service
    );
    const widgetBuilder = service?.widgets.find(
        (widgetItem) => widgetItem.actionId === widget.action
    );

    return widgetBuilder?.wrapContent(widget, updateWidget, deleteWidget);
};

export const WidgetSettingsFactory = (
    open: boolean,
    setOpen: (open: boolean) => void,
    widget: WidgetSettings,
    updateWidget?: (widget: WidgetSettings) => void,
    deleteWidget?: (widget: WidgetSettings) => void,
    save?: () => void
): JSX.Element | undefined => {
    const service = core.services?.find(
        (serviceItem) => serviceItem.id === widget.service
    );
    const widgetBuilder = service?.widgets.find(
        (widgetItem) => widgetItem.actionId === widget.action
    );

    return widgetBuilder?.wrapSettings(
        open,
        setOpen,
        widget,
        updateWidget,
        deleteWidget,
        save
    );
};
