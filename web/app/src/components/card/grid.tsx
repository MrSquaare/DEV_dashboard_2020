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
import { WidgetData } from "../../types/widget";

type Props = {
    widgets: WidgetData[];
    updateWidget: (widget: WidgetData) => Promise<void>;
};

function widgetToLayout(widget: WidgetData): Layout {
    return {
        i: `${widget.service}:${widget.action}:${widget.id}`,
        w: widget.width === "-1" ? Infinity : parseInt(widget.width),
        h: widget.height === "-1" ? Infinity : parseInt(widget.height),
        x: parseInt(widget.posX),
        y: parseInt(widget.posY),
    };
}

function layoutToWidget(
    layout: Layout
): Omit<WidgetData, "refreshMs"> & { refreshMs?: string } {
    const id = layout.i.split(":");

    return {
        service: id[0],
        action: id[1],
        id: id[2],
        width: layout.w.toString(),
        height: layout.h.toString(),
        posX: layout.x.toString(),
        posY: layout.y.toString(),
    };
}

function layoutsToResponsive(
    layouts: Layout[],
    currentCols: number,
    cols: { [P: string]: number }
): Layouts {
    return Object.entries(cols).reduce((layoutsRes: Layouts, cols, i) => {
        layoutsRes[cols[0]] = layouts.map((layout) => {
            const nb = layout.x + layout.y * currentCols;
            const x = nb % cols[1];
            const y = (nb - x) / cols[1];

            return {
                ...layout,
                x: x,
                y: y,
            };
        });

        return layoutsRes;
    }, {});
}

function getBreakpointFromWindowWidth(breakpoints: {
    [P: string]: number;
}): [string, number] {
    const width = window.innerWidth;
    const breakpoint = Object.entries(breakpoints).find((breakpoint) => {
        return width > breakpoint[1];
    });

    if (!breakpoint) {
        return ["lg", 1200];
    }

    return breakpoint;
}

function getColsFromBreakpoint(
    breakpoint: [string, number],
    cols: { [P: string]: number }
): number {
    const col = Object.entries(cols).find((col) => {
        return col[0] === breakpoint[0];
    });

    if (!col) {
        return -1;
    }

    return col[1];
}

const ResponsiveGridLayout = WidthProvider(Responsive);

const breakpoints = { lg: 1200, md: 992, sm: 576, xs: 0 };
const cols = { lg: 4, md: 3, sm: 2, xs: 1 };
const defaults: ResponsiveProps = {
    className: "layout",
    breakpoints: breakpoints,
    cols: cols,
    rowHeight: 200,
    compactType: null,
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

        (async function () {
            for (const layout of responsiveLayouts.lg.entries()) {
                const widget = layoutToWidget(layout[1]);

                widget.refreshMs = "3000";

                await props.updateWidget(widget as WidgetData);
            }
        })();
    }, [responsiveLayouts]);

    const onLayoutChange = (newLayouts: Layout[]) => {
        const currentUpdate = Date.now();

        if (currentUpdate < lastUpdate) {
            return;
        }

        const currentBP = getBreakpointFromWindowWidth(breakpoints);
        const currentCols = getColsFromBreakpoint(currentBP, cols);

        const responsiveLayouts = layoutsToResponsive(
            newLayouts,
            currentCols,
            cols
        );

        setResponsiveLayouts(responsiveLayouts);
        setLastUpdate(currentUpdate);
    };

    return (
        <ResponsiveGridLayout
            layouts={responsiveLayouts}
            onLayoutChange={onLayoutChange}
            {...defaults}
        >
            {layouts.map((layout) => {
                return (
                    <Box key={layout.i} data-grid={layout} bgcolor={"#e1e1e1"}>
                        {layout.i}
                    </Box>
                );
            })}
        </ResponsiveGridLayout>
    );
};

export default CardGridComponent;
