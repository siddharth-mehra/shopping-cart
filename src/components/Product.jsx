import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/slices/CartSlice";
import React, { useCallback, useMemo } from "react";

const Product = React.memo(({ post, onImageSearch }) => {
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
        <svg
          viewBox="0 0 24 24"
          focusable="false"
          height="40"
          width="40"
          onClick={() => onImageSearch(post.title)}
          className="absolute z-50 bottom-2 left-2 text-black rounded-full p-1 cursor-pointer"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M21,9v4h-2V9c0-1.1-0.9-2-2-2H7C5.9,7,5,7.9,5,9v3H3V9c0-2.21,1.79-4,4-4h2l1-2h4l1,2h2C19.21,5,21,6.79,21,9z M12,21H7 c-2.21,0-4-1.79-4-4v-2h2v2c0,1.1,0.9,2,2,2h5V21z M18,16c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S16.9,16,18,16z M12,10 c1.66,0,3,1.34,3,3s-1.34,3-3,3s-3-1.34-3-3S10.34,10,12,10z"></path>
        </svg>
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
