import { WidgetSettings } from "@dashboard-web/types";
import { Box } from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import {
    Layout,
    Layouts,
    Responsive,
    ResponsiveProps,
    WidthProvider,
} from "react-grid-layout";
import { WidgetFactory } from "../../utilities/widgets/factory";

type Props = {
    widgets: WidgetSettings[];
    updateWidgets: (widgets: WidgetSettings[]) => Promise<void>;
    removeWidget: (widget: WidgetSettings) => Promise<void>;
};

function widgetToLayout(widget: WidgetSettings): Layout {
    return {
        i: `${widget.service}:${widget.action}:${widget.id}`,
        w: parseInt(widget.width),
        h: parseInt(widget.height),
        x: parseInt(widget.posX),
        y: parseInt(widget.posY),
    };
}

function layoutToWidget(layout: Layout): WidgetSettings {
    const id = layout.i.split(":");

    return {
        service: id[0],
        action: id[1],
        id: id[2],
        width: layout.w.toString(),
        height: layout.h.toString(),
        posX: layout.x.toString(),
        posY: layout.y.toString(),
        refreshMs: "600000",
    };
}

const ResponsiveGridLayout = WidthProvider(Responsive);

const breakpoints = { lg: 1200, md: 992, sm: 576, xs: 0 };
const cols = { lg: 4, md: 3, sm: 2, xs: 1 };
const defaults: ResponsiveProps = {
    className: "layout",
    breakpoints: breakpoints,
    cols: cols,
    rowHeight: 200,
    style: {
        position: "relative",
    },
};

const CardGridComponent: React.FC<Props> = (props: Props) => {
    const layouts = props.widgets.map((widget) => {
        return widgetToLayout(widget);
    });

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [responsiveLayouts, setResponsiveLayouts] = useState<Layouts>();

    useEffect(() => {
        if (!responsiveLayouts) return;

        const widgets = responsiveLayouts.lg.map((layout) => {
            return layoutToWidget(layout);
        });

        props.updateWidgets(widgets);
    }, [responsiveLayouts]);

    const onLayoutChange = (
        newLayouts: Layout[],
        newResponseLayouts: Layouts
    ) => {
        const currentUpdate = Date.now();

        if (currentUpdate < lastUpdate) {
            return;
        }

        setResponsiveLayouts(newResponseLayouts);
        setLastUpdate(currentUpdate);
    };

    return (
        <ResponsiveGridLayout
            layouts={responsiveLayouts}
            onLayoutChange={onLayoutChange}
            {...defaults}
        >
            {layouts.map((layout) => {
                const widget = layoutToWidget(layout);

                return (
                    <Box key={layout.i} data-grid={layout} bgcolor={"#e1e1e1"}>
                        {WidgetFactory(
                            widget.service,
                            widget.action,
                            widget.id,
                            () => {
                                props.removeWidget(widget as WidgetSettings);
                            }
                        )}
                    </Box>
                );
            })}
        </ResponsiveGridLayout>
    );
};

export default CardGridComponent;
