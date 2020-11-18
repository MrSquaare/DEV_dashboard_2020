import { Widget } from "@dashboard-web/service";
import React from "react";
import { PostsComponent } from "../components";

export class PostsWidget extends Widget {
    readonly id: string = "posts";
    readonly name: string = "Posts";
    readonly description: string = "GET /posts widget";

    create(): JSX.Element {
        return <PostsComponent />;
    }
}
