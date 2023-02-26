const Base_API = 'https://fakestoreapi.com';

export const getAllProducts = async ()=>{
    const response = await fetch(`${Base_API}/products`);

    return response;
}
