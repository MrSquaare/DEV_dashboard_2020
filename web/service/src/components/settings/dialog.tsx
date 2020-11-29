import { WidgetSettings } from "@dashboard-web/types";
import { Box, Dialog } from "@material-ui/core";
import * as React from "react";
import { CommonSettings } from "./common";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    settings: JSX.Element;
    widget: WidgetSettings;
    updateWidget?: (widget: WidgetSettings) => void;
    deleteWidget?: (widget: WidgetSettings) => void;
};

export const WidgetSettingsDialog: React.FC<Props> = (props) => {
    return (
        <div>
            <Dialog open={props.open} onClose={() => props.setOpen(false)}>
                <Box>{props.settings}</Box>
                <Box>
                    {props.updateWidget && props.deleteWidget ? (
                        <CommonSettings
                            widget={props.widget}
                            updateWidget={props.updateWidget}
                            deleteWidget={props.deleteWidget}
                        />
                    ) : null}
                </Box>
            </Dialog>
        </div>
    );
};
