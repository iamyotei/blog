import { PostItem } from "./post-item";
import { getAllPosts } from "@/app/lib/posts";

export function PostsList() {
    const posts = getAllPosts();

    return (
        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 mb-14">
            {posts.map((post) => (
                <PostItem key={post.slug} post={post} />
            ))}
        </article>
    );
}

