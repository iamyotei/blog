import Link from "next/link";
import Image from 'next/image';
import { PostPreview } from "@/app/lib/interfaces";

interface PostItemProps {
    post: PostPreview;
}

export function PostItem({ post }: PostItemProps) {
    
    return (
        <article>
            <Link href={`/blog/${post.slug}`} className="group ">
                {/* <div className="rounded-xl overflow-hidden bg-gradient-to-tr from-neutral-50 to-neutral-100 shadow-xs"> */}
                    <Image
                        src={post.cover}
                        width={272}
                        height={142}
                        className="rounded-xl w-full h-auto transition-all duration-500 grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
                        alt="title"
                    />
                {/* </div> */}
                <div>
                    <p className="text-xs mt-3 gap-x-4 text-gray-400">{post.createFormatted}</p>
                    <h2 className="scroll-m-20 text-lg font-semibold tracking-tight mt-3">{post.title}</h2>
                    <p className="text-sm mt-5 text-gray-600">{post.descr}</p>
                </div>
            </Link>
        </article>
    );
}

