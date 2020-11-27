import * as React from "react"
import {
    Card,
    CardContent,
    CardHeader,
    createStyles,
    FormControl, FormControlLabel, FormLabel,
    IconButton,
    Menu, Popover, Radio, RadioGroup,
    Theme,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SettingsIcon from '@material-ui/icons/Settings';
import {getFromLS, saveToLS} from "../../utilities/localstorage";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
            height: "100%",
            width: "100%",
        },
    }),
);

type Props = {divKey: string, setLayout: (layout: any) => void};

const CardItemComponent: React.FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [value, setValue] = React.useState("1x1");

    const [open, setOpen] = React.useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let layout = getFromLS("layouts");
        let item = -1;

        layout.forEach(function (value: any) {
            if (value.i === props.divKey) {
                item = layout.indexOf(value);
            }
        });

        if (item === -1) return;


        switch ((event.target as HTMLInputElement).value) {
            case "1x2":
                layout[item].w = 1;
                layout[item].h = 10;
                break;
            case "2x1":
                layout[item].w = 2;
                layout[item].h = 5;
                break;
            case "2x2":
                layout[item].w = 2;
                layout[item].h = 10;
                break;
            case "1x1":
            default:
                layout[item].w = 1;
                layout[item].h = 5;
                break;
        }
        saveToLS("layouts", {lg: layout});
        props.setLayout({lg: layout});
        setValue((event.target as HTMLInputElement).value);
    }


    return (
        <Card className={classes.card}>
            <CardHeader
                action={
                    <IconButton onClick={handleClick}>
                        <SettingsIcon/>
                    </IconButton>
                }
            />
            <Popover
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                <FormControl component="fieldset">
                    <FormLabel component="legend">Card size</FormLabel>
                    <RadioGroup
                        value={value}
                        aria-label="size"
                        name="choose size"
                        onChange={handleChange}
                    >
                        <FormControlLabel value="1x1" control={<Radio/>} label="1x1"/>
                        <FormControlLabel value="1x2" control={<Radio/>} label="1x2"/>
                        <FormControlLabel value="2x1" control={<Radio/>} label="2x1"/>
                        <FormControlLabel value="2x2" control={<Radio/>} label="2x2"/>
                    </RadioGroup>
                </FormControl>
            </Popover>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.divKey}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CardItemComponent;