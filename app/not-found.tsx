import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Страница не найдена',
    description: 'Запрашиваемая страница не существует',
}

export default function NotFound() {
    return <p>Ошибка  404</p>;
}

// if (!post) {
//     notFound() // Покажет ваш app/not-found.tsx
// }