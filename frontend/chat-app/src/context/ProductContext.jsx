import React, { createContext, useState, useEffect } from "react";
import { fetchProduct } from "../api/user/ProductApi";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await fetchProduct();
            setProducts(res?.data?.fetchedProduct|| []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{
            products,
            fetchProducts
        }}>
            {children}
        </ProductContext.Provider>
    );
};