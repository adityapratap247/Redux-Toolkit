import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { deleteTodo, markAsDone } from "../features/todo/todoSlice";

export default function Todo() {
  const todos = useSelector((state) => state.todos);
  console.log(todos);
    const dispatch = useDispatch();

  const clickHandler = (id) =>{
    console.log("delete",id );
    dispatch(deleteTodo(id));
  }

  const clickMark = (id) =>{
    console.log("marked as Done",id);
    dispatch(markAsDone(id));

  }

  return (
    <div>
      <h3>todo</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <button type="button" onClick={ () => clickHandler(todo.id) }>Delete</button>
            <button type="button" onClick={() => clickMark(todo.id)}style={{ textDecoration: todo.isDone ? "line-through" : "none" }} >Mark as Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
}