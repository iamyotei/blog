import Link from "next/link";
import Image from 'next/image';
import { PostPreview } from "@/app/lib/interfaces";

interface PostItemProps {
    post: PostPreview;
}

export function PostItem({ post }: PostItemProps) {
    return (
        <article>
            <Link href={`/blog/${post.slug}`}>
                <div className="rounded-xl overflow-hidden">
                    <Image
                        src={post.cover}
                        width={272}
                        height={142}
                        className="w-full h-auto"
                        alt="title"
                    />
                </div>
                <div>
                    <p className="text-xs mt-3 gap-x-4 text-gray-400">{post.createFormatted}</p>
                    <h2 className="scroll-m-20 text-lg font-semibold tracking-tight mt-3">{post.title}</h2>
                    <p className="text-sm mt-5 text-gray-600">{post.descr}</p>
                </div>
            </Link>
        </article>
    );
}

