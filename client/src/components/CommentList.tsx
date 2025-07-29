import React from "react";
import { fetchComments } from "../services";
import { useEffect, useState } from "react";

type Comment = {
  id: string;
  content: string;
};

const CommentList: React.FC<{ postId: string }> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await fetchComments(postId);
        setComments(Object.values(fetchedComments));
      } catch (error) {
        console.error("Error loading comments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId]);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div>
      <h4>Comments:</h4>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;