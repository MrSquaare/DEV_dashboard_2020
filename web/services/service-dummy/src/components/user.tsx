import { UserModel } from "@dashboard/service-dummy";
import * as React from "react";

type UserComponentProps = {
    user: UserModel;
};

export class UserComponent extends React.Component<UserComponentProps> {
    render() {
        return (
            <div>
                <h1>{this.props.user.name}</h1>
            </div>
        );
    }
}
