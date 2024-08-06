import React, { useEffect, useState } from "react";
import PublicationCard from "../components/PublicationCard";


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://a0d3-185-213-230-50.ngrok-free.app/blogs/");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setBlogs(data);
        console.log(data)
      } catch (error) {
        setError(error.message);
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
      {blogs.map((blog) => (
        <PublicationCard
          key={blog.id}
          avatar={blog.image}
          username={blog.user.full_name}
          time={new Date(blog.created_at).toLocaleString()}
          text={blog.title}
          image={blog.image}
          likes={blog.likes_count}
          commentsCount={blog.comments_count}
        />
      ))}
    </div>
  );
};

export default Blogs;
