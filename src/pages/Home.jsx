
import {useState,useEffect} from "react"
import Spinner from "../components/Spinner"
import Product from "../components/Product"


const Home=()=>{
    const API_URL = "https://fakestoreapi.com/products";

    const [loading,setloading]=useState(false);
    const [posts,setPosts]=useState([]);
    async function fetchData(){
        setloading(true);
        try{
            const req=await fetch(API_URL);
            const res=await req.json();
            setPosts(res);
           
        }
        catch(err){
            console.log(err);
            setPosts([]);
        }
        setloading(false);
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return(
        <div >
            {
                loading?(<Spinner/>):
                posts.length>0?
                (<div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5
                    gap-y-8 max-w-6xl p-6 mx-auto my-7 min-h-[80vh] mx-auto">
                    {
                    posts.map((post)=>{
                        return <Product key={post.id} post={post}/>
                    })
                }
                </div>):
                (
                <div className="flex justify-center items-center">
                    No data Found
                </div>)
            }
        </div>
    )
}

export default Home;