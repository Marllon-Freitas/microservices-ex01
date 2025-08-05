import React from "react";

export type Comment = {
  id: string;
  content: string;
  status?: string; // 'pending' | 'approved' | 'rejected'
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
            {comment.status === "approved" ? (
              <p title={comment.content}>{comment.content}</p>
            ) : comment.status === "rejected" ? (
              <p className="rejected">Comment rejected</p>
            ) : (
              <p className="pending">Comment is pending moderation</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;