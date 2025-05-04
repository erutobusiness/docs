import SlideSelector from '@/components/SlideSelector';
import { getAllSlideSections } from '@/data/slideData';

export default function Home() {
  const slideSections = getAllSlideSections();

  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-indigo-900 py-8">
      <SlideSelector slideSections={slideSections} />
    </main>
  );
}
