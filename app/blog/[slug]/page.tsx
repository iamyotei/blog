// app/blog/[slug]/page.tsx
import { Container } from "@/components/main/container";
import { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/app/lib/posts";
import { notFound } from "next/navigation";
import Image from 'next/image';
import { Title } from "@/components/main/page-title";
import { Descr } from "@/components/main/page-descr";

// generateStaticParams не требует изменений (params здесь автоматически разрешается)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Пост не найден',
    };
  }

  return {
    title: post.title,
    description: post.descr,
  };
}

export default async function PagePost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container>
      <section>
        <Title className="mb-8">{post.title}</Title>

        <div className="flex mb-8 gap-12">

          <div className="flex flex-col">
            <p className="text-gray-500 text-xs leading-6">Опубликовано</p>
            <time className="text-sm font-medium text-gray-700" dateTime={post.create}>{post.create}</time>
          </div>

          {post.update !== post.create && (
            <div className="flex flex-col">
              <p className="text-gray-500 text-xs leading-6">Обновлено</p>
              <time  className="text-sm font-medium text-gray-700">{post.update}</time>
            </div>
          )}

        </div>

        <div className="rounded-xl">
          <Image
            src={post.cover}
            alt={post.title}
            width={864}
            height={451}
            className="rounded-xl mb-10"
            priority
          />
        </div>

        {/* <div className="">
          <p className="">{post.descr}</p>
          <div className="">
            <h2 className="">Подробнее о {post.title}</h2>
            <p>
              Полное содержание поста. В реальном проекте здесь может быть Markdown,
              JSON или контент из CMS.
            </p>
          </div>
        </div> */}
      </section>
    </Container>
  );
}