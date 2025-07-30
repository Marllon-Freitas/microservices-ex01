import React from "react";

export type Comment = {
  id: string;
  content: string;
};

const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  return (
    <div>
      <h4>Comments:</h4>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;