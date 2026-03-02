import { Container } from "@/components/main/container";
import { PostsList } from "@/components/main/post-list";
import type { Metadata } from "next";
import { getLatestPost, getOtherPosts } from "@/app/lib/posts";
import { PostItem } from "@/components/main/post-item";
import { PostLast } from "@/components/main/post-last";
import { Descr } from "@/components/main/page-descr";
import { Title } from "@/components/main/page-title";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { getAllPostsPreviews } from "../lib/get-posts";

export const metadata: Metadata = {
  title: 'Блог',
  description: 'Страница блога',
};


export default function PageBlog() {
  const allPosts = getAllPostsPreviews();

  if (!allPosts || allPosts.length === 0) {
    notFound();
  }

  const latestPost = allPosts[0]; // Берем первый (самый новый) пост для блока "Новый"
  const otherPosts = allPosts.slice(1); // Остальные посты (все кроме первого)

  return (

    <Container>
      <Descr className="mb-1">Код и процесс</Descr>
      <Title className="mb-8">Размышления о продукте, маркетинге и разработке.</Title>


      <div className="flex items-center w-full gap-4 mb-8">
        <p className="text-neutral-600 text-sm font-semibold uppercase">Новый</p>
        <Separator />
      </div>

      <PostLast key={latestPost.slug} post={latestPost} />

      <div className="flex items-center w-full gap-4 mb-14">
        <p className="text-neutral-600 text-sm font-semibold uppercase">Последние</p>
        <Separator />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 mb-14">
        {otherPosts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </div>

    </Container>
  );
}