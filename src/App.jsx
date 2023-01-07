import React, { useEffect, useState } from "react";
import AddProducts from "./components/addproducts/AddProducts";
import './App.css'
import CardBody from "./components/cards/CardBody";
import Search from "./components/search/Search";
import Button from "./components/button/Button";
import Header from "./components/header/Header";
import Dropdonw from "./components/dropdowd/Dropdonw";
import Footer from "./components/footer/Footer";
import BounceLoader from "react-spinners/BounceLoader";
import { save, get } from "./helpers/storage";

function App() {

  const [items, setItem] = useState([]);
  const [itmesFilters, setItemsFilters] = useState([]);
  const [addedItems, setAddedItem] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    setLoading(true)
    setFavList(get('favoritos'));
    fetch("https://fakestoreapi.com/products/")
    .then((res) => res.json())
    .then((data) => {
      setItem(data);
      setItemsFilters(data);
    });

    setTimeout(() => {
      setLoading(false);
    },5000);
  }, []);

  /*------------- LOCALSTORAGE --------------- */
  const localStorageKey = "favorite_products"
  useEffect(() => {
    console.log("obteniendo favoritos");
    loadFavoriteProducts();
  }, []);

  const loadFavoriteProducts = () => {
    const favoriteProducts = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setAddedItem(favoriteProducts);
  }
  /*-------------------------------------------*/

  /*--------------SEARCH-----------------------*/
  function changingSearchData(e) {
    const data = items.filter( i => i.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setItemsFilters([...data]);
  }

  const handlerOrderByName = (desc) => {
    let data = items.sort(
      (p1, p2) => p1.title.localeCompare(p2.title));
      if (desc) data = data.reverse();
      setItemsFilters([...data]);
  };

  const handlerOrderByPrice = (desc) => {
    let data = items.sort(
      (p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0);
      if (desc) data = data.reverse();
      setItemsFilters([...data]);
  };
  /**------------------------------------------- */


  /*-------------ADD producto ------------------*/
  function saveProduct(product) {
    save("favoritos", product);
    setFavList(get('favoritos'));
  }
  /*----------------------------------------------*/

  return (
    <div className="App">
      <div className="header">
        <div className="nav">
          <div className="nav-div-brand">
            <Header/>
          </div>
          <div className="nav-div-input-btn">
            <Dropdonw orderName={handlerOrderByName} orderPrice={handlerOrderByPrice}/>
            <Search
              products={items}
              onChangeData={changingSearchData}
            />
            <Button 
              num={favList.length} 
              click={setShowAddProducts} 
            /> 
          </div>
        </div>
      </div>
      {loading ? (
        <div className="spinner">
          <BounceLoader  color="#36d7b7" />
        </div>
      ) : 
      <div className="divCardBody">
        <CardBody
          products={itmesFilters}
          addItem={saveProduct}
          removeItem={saveProduct}
          addedItems={addedItems}
          />
      </div>
      }
      {showAddProducts && (
        <AddProducts
          click={setShowAddProducts}
          items={addedItems}
          removeItem={saveProduct}
          setAddedItem={setAddedItem}
        />
      )}
      <Footer/>
    </div>
  );
}

export default App;
