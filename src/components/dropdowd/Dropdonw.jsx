import React from "react";
import "./dropdowd.css";
import { GrUnorderedList } from "react-icons/gr";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";

const DropdonwSelect = ({ orderName, orderPrice }) => {
  return (
    <Dropdown
      trigger={<GrUnorderedList size="1.5rem" className="icon-list-menu" />}
      menu={[
        <div className="div-li-dropdown">
          <h4>Nombre</h4>
          <div className="div-btn-drp">
            <button onClick={() => orderName(true)}>
              <AiOutlineArrowUp />{" "}
            </button>
            <button onClick={() => orderName(false)}>
              <AiOutlineArrowDown />
            </button>
          </div>
        </div>,

        <div className="div-li-dropdown">
          <h4>Precio</h4>
          <div className="div-btn-drp">
            <button onClick={() => orderPrice(true)}>
              <AiOutlineArrowUp />{" "}
            </button>
            <button onClick={() => orderPrice(false)}>
              <AiOutlineArrowDown />
            </button>
          </div>
        </div>,
      ]}
    />
  );
};

const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown">
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
              {React.cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default DropdonwSelect;
