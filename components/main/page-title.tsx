import { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
  className?: string; // для возможности добавить дополнительные стили
}

export function Title({ children, className = '' }: TitleProps) {
  return (
    <h1 className={`scroll-m-20 text-3xl font-semibold ${className}`}>
      {children}
    </h1>
  );
}