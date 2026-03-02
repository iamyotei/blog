import { Container } from "@/components/main/container";
import { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/app/lib/get-posts";
import { notFound } from "next/navigation";
import Image from 'next/image';
import { Title } from "@/components/main/page-title";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Suspense } from 'react';
import 'highlight.js/styles/github-dark.css'; // или 'atom-one-dark.css', 'vs2015.css' и т.д.
import { BSLCodeBlock } from "@/app/lib/BSLCodeBlock";
import { Descr } from "@/components/main/page-descr";

// Генерация статических путей
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Генерация метаданных
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const post = getPostBySlug(slug);
  console.log('post', post)

  if (!post) {
    return {
      title: 'Пост не найден',
    };
  }

  return {
    title: post.title,
    description: post.descr,
    openGraph: {
      title: post.title,
      description: post.descr,
      url: `https://vadimsokolov.ru/blog/${slug}`,
      images: [
        {
          url: post.cover.startsWith('/') ? `https://vadimsokolov.ru${post.cover}` : post.cover,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.create,
      modifiedTime: post.update,
    },
  };
}

// Основной компонент страницы
export default async function PagePost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container>
      <article className="">
        <Title className="mb-4">{post.title}</Title>

        {/* <Descr >{post.descr}</Descr> */}

        <div className="flex mb-8 gap-12 border-b pb-6">
          <div className="flex flex-col">
            <p className="text-gray-500 text-xs leading-6">Опубликовано</p>
            <time className="text-sm font-medium text-gray-700" dateTime={post.create}>
              {post.createFormatted || post.create}
            </time>
          </div>

          {post.update !== post.create && (
            <div className="flex flex-col">
              <p className="text-gray-500 text-xs leading-6">Обновлено</p>
              <time className="text-sm font-medium text-gray-700" dateTime={post.update}>
                {post.updateFormatted || post.update}
              </time>
            </div>
          )}
        </div>

        <div className="rounded-xl mb-10">
          <Image
            src={post.cover}
            alt={post.title}
            width={864}
            height={451}
            className="rounded-xl w-full h-auto"
            priority
          />
        </div>

        {/* Содержимое MDX */}
        <div className="">
          <Suspense fallback={<div>Загрузка содержимого...</div>}>
            <MDXRemote
              source={post.content}
              components={{
                h1: (props) => <h1 className="mt-20 mb-5 text-2xl font-bold" {...props} />, // заголовок первого уровня
                h2: (props) => <h2 className="mt-10 mb-4 text-xl font-bold" {...props} />,
                h3: (props) => <h3 className="" {...props} />,
                h4: (props) => <h4 className="" {...props} />,
                h5: (props) => <h5 className="" {...props} />,
                h6: (props) => <h6 className="" {...props} />,
                p: (props) => <p className="mt-5 mb-4 text-base" {...props} />,
                strong: (props) => <strong className="font-semibold" {...props} />,
                ul: (props) => <ul className="mt-5 mb-5 pl-6 list-disc list-inside marker:text-gray-300" {...props} />,
                li: (props) => <li className="mt-2 mb-2 text-base" {...props} />,
                img: (props) => <img className="" {...props} />,
                // ... другие компоненты

                // Используем BSLCodeBlock для блоков кода
                pre: (props) => {
                  // Получаем children (обычно это code элемент)
                  const childProps = props.children?.props;

                  // Проверяем, содержит ли className language-bsl или language-1c
                  if (childProps?.className?.includes('language-bsl') ||
                    childProps?.className?.includes('language-1c')) {
                    return <BSLCodeBlock {...childProps} />;
                  }

                  // Для других языков используем стандартный pre
                  return (
                    <pre className="" {...props}>
                      {props.children}
                    </pre>
                  );
                },

                // Для инлайн-кода
                code: (props) => {
                  // Если это блок кода с языком, возвращаем просто children (обработается в pre)
                  if (props.className?.includes('language-')) {
                    return <code {...props} />;
                  }

                  // Для инлайн-кода
                  return (
                    <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-sans" {...props} />
                  );
                },

                // ... остальные компоненты
              }}
            />
          </Suspense>
        </div>
      </article>
    </Container>
  );
}