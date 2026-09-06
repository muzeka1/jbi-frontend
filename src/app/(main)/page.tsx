import Hero from '@/src/components/hero/hero';
import Projects from '../../components/projects-FOR-FUTURE/projects';
import ApartmentsFilter from '../../components/apartments-filter/apartments-filter';

export default function HomePage() {
  return (
    <main>
      <Hero/>
      <ApartmentsFilter/>
      <Projects/>
    </main>
  );
}