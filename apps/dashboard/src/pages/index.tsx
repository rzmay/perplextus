import Hero from '../components/marketing/hero';
import Navbar from '../components/marketing/navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />
      <Hero />
    </div>
  );
}
