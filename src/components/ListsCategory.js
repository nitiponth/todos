import React, { useContext, useRef } from "react";
import { FaPlusCircle } from "react-icons/fa";
import "./ListsCategory.scss";

import { StoreContext } from "../App";
import { observer } from "mobx-react-lite";

const ListsCategory = observer(() => {
  const todoCtx = useContext(StoreContext);
  const inputListRef = useRef();

  const lists = todoCtx.lists;

  const onAddList = () => {
    const name = inputListRef.current.value;
    if (name.trim() !== "") {
      todoCtx.addList(name);
      inputListRef.current.value = "";
    }
  };

  const onListClicked = (id) => {
    todoCtx.setCurrentWatch(id);
  };

  const categoryLists = lists.map((list) => (
    <li
      className="category__item"
      key={list.id}
      onClick={() => onListClicked(list.id)}
    >
      {list.name}
    </li>
  ));

  return (
    <div className="category">
      <h1 className="category__title">My Lists</h1>
      <ul className="category__box">{categoryLists}</ul>
      <div className="category__add">
        <div className="add">
          <input
            className="add__input"
            placeholder="New category"
            ref={inputListRef}
          />
          <span className="add__check">
            <div className="add__check__btn" onClick={onAddList}>
              <FaPlusCircle />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
});

export default ListsCategory;
