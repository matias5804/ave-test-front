import React, { useReducer, useEffect } from "react";
import "./cardList.css";
import { TbHeartBroken } from "react-icons/tb";

function reducer(state, action) {
  if (action.type === "INCREASE") {
    return {
      ...state,
      addNumber: state.addNumber + 1,
    };
  } else if (action.type === "DECREASE") {
    if (state.addNumber == 1) {
      return state;
    }
    return {
      ...state,
      addNumber: state.addNumber - 1,
    };
  }
}

const CardList = ({ item, removeItem, setAddedItem, itemsArr }) => {
  const [state, dispatch] = useReducer(reducer, item);

  useEffect(() => {
    const newArr = itemsArr.map((itemArr) => {
      itemArr.id == item.id && (item.addNumber = state.addNumber);
      return itemArr;
    });
    setAddedItem(newArr);
  }, [state]);

  return (
    <div className="card-list-body">
      <img src={item.image} className="card-list-img" alt="" />
      <button
        className="delete-btn"
        onClick={() => {
          document.querySelector(".card-list-body").classList.add("animate");
          setTimeout(() => removeItem(item), 190);
        }}
      >
        <TbHeartBroken/>
      </button>
      <h4>{item.title}</h4>
      <hr />
      <div className="card-list-add-minu-body">
        <p>Price : ${item.price}</p>
      </div>
    </div>
  );
};

export default CardList;
