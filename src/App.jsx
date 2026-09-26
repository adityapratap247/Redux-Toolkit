import Todo from './components/Todo';
import AddForm from './components/AddForm';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {
  return (
    <Provider store={store}>
      <main className="todo-app-wrapper">
        <div className="todo-app-card">
          <header className="app-header">
            <div className="app-badge">
              <span className="badge-dot"></span>
              Redux Toolkit
            </div>
            <h1 className="app-title">Task Manager</h1>
            <p className="app-subtitle">Stay organized and accomplish your goals effortlessly</p>
          </header>

          <AddForm />
          <Todo />
        </div>
      </main>
    </Provider>
  );
}

export default App;
