import React,{memo} from "react";
import {FaShoppingCart} from "react-icons/fa"
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar=()=>{
    
    const {cart}=useSelector((state)=>state) 
    
    return(
        <div>
            <div className="flex justify-between items-center h-20 max-w-6xl mx-auto">
                <NavLink>
                    <div className="ml-5">
                     <img src="../logo.png" alt="" className="lg:h-14 md:h-10 h-8"/>
                    </div>
                </NavLink>
             <div className="flex gap-x-10 items-center font-medium text-slate-100 mr-5">
                <NavLink to="/">
                    <p>Home</p>
                </NavLink>
                <NavLink to="/cart">
                <div className="relative text-2xl">
                    <FaShoppingCart/>
                    {
                        cart.length>0 &&
                         <span className="absolute -top-1 -right-2 bg-green-500 text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">{cart.length}</span>
                    }
                   
                </div>
                </NavLink>
            </div>
            </div>
        </div>
    )
}

export default memo(Navbar);