import Hero from '@/src/components/hero/hero';
import HeroOld from '@/src/components/hero_2/hero_2'
import Projects from '../../components/projects-FOR-FUTURE/projects';
import ApartmentsFilter from '../../components/apartments-filter/apartments-filter';
import PhotoFlip from '../../components/photo-flip/PhotoFlip';

export default function HomePage() {
  return (
    <main>
      <Hero/>
      <ApartmentsFilter/>
      <Projects/>
    </main>
  );
}