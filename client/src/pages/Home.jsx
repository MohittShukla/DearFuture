import Header from '../components/Header';
import Footer from '../components/Footer';
import FormSection from '../components/FormSection';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 font-serif">
      <Header />
      <main className="container mx-auto py-12 px-6 flex flex-col md:flex-row gap-10 max-w-6xl">
        <FormSection />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
