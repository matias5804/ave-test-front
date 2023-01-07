import React from "react";
import "./button.css";
import { FcLike } from "react-icons/fc";
const Button = ({ num, click }) => {
  return (
    <div className="div-btn-favorites" onClick={() => click(true)}>
      <FcLike size="1.3rem"/>
      <h1 className="btn-add" >{num}</h1> 
    </div>
  );
};

export default Button;
