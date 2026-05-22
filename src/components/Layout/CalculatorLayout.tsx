import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AdPlaceholder } from '../Monetization/AdPlaceholder';

interface CalculatorLayoutProps {
  children: ReactNode;
}

export const CalculatorLayout = ({ children }: CalculatorLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <AdPlaceholder position="top" height="120px" />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
