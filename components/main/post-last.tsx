import Link from "next/link";
import Image from 'next/image';
import { Post } from "@/app/lib/interfaces";
import { Descr } from "./page-descr";

interface PostItemProps {
    post: Post;
}

export function PostLast({ post }: PostItemProps) {
    return (
        <>
            <Link href={`/blog/${post.slug}`}>
                <div className="grid gap-x-8 grid-cols-2 mb-14 items-center">

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
                            <p className="text-xs mt-3 gap-x-4 text-gray-600">{post.create}</p>
                        </div>
                        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-3">{post.title}</h2>
                        <Descr>{post.descr}</Descr>
                    </div>


                </div>
            </Link>
        </>
    );
}

