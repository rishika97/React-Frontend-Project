import React, { useState } from 'react';
import axios from 'axios';

const AddProductPage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://dev-project-ecommerce.upgrad.dev/api/products', {
                name,
                price,
            });
            alert('Product added successfully');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleAddProduct}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductPage;
