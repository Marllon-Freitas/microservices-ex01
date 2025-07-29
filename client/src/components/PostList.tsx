import React, { useCallback, useEffect, useState } from "react";
import { fetchPosts } from "../services";
import CommentCreation from "./CommentCreation";
import CommentList from "./CommentList";

type Post = {
  id: string;
  title: string;
};


const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadPosts = useCallback(async () => {
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(Object.values(fetchedPosts));
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  console.log("Posts loaded:", posts);

  return (
    <div>
      <h2>Posts:</h2>
      {posts.length === 0 && <p>No posts available.</p>}
      <br />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <CommentCreation postId={post.id} />
            <CommentList postId={post.id} />
            <br />
            <hr />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;