import {toast} from "react-hot-toast"
import {useDispatch,useSelector} from "react-redux"
import {add,remove} from "../redux/slices/CartSlice"
import { MdImageSearch } from "react-icons/md";
import axios from 'axios'
import React,{ useCallback, useMemo } from "react";


const REACT_APP_API_KEY='AIzaSyBVwQEQ6qRuPmPd7TIwhvRy3l0PamGnWzU'
const REACT_APP_CSE_ID='d588652591e37436b'

const Product = React.memo(({ post }) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const isItemInCart = useMemo(() => {
        return cart.some((item) => item.id === post.id);
    }, [cart, post.id]);

    const addToCart = useCallback(() => {
        dispatch(add(post));
        toast.success("Added Item");
    }, [dispatch, post]);

    const removeFromCart = useCallback(() => {
        dispatch(remove(post.id));
        toast.error("Removed Item");
    }, [dispatch, post.id]);

    const searchSimilarImages = useCallback(async (query) => {
        try {
            const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    key: REACT_APP_API_KEY,
                    cx: REACT_APP_CSE_ID,
                    q: query,
                    searchType: 'image',
                    imgType: 'photo',
                    imgSize: 'medium',
                    fileType: 'jpg',
                    safe: 'off',
                },
            });
            console.log(response)
            const searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
        } catch (error) {
            console.log('Error searching images:', error);
        }
    }, []);

 

    return (
        <div className="flex flex-col items-center justify-between w-full gap-3 p-4 rounded-xl border-2 border-[#00095] shadow-lg hover:shadow-2xl hover:scale-[1.03] md:hover:scale-[1.05] transition ease-in ml-5 mt-10">
            <div>
                <p className="text-left truncate w-40 mt-1">{post.title}</p>
            </div>
            <div>
                <p>{post.description.split(" ").slice(0, 10).join(" ") + "..."}</p>
            </div>
            <div className="relative z-[0] w-full h-[180px] flex justify-center">
                <img src={post.image} className="h-full" alt={post.title} />
                <MdImageSearch
                    onClick={() => searchSimilarImages(post.title)}
                    className="absolute z-[999] h-[50px] w-[50px] bottom-10 left-0 bg-black text-white rounded-full px-3 py-1"
                />
            </div>
            <div className="flex justify-between gap-12">
                <div>
                    <p className="text-green-500 font-semibold">${post.price}</p>
                </div>
                <button
                    onClick={isItemInCart ? removeFromCart : addToCart}
                    className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
                >
                    {isItemInCart ? "Remove Item" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
});

export default Product;