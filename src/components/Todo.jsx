import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, markAsDone, clearCompleted } from "../features/todo/todoSlice";

export default function Todo() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");

  const clickHandler = (id) => {
    dispatch(deleteTodo(id));
  };

  const clickMark = (id) => {
    dispatch(markAsDone(id));
  };

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.isDone).length;
  const activeCount = totalCount - completedCount;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.isDone;
    if (filter === "completed") return todo.isDone;
    return true;
  });

  return (
    <div className="todo-container">
      {totalCount > 0 && (
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-title">Task Progress</span>
            <span className="progress-percentage">
              {completedCount} of {totalCount} completed ({progressPercent}%)
            </span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <div className="todo-toolbar">
        <div className="filter-tabs">
          <button
            type="button"
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All <span className="tab-count">{totalCount}</span>
          </button>
          <button
            type="button"
            className={`filter-tab ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active <span className="tab-count">{activeCount}</span>
          </button>
          <button
            type="button"
            className={`filter-tab ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed <span className="tab-count">{completedCount}</span>
          </button>
        </div>

        {completedCount > 0 && (
          <button
            type="button"
            className="clear-completed-btn"
            onClick={() => dispatch(clearCompleted())}
            title="Clear all completed tasks"
          >
            Clear completed
          </button>
        )}
      </div>

      {filteredTodos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            {filter === "completed" ? "🎯" : filter === "active" ? "✨" : "📋"}
          </div>
          <p className="empty-state-title">
            {filter === "completed"
              ? "No completed tasks yet"
              : filter === "active"
              ? "All active tasks completed!"
              : "No tasks found"}
          </p>
          <p className="empty-state-subtitle">
            {filter === "all"
              ? "Add a new task above to get started."
              : "Switch between tabs to see other tasks."}
          </p>
        </div>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.isDone ? "completed" : ""}`}
            >
              <button
                type="button"
                className={`todo-checkbox ${todo.isDone ? "checked" : ""}`}
                onClick={() => clickMark(todo.id)}
                aria-label={todo.isDone ? "Mark as active" : "Mark as done"}
                title={todo.isDone ? "Mark as active" : "Mark as done"}
              >
                {todo.isDone && (
                  <svg
                    className="check-svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>

              <span
                className={`todo-text ${todo.isDone ? "done" : ""}`}
                onClick={() => clickMark(todo.id)}
                title="Click to toggle status"
              >
                {todo.task}
              </span>

              <div className="todo-item-actions">
                <button
                  type="button"
                  className={`btn-action btn-mark ${todo.isDone ? "btn-undone" : ""}`}
                  onClick={() => clickMark(todo.id)}
                  title={todo.isDone ? "Mark as active" : "Mark as done"}
                >
                  {todo.isDone ? "Mark Undone" : "Mark Done"}
                </button>
                <button
                  type="button"
                  className="btn-action btn-delete"
                  onClick={() => clickHandler(todo.id)}
                  title="Delete task"
                  aria-label="Delete task"
                >
                  <svg
                    className="action-icon"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {totalCount > 0 && (
        <footer className="todo-footer">
          <span className="items-left">
            <strong>{activeCount}</strong> {activeCount === 1 ? "task" : "tasks"} left to complete
          </span>
        </footer>
      )}
    </div>
  );
}