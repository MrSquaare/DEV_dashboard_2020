import * as React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import HelpIcon from '@material-ui/icons/Help';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

type Props = { iconName: string };

const IconFactory: React.FunctionComponent<Props> = (props: Props) => {
    switch (props.iconName.toLowerCase()) {
        case "github":
            return (<GitHubIcon/>);
        case "twitter":
            return (<TwitterIcon/>);
        case "facebook":
            return (<FacebookIcon/>);
        case "user":
            return (<AccountCircleIcon/>);
        case "followers":
            return (<GroupAddIcon/>);
        case "following":
            return (<PersonAddIcon/>);
        default:
            return (<HelpIcon/>)
    }
};

export default IconFactory;