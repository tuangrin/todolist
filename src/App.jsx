import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ButtonUsage from './Mui/Button';

function App() {
  const [todos, setTodos] = useState([]);
  const baseUrl = 'https://68455f74fc51878754db30df.mockapi.io/api/v1';

  const [isLoading, setIsLoading] = useState(true);

  const fetchTodo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/todo/name`);
      setTodos(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log('error: ', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${baseUrl}/todo/name/${id}`);
      setIsLoading(true);
      fetchTodo();
    } catch (err) {
      console.log('error: ', err);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <>
      {isLoading && <div>Loading..</div>}
      {!isLoading && (
        <div>
          {todos.map((todo, index) => (
            <div key={index}>
              {todo.id} {todo.name} {todo.status}
              <Link to={`/todo/${todo.id}`}>
                <button>Edit</button>
              </Link>
              <button
                onClick={async () => {
                  await deleteTodo(todo.id);
                }}
              >
                Delete
              </button>
              <ButtonUsage />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
