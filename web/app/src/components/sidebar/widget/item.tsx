import * as React from 'react';
import {createStyles, ListItem, ListItemIcon, ListItemText, SvgIcon, Theme} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

type Props = {widgetName: string, widgetIcon: string};

const WidgetItemComponent: React.FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <div>
            <ListItem button className={classes.nested}>
                <ListItemIcon>
                    <GitHubIcon/>
                </ListItemIcon>
                <ListItemText primary={props.widgetName}/>
            </ListItem>
        </div>
    );
};


export default WidgetItemComponent;