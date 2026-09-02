import Hero from '@/src/components/hero/hero';
import Projects from '../../components/projects-FOR-FUTURE/projects';
import ApartmentsSearch from '../../components/apartments-search/apartments-search';
import Header from '../../components/header/header';

export default function HomePage() {
  return (
    <main>
      <Header></Header>
      <ApartmentsSearch/>
    </main>
  );
}