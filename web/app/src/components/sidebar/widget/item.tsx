import * as React from "react";
import {createStyles, ListItem, ListItemIcon, ListItemText, SvgIcon, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import IconFactory from "../../../utilities/icons/factory";
import {v4} from "uuid";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

type Props = {
    serviceName: string,
    widgetData: any,
    drawerSetOpen: (drawerOpen: boolean) => void,
    items: object[],
    setItems: (items: any) => void
};

const WidgetItemComponent: React.FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();

    const handleClick = () => {
        props.setItems(props.items.concat({i: props.serviceName + ":" + props.widgetData.id + "/" + v4(), x: 0, y: Infinity, w: 1, h: 5}));
        props.drawerSetOpen(false);
    }

    return (
        <div>
            <ListItem button className={classes.nested} onClick={handleClick}>
                <ListItemIcon>
                    <IconFactory iconName={props.widgetData.name}/>
                </ListItemIcon>
                <ListItemText primary={props.widgetData.name}/>
            </ListItem>
        </div>
    );
};


export default WidgetItemComponent;