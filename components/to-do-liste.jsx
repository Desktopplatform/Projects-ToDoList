import React, { useState, useEffect } from "react";

const ToDoList = () => {
  const [task, setTask] = useState("");
  const [tasksArray, setTasks] = useState(() => {
    const taskTodo = localStorage.getItem("tasksArray");
    return taskTodo ? JSON.parse(taskTodo) : [];
  });

  // بارگذاری داده‌ها از لوکال استوریج هنگام بارگذاری کامپوننت
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasksArray")); // تغییر کلید به "tasksArray"
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // ذخیره‌سازی داده‌ها در لوکال استوریج هر بار که tasksArray تغییر کند
  useEffect(() => {
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
  }, [tasksArray]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasksArray, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const newTasks = [...tasksArray];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const updateTask = (index) => {
    const newTaskText = prompt("Update your task:", tasksArray[index]);
    if (newTaskText) {
      const updatedTasks = tasksArray.map((t, i) =>
        i === index ? newTaskText : t
      );
      setTasks(updatedTasks);
    }
  };

  return (
    <section id="form-list">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="title-form">
          <h5>To Do List</h5>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="inputText"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="button" id="btnAdd" onClick={addTask}>
            AddItem
          </button>
        </div>
        <ul id="taskListUl">
          {tasksArray.map((task, index) => (
            <li key={index} className="taskLi">
              <span>{task}</span>
              <button className="deleteBtn" onClick={() => deleteTask(index)}>
                Delete
              </button>
              <button className="UpdateBtn" onClick={() => updateTask(index)}>
                Update
              </button>
            </li>
          ))}
        </ul>
      </form>
    </section>
  );
};

export default ToDoList;
