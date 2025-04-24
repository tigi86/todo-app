import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  // Refs for title, date, time (from and upto) input fields
  const inputRef = useRef();
  const titleRef = useRef();
  const dateRef = useRef();
  const timeFromRef = useRef();
  const timeUptoRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    const titleText = titleRef.current.value.trim();
    const date = dateRef.current.value;
    const timeFrom = timeFromRef.current.value;
    const timeUpto = timeUptoRef.current.value;

    if (
      inputText === "" ||
      titleText === "" ||
      date === "" ||
      timeFrom === "" ||
      timeUpto === ""
    ) {
      return null; // If any input is empty, return early
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      title: titleText,
      date: date,
      timeFrom: timeFrom,
      timeUpto: timeUpto,
      isComplete: false,
    };

    // Add the new task to the todoList state
    setTodoList((prev) => [, newTodo, ...prev]);

    // Clear input fields after adding a new todo
    inputRef.current.value = "";
    titleRef.current.value = "";
    dateRef.current.value = "";
    timeFromRef.current.value = "";
    timeUptoRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  // Save the todoList to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white w-full items-center flex flex-col p-5 min-h-[550px] rounded-xl">
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">Todo List</h1>
      </div>

      <div className="my-7 w-2/3 items-center">
        {/* Title input */}
        <input
          ref={titleRef}
          className="bg-gray-200 rounded-full w-full h-14 pl-6 pr-2 mb-3 placeholder:text-slate-600"
          type="text"
          placeholder="Enter task title"
        />

        {/* Task input */}
        <input
          ref={inputRef}
          className="bg-gray-200 rounded-full w-full h-14 pl-6 pr-2 mb-3 placeholder:text-slate-600"
          type="text"
          placeholder="Enter task details"
        />

        {/* Date input */}
        <input
          ref={dateRef}
          className="bg-gray-200 rounded-full w-full h-14 pl-4 pr-2 mb-3 placeholder:text-slate-600"
          type="date"
        />

        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="block mb-2 text-slate-600 text-sm">From:</label>{" "}
            <input
              ref={timeFromRef}
              className="bg-gray-200 rounded-full w-32 h-11 pl-6  pr-3 mb-4 placeholder:text-slate-600 text-sm" /* Narrower and smaller text */
              type="time"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-2 text-slate-600 text-sm">Upto:</label>{" "}
            {/* Smaller text */}
            <input
              ref={timeUptoRef}
              className="bg-gray-200 rounded-full w-32 h-11 pl-6 pr-3 mb-4 placeholder:text-slate-600 text-sm" /* Narrower and smaller text */
              type="time"
            />
          </div>
        </div>

        {/* Add button */}
        <button
          onClick={add}
          className="items-center border-none rounded-full bg-orange-600 w-40 h-12 text-white text-lg font-medium cursor-pointer"
        >
          Add Task +
        </button>
      </div>

      {/* Table for displaying todo items */}
      <div className="w-full m-auto px-2 flex items-center justify-center">
        <table className="table-auto w-full sm:w-[20%] md:w-[70%] text-center  border-collapse border border-gray-300 text-xs sm:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-1 border border-gray-300">Title</th>
              <th className="p-1 border border-gray-300">Details</th>
              <th className="p-1 border border-gray-300">Date</th>
              <th className="p-1 border border-gray-300">Time</th>
              <th className="p-1 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                title={item.title}
                text={item.text}
                date={item.date}
                timeFrom={item.timeFrom}
                timeUpto={item.timeUpto}
                isComplete={item.isComplete}
                deleteTodo={deleteTodo}
                toggle={toggle}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todo;
