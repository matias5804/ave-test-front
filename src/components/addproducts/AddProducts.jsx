import React, {useState, useEffect} from "react";
import CardList from "./CardList";
import "./addProducts.css";
import { useRef } from "react";
import { CgCloseO } from 'react-icons/cg'
import { get, save } from "../../helpers/storage";

const AddProducts = ({ items, click, removeItem, setAddedItem }) => {
  
  const showDivRef = useRef(null);
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    setFavList(get('favoritos'));
  }, []);

  function saveProduct(product) {
    save("favoritos", product);
    setFavList(get('favoritos'));
  }
  return (
    <div ref={showDivRef} className="container-favorities">
      <div className="header-favorities">
        <h2>Favoritos 
          <span className="total-items">{favList.length}</span>
          {favList.length <= 1 ? " producto" : " productos"}
        </h2>

        <CgCloseO  size="1.3rem" cursor="pointer"
        onClick={() => {
          setTimeout(() => click(false), 200);
        }} />
      </div>

      <div className="body-favorities">
        {favList.map((item, i, itemsArr) => (
          <CardList
            key={item.id}
            item={item}
            removeItem={saveProduct}
            setAddedItem={setAddedItem}
            itemsArr={itemsArr}
          />
        ))}
      </div>
    </div>
  );
};

export default AddProducts;
