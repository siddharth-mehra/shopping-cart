import { useState, useEffect, useCallback } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
// import axios from "axios";

const Home = () => {
    const API_URL = "https://fakestoreapi.com/products";
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const req = await fetch(API_URL);
        const res = await req.json();
        setPosts(res);
      } catch (err) {
        console.log(err);
        setPosts([]);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const searchSimilarImages = useCallback(async (query) => {
      try {
        // Constructing the Google Image Search URL
        const searchQuery = `popular products related to ${encodeURIComponent(query)}`;
        const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
        
        // Open the Google Image Search results in a new window with specified height and width
        window.open(searchUrl, '_blank', 'width=800,height=600,top=0,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes');
      } catch (error) {
        console.log("Error searching images:", error);
      }
    }, []);
  
    return (
      <div>
        {loading ? (
          <Spinner />
        ) : posts.length > 0 ? (
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-8 max-w-6xl p-6 mx-auto my-7 min-h-[80vh]">
            {posts.map((post) => (
              <Product key={post.id} post={post} onImageSearch={searchSimilarImages} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">No data Found</div>
        )}
      </div>
    );
};

export default Home;

  