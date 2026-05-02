import { Outlet } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export default function AuthLayout() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 dark:bg-gray-950">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-2xl bg-white shadow-soft dark:bg-gray-900 lg:grid-cols-[1fr_0.9fr]">
          <div className="hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-900 p-10 text-white lg:block">
            <div className="flex items-center gap-3 text-xl font-bold">
              <GraduationCap />
              StudyPal
            </div>
            <div className="mt-28 max-w-md">
              <h1 className="text-4xl font-bold leading-tight">A focused command center for student life.</h1>
              <p className="mt-5 text-indigo-100">Plan deadlines, capture notes, track money, build healthy habits, and get AI support from one polished workspace.</p>
            </div>
          </div>
          <div className="p-6 sm:p-10">
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  );
}
