import { Container } from "@/components/main/container";
import type { Metadata } from "next";
import { getLatestPosts } from "../lib/posts";
import { PostItem } from "@/components/main/post-item";
import { Title } from "@/components/main/page-title";
import { Descr } from "@/components/main/page-descr";

export const metadata: Metadata = {
  title: 'Главная',
  description: 'Главная страница',
};

export default function Home() {
  const posts = getLatestPosts(3); // получаем последние три поста по дате публикации
  console.log(posts)

  return (
    <Container>
      <section className="mb-18">
        <div className="max-w-3xl">
          <Title>My Portfolio</Title>
          <Descr>Im a Vim enthusiast and tab advocate, finding unmatched efficiency in Vims keystroke commands and tabs flexibility for personal viewing preferences. This extends to my support for static typing, where its early error detection ensures cleaner code, and my preference for dark mode, which eases long coding sessions by reducing eye strain.</Descr>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 mb-14">
          {posts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </Container>
  );
}
