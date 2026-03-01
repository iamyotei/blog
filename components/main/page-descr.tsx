import { ReactNode } from 'react';

interface DescrProps {
  children: ReactNode;
  className?: string; // для возможности добавить дополнительные стили
}

export function Descr({ children, className = '' }: DescrProps) {
  return (
    <p className={`leading-7 not-first:mt-6 text-gray-600 ${className}`}>
      {children}
    </p>
  );
}