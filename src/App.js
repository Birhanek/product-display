
import { useEffect, useState } from 'react';
import './App.css';
import { getAllProducts } from './components/ProductServices/ProductServices';

function App() {

  const [productsData,setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);


  const fetchData = async()=>{
    const res = await getAllProducts();
    try {
      if(!res.ok){
        throw new Error('Resource Note Found!');
      }
      setProductsData(res.json());
      setIsLoading(false);
      setError([]);
    } catch (error) {
      setProductsData([]);
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(()=>{
    setIsLoading(true);
    fetchData();
  },[])


const createElement ='';

if(productsData.length > 0){
  // createElement => creating the products component with data in productsData 
  //as spread operator
}
if(productsData.length === 0 && error.length > 0){
  // createElement => <p> error[0] </p>
}
if(isLoading){
  // createElement => <p> Loading ....</p>
}

  return (
    <div className="App">
    {createElement}
    </div>
  );
}

export default App;
