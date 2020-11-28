import core from "../../index";

export const WidgetFactory = (
    serviceId: string,
    actionId: string,
    id: string,
    deleteWidget: () => void,
): JSX.Element | undefined => {
    const service = core.services?.find((service) => service.id === serviceId);
    const widget = service?.widgets.find(
        (widget) => widget.actionId === actionId
    );

    return widget?.wrapContent(id, deleteWidget);
};

export const WidgetSettingsFactory = (
    serviceId: string,
    actionId: string,
    id: string,
    open: boolean,
    setOpen: (open: boolean) => void,
    deleteWidget?: () => void,
    save?: () => void,
): JSX.Element | undefined => {
    const service = core.services?.find((service) => service.id === serviceId);
    const widget = service?.widgets.find(
        (widget) => widget.actionId === actionId
    );

    return widget?.wrapSettings(id, open, setOpen, deleteWidget, save);
};
