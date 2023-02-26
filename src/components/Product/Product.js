import React, {useEffect, useState} from 'react';
import './product.css'
import axios from "axios";
import {Link} from "react-router-dom";
import AddProduct from "../newProduct/newProduct";

const baseURL = "http://localhost:8000/products"
const Products = () => {
    const [product, setProduct] = useState(null)


    const setEmployeeData = () => {
        axios.get(baseURL).then((response) => {
            setProduct(response.data);
        }).catch(error => {
            alert("Error Ocurred while loading data:" + error);
        });
    }

    useEffect(() => {
        setEmployeeData();
    }, []);


    return (
        <div className='navbar'>
            <Link to='/add' className='link_add'>Add New</Link>

            <div className='container'>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>price</th>
                        <th>description</th>
                        <th>image</th>
                        <th>category</th>
                        <th>rating</th>
                        <th>rating count</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>

                    {product && product.map(item =>

                        <tr key={item.id}>
                            <td>{item.id} </td>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td>{item.image}</td>
                            <td>{item.category}</td>
                            <td>{item.rating.rate}</td>
                            <td>{item.rating.count}</td>
                            <td>
                                <Link to={`/edit/${item.id}`} className='link'>
                                    <i className='fas fa-edit'>Edit</i>
                                </Link>
                            </td>
                            <td>
                                <button className='delete' type='submit'
                                        onClick={()=>(item.id)} >
                                    <i className='fas fa-delete-left'></i>Delete</button>
                            </td>
                        </tr>
                    )}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;
