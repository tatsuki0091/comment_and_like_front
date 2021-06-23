import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";
import {
  fetchAsyncPostComment,
  fetchAsyncGetComments,
  selectComments,
  setLiked,
  resetLiked,
  selectLiked,
} from "./postSlice";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Post: React.FC = () => {
  const [text, setText] = useState("");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      // if (localStorage.localJWT) {
      await dispatch(fetchAsyncGetComments());
      // }
    };
    fetchComments();
  }, [dispatch]);

  const commentList = useSelector(selectComments);
  const liked = useSelector(selectLiked);

  // Handle liked
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log("dddd");
  };

  // Register the comment
  const postComment = async (e: React.MouseEvent<HTMLElement>) => {
    // 無駄なリフレッシュを無効化
    e.preventDefault();
    const packet = {
      user_id: Number(localStorage.getItem("user_id")),
      text: text,
    };
    await dispatch(fetchAsyncPostComment(packet));
    setText("");
  };
  return (
    <div className={styles.frame}>
      <div>
        <p className={styles.questionnaireTitle}>
          What new feature would you like us to add to Buddytree?
        </p>
      </div>
      <div className={styles.commentBox}>
        <form className={styles.commentForm}>
          <div className={styles.postInput}>
            <textarea
              className={styles.textarea}
              placeholder="add a comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              disabled={!text.length}
              className={styles.addButton}
              type="submit"
              onClick={postComment}
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <div className={styles.commentBox}>
        {commentList.map((comment) => (
          <>
            <div key={comment.id} className={styles.commentSentence}>
              <p className={styles.commentText}>{comment.text}　</p>
              <div className={styles.thumsUp}>
                <span onClick={handleClick}>
                  <FontAwesomeIcon icon={faThumbsUp} />
                </span>
              </div>
            </div>
            <div className={styles.commentLiked}></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Post;
