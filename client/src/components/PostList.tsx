import React, { useEffect, useState } from "react";
import { fetchPostsAndComments } from "../services";
import CommentCreation from "./CommentCreation";
import CommentList, { type Comment } from "./CommentList";

type PostsWitchComments = {
  id: string;
  title: string;
  comments: Comment[];
};

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostsWitchComments[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPostsAndComments();
        setPosts(Object.values(fetchedPosts));
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

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
            <CommentList comments={post.comments} />
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