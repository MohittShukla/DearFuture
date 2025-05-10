import Header from "../components/Header";
import Footer from "../components/Footer";

function Success() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <main className="text-center py-20 px-4">
        <h2 className="text-3xl font-light">Message Scheduled 🎉</h2>
        <p className="mt-4 text-gray-400">
          Your words have been saved for the future. See you then!
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Success;
