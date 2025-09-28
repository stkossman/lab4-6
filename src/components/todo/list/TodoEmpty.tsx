const TodoEmpty: React.FC = () => {
  return (
    <div className="text-center py-10 px-4">
      <p className="text-neutral-500 text-lg">Your task list is clear.</p>
      <p className="text-neutral-400 text-sm">Add a new task to get started.</p>
    </div>
  );
};

export default TodoEmpty;
