import { WidgetSettings } from "@dashboard-web/types";
import { Box, Button, IconButton, Slider, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { useEffect, useState } from "react";

type Props = {
    widget: WidgetSettings;
    updateWidget: (widget: WidgetSettings) => void;
    deleteWidget: (widget: WidgetSettings) => void;
};

export const CommonSettings: React.FC<Props> = (props) => {
    const [refreshMin, setRefreshMin] = useState(5);
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);

    useEffect(() => {
        setRefreshMin(parseInt(props.widget.refreshMs) / 60000);
        setWidth(parseInt(props.widget.width));
        setHeight(parseInt(props.widget.height));
    }, [props.widget]);

    const handleClick = async (event: React.MouseEvent) => {
        props.updateWidget({
            ...props.widget,
            refreshMs: (refreshMin * 60000).toString(),
            width: width.toString(),
            height: height.toString(),
        });
    };

    return (
        <Box paddingX={"2rem"} paddingBottom={"2rem"}>
            <Typography gutterBottom>
                Refresh (minutes)
            </Typography>
            <Slider
                value={refreshMin}
                onChange={(e, value) => setRefreshMin(value as number)}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={5}
                max={15}
                color={"secondary"}
            />
            <Typography gutterBottom>
                Width
            </Typography>
            <Slider
                value={width}
                onChange={(e, value) => setWidth(value as number)}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={4}
                color={"secondary"}
            />
            <Typography gutterBottom>
                Height
            </Typography>
            <Slider
                value={height}
                onChange={(e, value) => setHeight(value as number)}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={4}
                color={"secondary"}
            />
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleClick}
            >
                Save
            </Button>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<Delete />}
                fullWidth
                onClick={() => props.deleteWidget(props.widget)}
            >
                Delete
            </Button>
        </Box>
    );
};
