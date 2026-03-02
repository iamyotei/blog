import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostPreview } from "./interfaces";

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * Получить все посты с сортировкой по дате
 */
export function getAllPosts(): Post[] {

  if (!fs.existsSync(postsDirectory)) {   // Проверяем существование папки
    console.warn('Папка posts не найдена');
    return [];
  }

  // Читаем все файлы в папке posts
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, ''); // Убираем расширение файла для slug
      const fullPath = path.join(postsDirectory, fileName); // Полный путь к файлу
      const fileContents = fs.readFileSync(fullPath, 'utf8'); // Читаем содержимое файла
      const { data, content } = matter(fileContents); // Парсим frontmatter с gray-matter

      const rawCreateDate = data.create || new Date().toISOString().split('T')[0];
      const rawUpdateDate = data.update || rawCreateDate;

      return { // Формируем объект поста
        slug,
        title: data.title || 'Без названия',
        descr: data.descr || '',
        cover: data.cover || '',
        create: rawCreateDate,
        update: rawUpdateDate,
        createFormatted: formatDate(rawCreateDate),
        updateFormatted: formatDate(rawUpdateDate),
        content,
      };
    });

  return allPostsData.sort((a, b) => { // Сортируем посты по дате (от новых к старым)
    if (a.create < b.create) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Получить все посты ТОЛЬКО для превью (БЕЗ content)
 * Возвращает PostPreview[] (все поля кроме content, и даты обоновления)
 */
export function getAllPostsPreviews(): PostPreview[] {
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Папка posts не найдена');
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const allPreviews = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data } = matter(fileContents, { // Парсим frontmatter, но ИГНОРИРУЕМ content
        excerpt: false, // Опция, которая позволяет не парсить весь контент
      });

      const rawCreateDate = data.create || new Date().toISOString().split('T')[0];

      // Возвращаем всё, кроме content
      return {
        slug,
        title: data.title || 'Без названия',
        descr: data.descr || '',
        cover: data.cover || '',
        create: rawCreateDate, // СОХРАНЯЕМ ИСХОДНЫЙ ФОРМАТ ДЛЯ СОРТИРОВКИ
        createFormatted: formatDate(rawCreateDate), // ДОБАВЛЯЕМ отформатированную версию
      };
    });

  return allPreviews.sort((a, b) => {
    if (a.create < b.create) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Возвращает определенное количество постов
 */
export function getNumberPosts(count: number = 3): PostPreview[] {
  const allPosts = getAllPostsPreviews();
  return allPosts.slice(0, count);
}

/**
 * Получить один пост по slug
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    // Проверяем .md и .mdx расширения
    const possiblePaths = [
      path.join(postsDirectory, `${slug}.md`),
      path.join(postsDirectory, `${slug}.mdx`),
    ];
    
    let fullPath = '';
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        fullPath = p;
        break;
      }
    }
    
    if (!fullPath) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const rawCreateDate = data.create || data.creationDate || new Date().toISOString().split('T')[0];
    const rawUpdateDate = data.update || rawCreateDate;
    
    return {
      slug,
      title: data.title || 'Без названия',
      descr: data.descr || '',
      cover: data.cover || '',
      create: rawCreateDate,
      update: rawUpdateDate,
      createFormatted: formatDate(rawCreateDate),
      updateFormatted: formatDate(rawUpdateDate),
      content, // важно: возвращаем content для MDXRemote
    };
  } catch (error) {
    console.error(`Ошибка при чтении поста ${slug}:`, error);
    return null;
  }
}

/**
 * Форматирование даты из '2026-02-18' в 'Февраль 18, 2026'
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
