import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-md mx-auto relative">
        {children}
      </div>
    </div>
  );
}
