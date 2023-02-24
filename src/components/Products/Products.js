import React from 'react'


/// sample what it should look like the products component
const Products = ({...product}) => {
  return (
    <div style={{backgroundColor:'red',display:'flex',flexDirection:'column'}}>
      <h1>{product.category}</h1>
      <p>{product.description}</p>
      <p>{product.title}</p>
    </div>
  )
}

export default Products
