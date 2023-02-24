
import { useEffect, useState } from 'react';
import style from './App.css';
import NewProduct from './components/NewProduct/NewProduct';
import Products from './components/Products/Products';
import { getAllProducts } from './components/ProductServices/ProductServices';

function App() {

  const [productsData,setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);
  const [modal,setModal] =useState(false);

  const [searchItem, setSearchItem] = useState("");

  const [searchParameter] = useState(["category","title","price"]);

  // Fetching data from an external API 
  const fetchData = async()=>{
    const res = await getAllProducts();
    try {
      if(!res.ok){
        throw new Error('Resource Note Found!');
      }
      const data = await res.json();
      setProductsData(data);
      setIsLoading(false);
      setError([]);
    } catch (error) {
      setProductsData([]);
      setIsLoading(false);
      setError(error.message);
    }
  };

  // initial lading of data to our browser
  useEffect(()=>{
    setIsLoading(true);
    fetchData();
  },[]);

/**
 * Main function is to search products based on category, price or title
 * @param {Object} event - Object
 * @returns - value according to the search parameter
 */

const handleItemSearch =(event)=>{
  event.preventDefault();
  return setProductsData(productsData.filter((data)=>{
    return searchParameter.some((newData)=>{
      return (data[newData].toString().toLowerCase().indexOf(searchItem.toLowerCase()) > -1);
    });
  }));
};



let createElement ='';

if(productsData.length > 0){
  // createElement => creating the products component with data in productsData 
  //as spread operator
  createElement = productsData.map((data)=>{
    return <Products {...data}/>
  });
}
if(productsData.length === 0 && error.length > 0){
  // createElement => <p> error[0] </p>
  createElement = <p>{error}</p>;
}
if(isLoading){
  // createElement => <p> Loading ....</p>
  createElement = <p>Loading....</p>;
}

  return (
    <div className={style.container}>

      <h1 className={style.heading}> Products </h1>

      <div className={style.container__wrapper}>
          <section className={style.container__new__product}>
              <button onClick={()=>setModal(true)}>Create</button>
              <NewProduct show ={modal} onHide ={()=>setModal(false)}/>
          </section>

          <form onSubmit={handleItemSearch} className={style.container__search}>
              <input type="text" name="search" value={searchItem} onChange={(event)=>setSearchItem(event.target.value)}/>
              <button type='submit'>Search</button>
          </form>
      </div>
      
      {createElement}
      
    </div>
  );
}

export default App;
