import React from "react";

export type Comment = {
  id: string;
  content: string;
};

const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  return (
    <div>
      <h4>💬 Comments:</h4>
      {comments.length === 0 ? (
        <p className="empty-state">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <p title={comment.content}>{comment.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;