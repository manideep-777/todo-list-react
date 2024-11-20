import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

export default function TodoList() {

  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([{ id: uuidv4(), isCheck: false, todoName: "hello" }]);

  let btnClasses = " pt-1 px-2 rounded hoverBtn navColor mx-3"

  useEffect(() => {
    console.log(todoList);
  }, [todoList])


  function handleChange(e) {
    setTodo(e.target.value);
  }

  function handleAdd() {
    setTodoList([...todoList, { id: uuidv4(), todoName: todo, isCheck: false }]);
    setTodo("");
  }

  function handleDelete(id) {
    setTodoList(
      todoList.filter((todo) => {
        return todo.id != id;
      })
    )
  }

  function handleEdit(id) {
    let editTodo = todoList.filter((todo) => {
      return todo.id == id;
    })[0];

    setTodoList(
      todoList.filter((todo) => {
        return todo.id != id;
      })
    )

    setTodo(editTodo.todoName);
  }

  function checked(id) {
    let updatedTodoList = todoList.map((todo) => {
      if (todo.id == id) {
        return { ...todo, isCheck: !todo.isCheck };
      }
      return todo
    })
    setTodoList(updatedTodoList);
  }

  return (
    <div className={"min-h-screen min-w-screen"}>
      <div>
        <nav className={"navColor w-ful h-16 flex items-center px-4 font-semibold"}>
          <p className={"text-3xl"}>Todo List</p>
        </nav>
      </div>

      <input type="text" value={todo} placeholder="Enter" className={"border-black border p-1 text-xl rounded-md w-3/12 my-4 mx-6"} onChange={(e) => { handleChange(e) }} />
      <button className={`${btnClasses} border-black border`} onClick={handleAdd} disabled={todo == "" ? true : false}>
        <lord-icon
          src="https://cdn.lordicon.com/sbnjyzil.json"
          trigger="hover"
          stroke="bold"
          colors="primary:#121331,secondary:#000000"
          style={{ width: "1.25rem", height: "1.25rem" }}>
        </lord-icon>

      </button>

      <p className={"m-4 mx-8 mt-0 text-2xl"}>List of Todos</p>

      {todoList.map((el) => {
        return (
          <div key={el.id} className={"flex items-start w-6/12  justify-between mx-6 mb-3"}>
            <div className={"mx-6 flex-1 flex items-start"}>
              <div>
                <input type="checkbox" value={!el.isCheck} onClick={() => { checked(el.id) }} className={"mr-10"} />
              </div>
              <div className="max-w-[500px] break-words">
                <span className={`${el.isCheck ? "line-through" : ""} text-xl max-w-xs break-words`}>
                  {el.todoName}
                </span>
              </div>
            </div>

            <div className={"flex items-start"}>
              <div>
                <button className={`border-black border ${btnClasses} `} onClick={() => { handleDelete(el.id) }}>
                  <lord-icon
                    src="https://cdn.lordicon.com/hwjcdycb.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#121331,secondary:#000000"
                    style={{ width: "1.25rem", height: "1.25rem" }}
                  >
                  </lord-icon>
                </button>
              </div>
              <div>
                <button className={`border-black border ${btnClasses}`} onClick={() => { handleEdit(el.id) }}>
                  <lord-icon
                    src="https://cdn.lordicon.com/exymduqj.json"
                    trigger="hover"
                    stroke="bold"
                    state="hover-line"
                    colors="primary:#121331,secondary:#000000"
                    style={{ width: "1.25rem", height: "1.25rem" }}>
                  </lord-icon>
                </button>
              </div>
            </div>

          </div>
        )
      })}

    </div>
  )
}