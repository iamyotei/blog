import { Container } from "@/components/main/container";
import { PostsList } from "@/components/main/post-list";
import type { Metadata } from "next";
import { getLatestPost, getOtherPosts } from "@/app/lib/posts";
import { PostItem } from "@/components/main/post-item";
import { PostLast } from "@/components/main/post-last";
import { Descr } from "@/components/main/page-descr";
import { Title } from "@/components/main/page-title";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: 'Блог',
  description: 'Страница блога',
};

export default function PageBlog() {
  const post = getLatestPost();
  const postsAll = getOtherPosts();

  if (!post) {
    return (
      <p>Пост undefined</p>
    );
  }
  return (

    <Container>
      <Descr className="mb-1">Код и процесс</Descr>
      <Title className="mb-8">Размышления о продукте, маркетинге и разработке.</Title>


      <div className="flex items-center w-full gap-4 mb-8">
        <Badge className="bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300">Новый</Badge>
        <Separator />
      </div>

      <PostLast key={post.slug} post={post} />

      <div className="flex items-center w-full gap-4 mb-14">
        <Badge className="bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-300">Остальные посты</Badge>
        <Separator />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 mb-14">
        {postsAll.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </div>

    </Container>
  );
}