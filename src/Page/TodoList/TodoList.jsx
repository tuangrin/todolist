import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const baseUrl = 'https://68455f74fc51878754db30df.mockapi.io/api/v1';

  const [isLoading, setIsLoading] = useState(true);

  const fetchTodo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/todo/name`);
      let newData = response.data.map((e, index) => {
        return {
          ...e,
          is_active: index % 2 === 0, // true ถ้า index เป็นเลขคู่, false ถ้าเลขคี่
        };
      });

      setTodoList(newData);
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

  const [newTodo, setNewTodo] = useState('');
  const onCreateTodo = async () => {
    console.log('add', newTodo);
    let obj = {
      name: newTodo,
      is_active: false,
    };
    setTodoList((prev) => [...prev, obj]);
    setNewTodo('');
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <>
      {isLoading && <div>Loading..</div>}
      {!isLoading && (
        <div className='p-6 h-[100vh] bg-violet-100 '>
          <div className='w-full flex justify-end items-center gap-2 mb-2 bg-white px-3 py-2'>
            <TextField
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className='w-3/12'
              id='outlined-basic'
              label='Add New Todo'
              size='small'
              variant='outlined'
            />
            <Button onClick={onCreateTodo} variant='outlined' size='medium'>
              Add
            </Button>
          </div>
          <div className='grid grid-cols-6 gap-x-3 gap-y-0 bg-white h-[70vh] p-3'>
            {todoList.map((todo, index) => (
              <div
                key={index}
                className={`col-span-1 p-4 h-[150px] rounded-md text-center text-lg bg-amber-200 transition-all duration-300 `}
              >
                <span
                  className={`relative ${
                    todo.is_active ? 'text-gray-400 line-through' : ''
                  } inline-block ${
                    todo.status === 'done' ? 'animate-strike' : ''
                  }`}
                >
                  {todo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TodoList;
