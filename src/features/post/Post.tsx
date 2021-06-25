import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { Checkbox, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { ThumbUp } from "@material-ui/icons";
import {
  fetchAsyncPostComment,
  fetchAsyncGetCommentsAndLikeCounts,
  selectCommentsAndLikeCounts,
  fetchAsyncPostLike,
  selectLike,
  selectIsLoadingPost,
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncIsFavorite,
  fetchAsyncDeleteLike,
  fetchAsyncGetLikes,
  selectLikeCount,
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
  // const isLoadingPost = useSelector(selectIsLoadingPost);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      // if (localStorage.localJWT) {
      await dispatch(fetchAsyncGetCommentsAndLikeCounts());
      //await dispatch(fetchAsyncGetLikes());
      // }
    };
    fetchComments();
  }, [dispatch]);

  const commentList = useSelector(selectCommentsAndLikeCounts);
  const likeCount = useSelector(selectLikeCount);
  // Handle like
  const handlerLike = async (comment_id: number) => {
    const packet = {
      comment_id: comment_id,
      user_id: localStorage.user_id,
    };

    const resultReg = await dispatch(fetchAsyncIsFavorite(packet));

    if (fetchAsyncIsFavorite.fulfilled.match(resultReg)) {
      if (
        resultReg.payload.id !== "" &&
        resultReg.payload.id !== null &&
        typeof resultReg.payload.id !== "undefined"
      ) {
        await dispatch(fetchPostStart());
        await dispatch(fetchAsyncDeleteLike(packet));
        await dispatch(fetchPostEnd());
      } else {
        await dispatch(fetchPostStart());
        await dispatch(fetchAsyncPostLike(packet));
        await dispatch(fetchPostEnd());
      }
    }
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
        {commentList.map((commentAndCount) => (
          <>
            <div key={commentAndCount.id} className={styles.commentSentence}>
              <p className={styles.commentText}>{commentAndCount.text}　</p>
              <div className={styles.thumsUp}>
                <ThemeProvider theme={theme}>
                  <Checkbox
                    icon={<ThumbUp />}
                    checkedIcon={<ThumbUp />}
                    // defaultChecked={this.state.chkbox}
                    className={styles.likeBox}
                    onChange={() => handlerLike(commentAndCount.id)}
                  />
                </ThemeProvider>
                <p>{commentAndCount.count}　</p>

                {/* <span>
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className={like ? styles.likeButtonColor : ""}
                    onClick={handleClick}
                  />
                </span> */}
              </div>
            </div>
            <div className={styles.commentLike}></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Post;
