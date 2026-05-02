import { useEffect, useState } from 'react';

export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const onError = () => setHasError(true);
    const onRejection = () => setHasError(true);
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  if (hasError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6 dark:bg-gray-950">
        <section className="card max-w-lg text-center">
          <h1 className="text-2xl font-bold">StudyPal hit an unexpected error.</h1>
          <p className="mt-2 text-sm text-gray-500">Refresh the page and try again.</p>
        </section>
      </main>
    );
  }

  return children;
}
