import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'https://68455f74fc51878754db30df.mockapi.io/api/v1';
const Edit = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState({
    name: '',
  });

  const fetchTodo = async (todoId) => {
    try {
      const response = await axios.get(`${baseUrl}/todo/name/${todoId}`);
      console.log('response.data', response.data);
      setTodo(response.data);
      //   setIsLoading(false);
    } catch (err) {
      console.log('error: ', err);
    }
  };

  useEffect(() => {
    fetchTodo(id);
  }, [id]);

  const handleNameChange = (event) => {
    setTodo((previousState) => ({
      ...previousState,
      name: event.target.value,
    }));
  };

  const updateName = async () => {
    try {
      const response = await axios.put(`${baseUrl}/todo/name/${id}`, {
        name: todo.name,
      });
      console.log('response.data', response.data);
      //   setTodo(response.data);
      //   setIsLoading(false);
    } catch (err) {
      console.log('error: ', err);
    }
  };

  return (
    <>
      <div>
        <p>{todo.name}</p>
        <input
          onChange={handleNameChange}
          type='text'
          value={todo.name}
        ></input>

        {/* <button onClick={updateName}>Edit</button> */}
        <button onClick={() => updateName()}>Edit</button>
      </div>
    </>
  );
};

export default Edit;
