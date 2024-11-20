import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

export default function TodoList() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  let btnClasses = "pt-1 px-2 rounded hoverBtn navColor mx-1";

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  useEffect(() => {
    let localTodos = JSON.parse(localStorage.getItem("todos"));
    if(localTodos){
      setTodoList(localTodos)
    }
    else{
      setTodoList([])
    }
  }, [])
  

  function handleChange(e) {
    setTodo(e.target.value);
  }

  function handleAdd() {
    setTodoList([...todoList, { id: uuidv4(), todoName: todo, isCheck: false }]);
    localStorage.setItem("todos",JSON.stringify([...todoList, { id: uuidv4(), todoName: todo, isCheck: false }]));
    setTodo("");
  }

  function handleDelete(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
    localStorage.setItem("todos",JSON.stringify(todoList.filter((todo) => todo.id !== id)))
  }

  function handleEdit(id) {
    let editTodo = todoList.find((todo) => todo.id === id);
    setTodoList(todoList.filter((todo) => todo.id !== id));
    localStorage.setItem("todos",JSON.stringify(todoList.filter((todo) => todo.id !== id)))
    setTodo(editTodo.todoName);
  }

  function checked(id) {
    let updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCheck: !todo.isCheck };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
    localStorage.setItem("todos",JSON.stringify(updatedTodoList))
  }

  return (
    <div className="min-h-screen min-w-screen backgroundColor">
      <nav className="navColor w-full h-16 flex items-center px-4 font-semibold">
        <p className="text-3xl">Todo List</p>
      </nav>

      <div className="flex flex-wrap items-center mt-4 p-4">
        <input 
          type="text" 
          value={todo} 
          placeholder="Enter" 
          className="border border-black p-2 text-xl rounded-md sm:w-8/12 md:w-8/12 lg:w-4/12 mb-2 md:mb-0 mr-4" 
          onChange={handleChange} 
        />
        <button 
          className={`${btnClasses} border border-black ml-2`} 
          onClick={handleAdd} 
          disabled={todo === ""}
        >
          <lord-icon
            src="https://cdn.lordicon.com/sbnjyzil.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#121331,secondary:#000000"
            style={{ width: "1.25rem", height: "1.25rem" }}
          >
          </lord-icon>
        </button>
      </div>

      <p className="mt-4 text-2xl p-4">{todoList.length === 0  ? "No Todos yet" :"List of Todos"}</p>

      {todoList.map((el) => (
        <div 
        key={el.id} 
        className="flex items-start w-full md:w-10/12 lg:w-8/12 justify-between mb-3 rounded-md px-4 md:flex-row lg:flex-row flex-col"
      >
        <div className="flex items-start w-full md:w-auto">
          <input 
            type="checkbox" 
            checked={el.isCheck} 
            onChange={() => checked(el.id)} 
            className="mr-2 mt-2" 
          />
          
          <span className={`${el.isCheck ? "line-through" : ""} text-xl break-words w-full`}>
            {el.todoName}
          </span>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <button 
            className={`border border-black ${btnClasses}`} 
            onClick={() => handleDelete(el.id)}
          >
            <lord-icon
              src="https://cdn.lordicon.com/hwjcdycb.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#121331,secondary:#000000"
              style={{ width: "1.25rem", height: "1.25rem" }}
            >
            </lord-icon>
          </button>
          <button 
            className={`border border-black ${btnClasses}`} 
            onClick={() => handleEdit(el.id)}
          >
            <lord-icon
              src="https://cdn.lordicon.com/exymduqj.json"
              trigger="hover"
              stroke="bold"
              state="hover-line"
              colors="primary:#121331,secondary:#000000"
              style={{ width: "1.25rem", height: "1.25rem" }}
            >
            </lord-icon>
          </button>
        </div>
      </div>
      ))}
    </div>
  );
}
