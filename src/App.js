import { useState, useRef, useEffect } from 'react';
function App() {

  const [page, setPage] = useState("admin");

  const [todos, setTodos] = useState([]);
  const InputTodo = useRef(null);

  const [todays_work, setTodays_work] = useState([]);



  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedToday_work = localStorage.getItem("today_work");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    if (savedToday_work) {
      setTodays_work(JSON.parse(savedToday_work));
    }
  }, []);


  const AddTodo = () => {
    if (!InputTodo.current.value.trim()) return;

    const newTodos = [...todos, InputTodo.current.value];
    setTodos(newTodos);

    localStorage.setItem("todos", JSON.stringify(newTodos));

    InputTodo.current.value = '';

  };

  const addToday_works = (todo) => {
    if (todays_work.includes(todo)) return;

    const newToday_work = [...todays_work, todo];
    setTodays_work(newToday_work);
    localStorage.setItem("today_work", JSON.stringify(newToday_work));
  }

  return (
    <div className="App">
      <header>
        TO-DO LIST
        <button onClick={() => setPage(page === "admin" ? "client" : "admin")}>
          {page === "admin" ? "client" : "admin"}
        </button>

      </header>

      <main>
        {page === "admin" && (
          <>
            <input type="text" ref={InputTodo} />
            <button onClick={() => AddTodo()}>추가</button>


            <ul>
              {todos.map((todo, index) => (
                <li key={index}>{todo}
                  <button onClick={() => addToday_works(todo)}>오늘 할일에 추가</button>
                  <button>삭제</button></li>
              ))}
            </ul>
          </>
        )}

        {page === "client" && (
          <>
            <h2>클라이언트 페이지</h2>


            <ul>
              {todays_work.map((todo, index) => (
                <li key={index}>{todo}</li>
              ))}
            </ul>
          </>
        )}

      </main>


      <footer></footer>
    </div>
  );
}

export default App;
