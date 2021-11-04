import './App.css';
import classNames from 'classnames';
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import { TodosPage, TodoPage } from './components/TodosPage';

function App() {
  return (
    <div className="App">
      <nav className="nav">
        <NavLink
          to=""
          className={({ isActive }) => classNames({
            'nav__link': true,
            'nav__link--active': isActive,
          })}
        >
          Home
        </NavLink>

        <NavLink
          to="goods"
          className={({ isActive }) => classNames({
            'nav__link': true,
            'nav__link--active': isActive,
          })}
        >
          Goods
        </NavLink>

        <NavLink
          to="todos"
          className={({ isActive }) => classNames({
            'nav__link': true,
            'nav__link--active': isActive,
          })}
        >
          Todos
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="about" element={<h1>About page</h1>} />

        <Route path="todos" element={<TodosPage />}>
          <Route path=":todoId" element={<TodoPage />} />
        </Route>

        <Route path="goods" element={<Outlet />}>
          <Route index element={<TodosPage />} />
          <Route path=":todoId" element={<TodoPage />} />
        </Route>

        <Route path="*" element={<h2>Page not found</h2>}/>
      </Routes>
    </div>
  );
}

export default App;
