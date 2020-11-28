import { Box, Dialog, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    deleteWidget?: () => void;
};

export const WidgetSettingsDialog: React.FC<Props> = (props) => {
    return (
        <div>
            <Dialog open={props.open} onClose={() => props.setOpen(false)}>
                <Box>{props.children}</Box>
                <Box>
                    {props.deleteWidget ? (
                        <IconButton onClick={() => props.deleteWidget!()}>
                            <Delete />
                        </IconButton>
                    ) : null}
                </Box>
            </Dialog>
        </div>
    );
};
