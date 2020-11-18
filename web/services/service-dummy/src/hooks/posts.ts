import { PostModel } from "@dashboard/service-dummy";
import { useEffect, useState } from "react";

async function getPosts(): Promise<PostModel[]> {
    const response = await fetch("http://localhost:4242/v1/dummy/posts");
    const json = await response.json();

    return json["data"];
}

export function usePosts() {
    const [posts, setPosts] = useState<PostModel[]>();

    async function setPostsAsync() {
        const posts = await getPosts();

        setPosts(posts);
    }

    useEffect(() => {
        setPostsAsync().catch();
    }, []);

    return { posts };
}
