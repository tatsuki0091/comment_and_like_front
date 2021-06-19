import React, { useState } from "react";
import styles from "./Post.module.css";

const Post: React.FC = () => {
  const [text, setText] = useState("");
  return (
    <div className={styles.frame}>
      <div>
        <p className={styles.questionnaireTitle}>
          What new feature would you like us to add to Buddytree?
        </p>
      </div>
      <div className={styles.commentBox}>
        <form className={styles.commentForm}>
          <div className={styles.post_input}>
            <textarea
              className={styles.textarea}
              placeholder="add a comment"
              //   value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              disabled={!text.length}
              className={styles.add_button}
              type="submit"
              //   onClick={postComment}
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <div className={styles.commentBox}>
        <div className={styles.post_comments}>
          <div className={styles.post_comment}>
            <p>test</p>
          </div>
          {/* {commentsOnPost.map((comment) => (
          <div key={comment.id} className={styles.post_comment}>
            <p>{comment.text}</p>
          </div>
        ))} */}
        </div>
      </div>
    </div>
  );
};

export default Post;
