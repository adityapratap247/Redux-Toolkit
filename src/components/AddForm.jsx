import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

export default function AddForm() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (evt) => {
    evt.preventDefault();
    if (!task.trim()) return;
    dispatch(addTodo(task.trim()));
    setTask("");
  };

  return (
    <form className="add-todo-form" onSubmit={submitHandler}>
      <div className="input-group">
        <input
          type="text"
          className="todo-input"
          placeholder="What do you need to do?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          aria-label="New task input"
        />
        <button
          type="submit"
          className="add-button"
          disabled={!task.trim()}
          title="Add task"
        >
          <svg
            className="add-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
}