import HomePage from "./pages/HomePage";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-light font-poppins bg-[#f5f5f5] dark:bg-neutral-900 transition-colors duration-300">
      <Header />
      <main className="flex-grow mb-8 px-4">
        <HomePage />
      </main>
    </div>
  );
};

export default App;
