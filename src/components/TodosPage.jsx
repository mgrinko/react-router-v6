import { useEffect, useState } from 'react';
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom';
import { getTodos } from '../api/todos';

export const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(
    Object.fromEntries(searchParams.entries())
  );

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || '';

  const visibleTodos = todos.filter(todo => todo.title.includes(query));

  if (sortBy) {
    visibleTodos.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'id':
          return a.id - b.id;
        default:
          return 0;
      }
    });
  }

  return (
    <div className="TodosPage">
      <h1>Todos</h1>

      <input
        type="text"
        value={query}
        onChange={event => {
          setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            query: event.target.value,
          });
        }}
      />

      <Outlet />

      <table>
        <thead>
          <tr>
            <th onClick={() => setSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              sortBy: 'id'
            })}>
              id
            </th>
            <th onClick={() => setSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              sortBy: 'title'
            })}>
              title
            </th>
            <th>completed</th>
            <th>userId</th>
          </tr>
        </thead>
        <tbody>
          {visibleTodos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>
                <Link to={{
                  pathname: `${todo.id}`,
                  search: searchParams.toLocaleString(),
                }}>
                  {todo.title}
                </Link>
              </td>
              <td>{todo.completed ? 'DONE' : ''}</td>
              <td>{todo.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const TodoPage = () => {
  const params = useParams();

  return (
    <p>Todo {params.todoId} is selected</p>
  );
}
