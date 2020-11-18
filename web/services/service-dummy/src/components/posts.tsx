import React from "react";
import { usePosts } from "../hooks";
import { PostComponent } from "./post";

export const PostsComponent: React.FC = () => {
    const { posts } = usePosts();

    return (
        <div>
            {posts?.map((post) => {
                return <PostComponent key={post.id} post={post} />;
            })}
        </div>
    );
};
