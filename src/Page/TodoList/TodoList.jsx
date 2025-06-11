import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ButtonUsage from '../../Mui/Button';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const baseUrl = 'https://68455f74fc51878754db30df.mockapi.io/api/v1';

  const [isLoading, setIsLoading] = useState(true);

  const fetchTodo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/todo/name`);
      console.log('todoList', response.data);
      setTodoList(response.data);
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

  const [todo, setTodo] = useState('');
  const onCreateTodo = async () => {
    setIsLoading(true);
    console.log('add');
    try {
      const response = await axios.post(`${baseUrl}/todo/name`, 'test');
      console.log('todoList', response.data);
      fetchTodo();
      // setTodoList(response.data);
      setIsLoading(false);
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
        <div className='p-6 h-[100vh]'>
          <div className='w-full flex justify-end items-center gap-2 mb-2'>
            <TextField
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
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
          <div className='grid grid-cols-6 gap-3'>
            {todoList.map((todo, index) => (
              <div
                key={index}
                className='cols-span-1 p-4 h-[150px] bg-violet-100'
              >
                {todo.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TodoList;
