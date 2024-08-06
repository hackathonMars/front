import React, { useEffect, useState } from "react";
import axios from "axios";
import PublicationCard from "../components/PublicationCard"; // Adjust the path as needed

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
        const response = await axios.get("https://71f0-185-213-230-50.ngrok-free.app/blogs/");
        setBlogs(response.data);
      try {
        
        
      } catch (err) {
        setError(err);
        console.log(response.data);
      } finally {
        setLoading(false);
      }
    };

    

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading blogs: {error.message}</p>;

  return (
    <div className="blogs-container">
      {blogs.map((blog) => (
        <PublicationCard
          key={blog.id} // Ensure that each blog has a unique id
          avatar={blog.user.avatar || "https://randomuser.me/api/portraits/men/32.jpg"} // Assuming user object contains an avatar property
          username={blog.user.full_name}
          time={blog.created_at}
          title={blog.title}
          image={blog.image}
          likes={blog.likes_count}
          commentsCount={blog.comments_count} // Assuming there is a comments_count property
        />
      ))}
    </div>
  );
};

export default Blogs;
