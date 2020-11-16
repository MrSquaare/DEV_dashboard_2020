import { PostModel } from "@dashboard/service-dummy";
import * as React from "react";

type PostComponentProps = {
    post: PostModel;
};

export class PostComponent extends React.Component<PostComponentProps> {
    render() {
        return (
            <div>
                <h1>{this.props.post.title}</h1>
                <p>{this.props.post.body}</p>
            </div>
        );
    }
}
