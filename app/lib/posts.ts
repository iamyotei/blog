import { Post } from "./interfaces";

const posts: Post[] = [
  {
    id: "1",
    title: "Начинаем путешествие в мир React",
    descr: "Изучаем основы React: компоненты, пропсы и состояние. Первые шаги в создании современных веб-приложений.",
    cover: "/1.jpg",
    create: "15.03.2024",
    update: "12.03.2024",
    slug: "react-basics",
  },
  {
    id: "2",
    title: "TypeScript: почему это must-have",
    descr: "Разбираем преимущества TypeScript: статическая типизация, улучшенная поддержка IDE и меньше багов в продакшене.",
    cover: "/2.jpg",
    create: "16.03.2024",
    update: "17.03.2024",
    slug: "typescript-advantages",
  },
  {
    id: "3",
    title: "Tailwind CSS: утилитарный подход",
    descr: "Как Tailwind CSS ускоряет разработку и почему утилитарные классы лучше кастомного CSS.",
    cover: "/3.jpg",
    create: "18.03.2024",
    update: "19.03.2024",
    slug: "tailwind-utilities",
  },
  {
    id: "4",
    title: "Next.js 14: новые возможности",
    descr: "Обзор новых функций Next.js 14: Server Actions, улучшенная маршрутизация и производительность.",
    cover: "/4.jpg",
    create: "20.03.2024",
    update: "21.03.2024",
    slug: "nextjs-14-features",
  },
  {
    id: "5",
    title: "Оптимизация производительности React",
    descr: "Техники оптимизации React приложений: useMemo, useCallback, React.memo и код-сплиттинг.",
    cover: "/5.jpg",
    create: "22.03.2024",
    update: "23.03.2024",
    slug: "react-performance",
  },
  {
    id: "6",
    title: "Деплой Next.js приложения",
    descr: "Пошаговое руководство по деплою Next.js приложения на Vercel, Netlify и собственный сервер.",
    cover: "/6.jpg",
    create: "24.03.2024",
    update: "25.03.2024",
    slug: "nextjs-deployment",
  }
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}

// получает все посты
export function getAllPosts(): Post[] {
  return posts;
}

// Новая функция: получает самый свежий пост по дате create
export function getLatestPost(): Post | undefined {
  if (posts.length === 0) return undefined;

  // Сортируем посты по дате create в порядке убывания (от новых к старым)
  // и возвращаем первый (самый новый)
  return [...posts].sort((a, b) => {
    // Преобразуем строки дат формата "DD.MM.YYYY" в объекты Date для сравнения
    const dateA = parseDate(a.create);
    const dateB = parseDate(b.create);
    return dateB.getTime() - dateA.getTime(); // сортировка по убыванию
  })[0];
}

// Вспомогательная функция для парсинга даты из формата "DD.MM.YYYY"
function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}

// Альтернативный вариант: если хотите получать несколько последних постов
export function getLatestPosts(count: number = 3): Post[] {
  if (posts.length === 0) return [];

  return [...posts]
    .sort((a, b) => {
      const dateA = parseDate(a.create);
      const dateB = parseDate(b.create);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, count);
}

// все посты кроме последнего
export function getOtherPosts(): Post[] {
  if (posts.length <= 1) return [];

  // Получаем все посты
  const allPosts = [...posts];

  // Находим самый новый пост
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = parseDate(a.create);
    const dateB = parseDate(b.create);
    return dateB.getTime() - dateA.getTime();
  });

  const latestPost = sortedPosts[0];

  // Возвращаем все посты, кроме самого нового
  return allPosts.filter(post => post.slug !== latestPost.slug);
}