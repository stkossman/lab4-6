import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-light font-poppins bg-[#f5f5f5] dark:bg-neutral-900 transition-colors duration-300">
      <header className="flex justify-end p-4">
        <ThemeToggle />
      </header>
      <main className="flex-grow mb-8 px-4">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
};

export default App;
