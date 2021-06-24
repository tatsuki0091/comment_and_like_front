import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { Checkbox, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { ThumbUp } from "@material-ui/icons";
import {
  fetchAsyncPostComment,
  fetchAsyncGetComments,
  selectComments,
  fetchAsyncPostLiked,
  selectLiked,
  selectIsLoadingPost,
  fetchPostStart,
  fetchPostEnd,
} from "./postSlice";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";

const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiCheckbox: {
      colorSecondary: {
        "&$checked": {
          "&:hover": {
            backgroundColor: "transparent",
          },
          color: "#0000ff",
        },
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },
  },
});

const Post: React.FC = () => {
  const [text, setText] = useState("");
  const isLoadingPost = useSelector(selectIsLoadingPost);
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
  const handlerLiked = async (comment_id: number, user_id: number) => {
    const packet = {
      comment_id: comment_id,
      user_id: user_id,
    };
    console.log(comment_id);
    console.log(user_id);
    await dispatch(fetchPostStart());
    await dispatch(fetchAsyncPostLiked(packet));
    await dispatch(fetchPostEnd());
    console.log("huhuhu");
  };

  // Register the comment
  const postComment = async (e: React.MouseEvent<HTMLElement>) => {
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
                <ThemeProvider theme={theme}>
                  <Checkbox
                    icon={<ThumbUp />}
                    checkedIcon={<ThumbUp />}
                    // defaultChecked={this.state.chkbox}
                    className={styles.likedBox}
                    onChange={() => handlerLiked(comment.id, comment.user_id)}
                  />
                </ThemeProvider>

                {/* <span>
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className={liked ? styles.likedButtonColor : ""}
                    onClick={handleClick}
                  />
                </span> */}
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
