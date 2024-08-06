import React, { useEffect, useState } from "react";
import axios from "axios";
import PublicationCard from "../components/PublicationCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
        try {
          const response = await axios.get("http://localhost:8000/blogs/", {
            headers: {
              'Accept': 'application/json'
            }
          });
          console.log("Response Data:", response.data); // Log fetched data
          setBlogs(response.data.data || []); // Access the nested data
        } catch (error) {
          console.error("Fetch Error:", error); // Log errors
          setError("An error occurred while fetching data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {console.log(blogs)}
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <PublicationCard
            key={blog.id}
            avatar={blog.image}
            username={blog.user.full_name}
            time={blog.created_at}
            text={blog.title}
            image={blog.image}
            likes={blog.likes_count}
          />
        ))
      ) : (
        <div>No blogs found</div>
      )}
    </div>
  );
};

export default Blogs;
