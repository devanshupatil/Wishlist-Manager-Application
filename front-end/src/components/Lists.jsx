// import React from 'react'

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Calendar, PencilLine, Trash2 } from "lucide-react";
import { FormatDate } from '../utlis/formatDate';
import { motion } from 'framer-motion';
import { useRef } from 'react';


const variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
};


const Lists = () => {

    const [items, setItems] = useState([]);
    const { getAccessToken } = useAuth();
    const searchInputRef = useRef(null);
    const sortSelectRef = useRef(null);


    const fetchProducts = async () => {
        try {
            const response = await fetch(`${URL}/api/products`, {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            });
            const data = await response.json();

            if (Array.isArray(data)) {
                setItems(data);
            } else {
                console.error('Fetched data is not an array:', data);
                setItems([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setItems([]);
        }
    };

    useEffect(() => {

        fetchProducts();

    }, []);

    const handleSearch = () => {
        const searchQuery = searchInputRef.current.value.toLowerCase();
        const filteredItems = items.filter(item => item.product_name.toLowerCase().includes(searchQuery));
        setItems(filteredItems);
    };

    const handleSort = () => {
        const sortOption = sortSelectRef.current.value;
        let sortedItems = [...items];
        if (sortOption === 'date') {
            sortedItems.sort((a, b) => new Date(b.added_date) - new Date(a.added_date));
        } else if (sortOption === 'price') {
            sortedItems.sort((a, b) => a.current_price - b.current_price);
        }
        setItems(sortedItems);
    };

    const handleDelete = async (id) => {
        try {

            const response = await fetch(`${URL}/api/products/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                setItems(items.filter(item => item.id !== id));
                toast.success('Product deleted successfully');
            } else {
                toast.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('An error occurred while deleting the product');
        }
    };

    const itemsList = Array.isArray(items) ? items.map(item => (

        <motion.div
            key={item.id}
            className={`item-card bg-white shadow-lg rounded-lg p-6 mb-6 ${item.current_price <= item.target_price ? 'border-green-500 border-2' : ''}`}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {item.current_price <= item.target_price && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-r" role="alert">
                    <p className="font-bold">Great news!</p>
                    <p>The price has reached or dropped below your target. It&apos;s time to make your purchase!</p>
                </div>
            )}
            <div className="flex justify-end mb-4">

                <button
                    className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500"
                    onClick={() => window.location.href = '/update-item/' + item.id}
                >
                    <a href={`/`}>
                        <PencilLine
                            className="text-black group-hover:text-blue-500"
                            size={20}
                        />
                    </a>
                </button>

                <button
                    className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                    onClick={() => handleDelete(item.id)}
                >
                    <Trash2
                        className="text-black group-hover:text-pink-500"
                        size={20}
                    />
                </button>

                <div className="gap-x-2 flex ">
                    <Calendar className="text-black" size={20} />
                    {FormatDate(item.added_date)}
                </div>


            </div>
            <h3 className="item-name text-lg font-bold text-gray-900 mb-2">Product Name: {item.product_name}</h3>
            <p className="item-url text-blue-500 mb-2">
                <a href={item.product_url} target="_blank" rel="noopener noreferrer" className='item-product_url text-gray-700 mb-1'>
                    Product URL: <span className="break-words hover:underline text-blue-500 mb-2">
                        {item.product_url ? (item.product_url.length > 50 ? item.product_url.substring(0, 50) + '...' : item.product_url) : 'N/A'}
                    </span>
                </a>
            </p>
            <p className="item-current-price text-gray-700 mb-1">Current Price: <span className="font-semibold">₹{item.current_price ? item.current_price.toLocaleString('en-IN') : 'N/A'}</span></p>
            <p className="item-target-price text-gray-700 mb-1">Target Price: <span className="font-semibold">₹{item.target_price ? item.target_price.toLocaleString('en-IN') : 'N/A'}</span></p>
            <p className="item-description text-gray-600 mb-1">Description: <span className="font-semibold">{item.notes || 'No description available'} </span> </p>
            <p className="item-category text-gray-700 mb-1">Category: <span className="font-semibold">{item.category}</span></p>
            <p className="item-priority text-gray-700">Priority: <span className="font-semibold">{item.priority}</span></p>
            <p className="item-created-at text-gray-700">Created At: <span className="font-semibold">{new Date(item.added_date).toLocaleDateString()}</span></p>
        </motion.div>
    )) : [];




    return (

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
            <div className="flex justify-between items-center mb-4">
                <h5 className="text-xl font-semibold">Your Wishlist Items</h5>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    id="searchInput"
                    placeholder="Search items..."
                    ref={searchInputRef}
                    onChange={handleSearch}
                />
                <select
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    id="sortSelect"
                    ref={sortSelectRef}
                    onChange={(e) => {
                        handleSort(e);
                        toast.success('Sorting updated');
                    }}
                >
                    <option value="date">Sort by Date</option>
                    <option value="price">Sort by Price</option>
                </select>
            </div>

            <div id="itemsList" className="space-y-4">
                {itemsList}
                {items.length === 0 && <p className="text-gray-600">No items found.</p>}
            </div>
        </div>
    )
}

export default Lists
