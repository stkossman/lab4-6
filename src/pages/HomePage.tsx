import TodoListWrapper from "../components/todo/TodoListWrapper";
import TodoHeader from "../components/todo/layout/TodoHeader";

const HomePage: React.FC = () => {
  return (
    <>
      <TodoHeader />
      <TodoListWrapper />
    </>
  );
};

export default HomePage;
