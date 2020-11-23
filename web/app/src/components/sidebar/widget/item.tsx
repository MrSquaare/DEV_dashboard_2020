import * as React from "react";
import {createStyles, ListItem, ListItemIcon, ListItemText, SvgIcon, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import IconFactory from "../../../utilities/icons/factory";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

type Props = {widgetData: any};

const WidgetItemComponent: React.FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <div>
            <ListItem button className={classes.nested}>
                <ListItemIcon>
                    <IconFactory iconName={props.widgetData.name}/>
                </ListItemIcon>
                <ListItemText primary={props.widgetData.name}/>
            </ListItem>
        </div>
    );
};


export default WidgetItemComponent;