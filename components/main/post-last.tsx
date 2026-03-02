import Link from "next/link";
import Image from 'next/image';
import { Post, PostPreview } from "@/app/lib/interfaces";
import { Descr } from "./page-descr";

interface PostItemProps {
    post: PostPreview;
}

export function PostLast({ post }: PostItemProps) {
    return (
          <article className="mb-9">
            <Link href={`/blog/${post.slug}`}>
                <div className="grid gap-x-8 grid-cols-2 items-center">

                    <div className="rounded-xl">
                        <Image
                            src={post.cover}
                            width={432}
                            height={216}
                            className="object-cover rounded-xl max-h-56"
                            alt="title"
                        />
                    </div>
                    <div className="">
                        <div>
                            <p className="text-xs mt-3 gap-x-4 text-gray-600">{post.createFormatted}</p>
                        </div>
                        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-3">{post.title}</h2>
                        <Descr>{post.descr}</Descr>
                    </div>


                </div>
               
            </Link>
             </article>
    
    );
}

