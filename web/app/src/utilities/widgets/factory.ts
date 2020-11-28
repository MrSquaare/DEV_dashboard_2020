import core from "../../index";

export const WidgetFactory = (
    serviceId: string,
    actionId: string,
    id: string
): JSX.Element | undefined => {
    const service = core.services?.find((service) => service.id === serviceId);
    const widget = service?.widgets.find(
        (widget) => widget.actionId === actionId
    );

    return widget?.create(id);
};
