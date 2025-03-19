import { useState, useRef, useEffect } from "react";
import "./App.css";
function App() {
  const [todos, setTodos] = useState([]);
  const InputTodo = useRef(null);
  const [completed, setCompleted] = useState([]);

  // 목록에서 오늘 할일로 올리기 

  const [today, setToday] = useState([]);


  //로컬스토리지에서 데이터 불러오기
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) setTodos(JSON.parse(savedTodos));

    const savedCompleted = localStorage.getItem("completed");
    if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
  }, []);

  //할 일 추가
  const AddTodo = () => {
    if (!InputTodo.current.value.trim()) return;

    const newTodos = [...todos, InputTodo.current.value];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));

    InputTodo.current.value = "";
  };

  //할 일 삭제
  const deleteToday_works = (todo) => {
    const newTodos = todos.filter((item) => item !== todo);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));

    // 완료한 목록에서도 삭제
    const newCompleted = completed.filter((item) => item !== todo);
    setCompleted(newCompleted);
    localStorage.setItem("completed", JSON.stringify(newCompleted));

    // 오늘 할 일에서도 삭제
    const newToday = today.filter((item) => item !== todo);
    setToday(newToday);
    localStorage.setItem("today_work", JSON.stringify(newToday));
  };

  // 완료 / 취소 토글
  const toggleCompletion = (todo) => {
    if (completed.includes(todo)) {
      // 완료 취소
      const newCompleted = completed.filter((item) => item !== todo);
      setCompleted(newCompleted);
      localStorage.setItem("completed", JSON.stringify(newCompleted));
    } else {
      // 완료 처리
      const newCompleted = [...completed, todo];
      setCompleted(newCompleted);
      localStorage.setItem("completed", JSON.stringify(newCompleted));
    }
  };

  //오늘 할일로 추가
  const handle_today = (todo) => {
    if (!today.includes(todo)) {
      const newToday = [...today, todo];
      setToday(newToday);
      localStorage.setItem("today_work", JSON.stringify(newToday));
    }
  }

  //진행률 계산
  const progress = today.length ? Math.round((completed.length / today.length) * 100) : 0;

  return (
    <div className="App">
      <header>
        <h1>TO-DO LIST</h1>
      </header>

      <main>
        {/* 할 일 입력 */}
        <div className="input-form">
          <input type="text" ref={InputTodo} placeholder="할 일을 입력하세요" />
          <button onClick={AddTodo}>추가</button>
        </div>


        <div className="today-work">
          <h2>오늘 할일</h2>
          <ul>
            {today.map((todo, index) => (
              <li key={index}>
                {todo}

                <button onClick={() => toggleCompletion(todo)}>
                  {completed.includes(todo) ? "취소" : "완료"}
                </button>

              </li>
            ))}
          </ul>
        </div>

        {/* 진행률 표시 */}
        <div className="today-progress">
          <h3>진행률: {progress}%</h3>
          <progress value={progress} max="100"></progress>
        </div>


        {/* 할 일 목록에서 오늘 할일로 추가*/}

        <div className="work-list">
          <h2>할일 목록</h2>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                {todo}
                <button onClick={() => handle_today(todo)}>올리기</button>
                <button onClick={() => deleteToday_works(todo)}>삭제</button>
              </li>
            ))}
          </ul>
        </div>

      </main>


    </div>
  );
}

export default App;
