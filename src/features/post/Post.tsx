import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";
import {
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncPostComment,
} from "./postSlice";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";

const Post: React.FC = () => {
  const [text, setText] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const postComment = async (e: React.MouseEvent<HTMLElement>) => {
    // 無駄なリフレッシュを無効化
    e.preventDefault();
    const packet = {
      user_id: Number(localStorage.getItem("user_id")),
      text: text,
    };
    console.log(packet);
    await dispatch(fetchPostStart());
    await dispatch(fetchAsyncPostComment(packet));
    await dispatch(fetchPostEnd());
    setText("");
  };

  useEffect(() => {
    const getUser = async () => {};
    getUser();
  }, [dispatch]);
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
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              disabled={!text.length}
              className={styles.add_button}
              type="submit"
              onClick={postComment}
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
