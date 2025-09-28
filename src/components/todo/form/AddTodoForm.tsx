import { useState } from "react";

interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full gap-4 mb-6"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full p-3 text-lg bg-transparent border-b-2 border-neutral-200 focus:border-neutral-400 focus:outline-none transition-colors"
      />
      <button
        type="submit"
        className="w-50% px-4 py-2 bg-white text-black rounded-lg font-medium
                            border border-black
                            transition-colors duration-200
                            disabled:bg-neutral-400 disabled:border-transparent disabled:cursor-not-allowed
                            enabled:hover:bg-black enabled:hover:text-white enabled:hover:border-black"
        disabled={!text.trim()}
      >
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
