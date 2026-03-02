import { Container } from "@/components/main/container";
import type { Metadata } from "next";
import { PostItem } from "@/components/main/post-item";
import { Title } from "@/components/main/page-title";
import { Descr } from "@/components/main/page-descr";
import { getNumberPosts } from "../lib/get-posts";
import { Blocks, BookCheck, GitPullRequestCreateArrow } from "lucide-react";
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Главная',
  description: 'Главная страница',
};

export default function Home() {
  const posts = getNumberPosts(3);

  return (
    <Container>
      <section className="mb-18">
        <div className="max-w-3xl">
          <Title>My Portfolio</Title>
          <Descr className="mb-8">Im a Vim enthusiast and tab advocate, finding unmatched efficiency in Vims keystroke commands and tabs flexibility for personal viewing preferences. This extends to my support for static typing, where its early error detection ensures cleaner code, and my preference for dark mode, which eases long coding sessions by reducing eye strain.</Descr>

          <div className="mb-6">
            <ul className="flex align-center gap-6">
              <li className="flex align-center gap-2 text-gray-500 text-xs font-medium">
                <GitPullRequestCreateArrow size={16} />
                <span>Запросы</span>
              </li>
              <li className="flex align-center gap-2 text-gray-500 text-xs font-medium">
                <Blocks size={16} />
                <span>Интеграции</span>
              </li>
              <li className="flex align-center gap-2 text-gray-500 text-xs font-medium">
                <BookCheck size={16} />
                <span>СКД и отчеты</span>
              </li>
            </ul>
          </div>
        </div>

        <Image
          src="/hero-img.jpg"
          width={880}
          height={585}
          className="w-full h-auto rounded-xl"
          alt="title"
        />

      </section>

      <section>
        <div className="max-w-3xl">
          <Title>My Blog</Title>
          <Descr className="mb-8">Im a Vim enthusiast and tab advocate, finding unmatched efficiency in Vims keystroke commands and tabs flexibility for personal viewing preferences. This extends to my support for static typing, where its early error detection ensures cleaner code, and my preference for dark mode, which eases long coding sessions by reducing eye strain.</Descr>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 mb-14">
          {posts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      </section>


    </Container>
  );
}
