import React, { useContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import { FaPlusCircle } from "react-icons/fa";
import { FiCheck, FiX } from "react-icons/fi";

import { StoreContext } from "../App";

import "./ListsItem.scss";
const ListsItem = observer(() => {
  const todoCtx = useContext(StoreContext);

  const inputRef = useRef();

  const onAddTodo = () => {
    const task = inputRef.current.value;
    if (task.trim() !== "") {
      todoCtx.addTask(todoCtx.currentWatch, task);
      inputRef.current.value = "";
    }
  };

  const onToggle = (id) => {
    todoCtx.toggle(id);
  };

  const onRemove = (id) => {
    todoCtx.remove(id);
  };

  const todos = todoCtx.todos;

  const todoLists = todos
    .filter((todo) => todo.list === todoCtx.currentWatch)
    .map((todo) => {
      let checkStyle = "item__check";
      if (todo.completed) {
        checkStyle = "item__check item__check--actived";
      }
      return (
        <li className="item" key={todo.id}>
          <div className={checkStyle} onClick={() => onToggle(todo.id)}>
            <FiCheck />
          </div>
          <span className="item__text">{todo.task}</span>
          <span className="item__remove" onClick={() => onRemove(todo.id)}>
            <FiX />
          </span>
        </li>
      );
    });

  let itemStyle = "items items--hidden";
  if (todoCtx.currentWatch !== null) {
    itemStyle = "items";
  }

  return (
    <div className={itemStyle}>
      <div className="items__category">
        <span className="items__category__title">
          {todoCtx.currentWatchName}
        </span>
        <span className="items__category__count">
          {todoCtx.currentWatchRemaining} items remaining
        </span>
      </div>
      <div className="items__add-todo">
        <div className="add-todo">
          <input
            ref={inputRef}
            className="add-todo__input"
            placeholder="Create a new todo..."
          />
          <span className="add-todo__add">
            <div onClick={onAddTodo} className="add-todo__add__btn">
              <FaPlusCircle />
            </div>
          </span>
        </div>
      </div>
      <ul className="items__lists">{todoLists}</ul>
      <div className="function">
        <span className="function__btn function__btn--green">
          Special Function
        </span>
        <span
          className="function__btn"
          onClick={() => todoCtx.clearCompleted()}
        >
          Clear completed items
        </span>
        <span
          className="function__btn function__btn--red"
          onClick={() => todoCtx.deleteList()}
        >
          Delete category
        </span>
      </div>
    </div>
  );
});

export default ListsItem;
