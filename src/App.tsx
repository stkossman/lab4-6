import TodoListWrapper from "./components/todo/TodoListWrapper";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-light font-poppins bg-[#f5f5f5] py-8 px-4">
      <main className="flex-grow mb-8">
        <TodoListWrapper />
      </main>
      <Footer />
    </div>
  );
};

export default App;
