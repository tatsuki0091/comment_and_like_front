import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { Checkbox, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { ThumbUp } from "@material-ui/icons";
import {
  fetchAsyncPostComment,
  fetchAsyncGetCommentsAndLikeCounts,
  selectCommentsAndLikeCounts,
  fetchAsyncPostLike,
  fetchPostStart,
  fetchPostEnd,
  fetchCount,
  fetchAsyncIsFavorite,
  fetchAsyncDeleteLike,
} from "./postSlice";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";

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
      await dispatch(fetchAsyncGetCommentsAndLikeCounts(localStorage.user_id));
      //await dispatch(fetchAsyncGetLikes());
      // }
    };
    fetchComments();
  }, [dispatch]);

  const commentList = useSelector(selectCommentsAndLikeCounts);

  // const likeCount = useSelector(selectLikeCount);
  // Handle like
  const handleLike = async (
    comment_id: number,
    liked: boolean,
    commentList: any
  ) => {
    const packet = {
      comment_id: comment_id,
      user_id: localStorage.user_id,
    };

    const newState: any[] = new Array();

    const resultReg = await dispatch(fetchAsyncIsFavorite(packet));
    if (fetchAsyncIsFavorite.fulfilled.match(resultReg)) {
      let count = 0;

      for (var item in commentList) {
        if (comment_id === commentList[Number(item)].id) {
          // TODO 数字のカウントを修正する
          if (
            resultReg.payload.id !== "" &&
            resultReg.payload.id !== null &&
            typeof resultReg.payload.id !== "undefined"
          ) {
            count = commentList[item].count - 1;
          } else {
            count = commentList[item].count + 1;
          }

          if (typeof commentList[item].count === "undefined") {
            count = 1;
          }
          const rduceState = {
            id: commentList[item].id,
            text: commentList[item].text,
            count: count,
            liked: commentList[item].liked,
            user_id: commentList[item].user_id,
            created_at: commentList[item].created_at,
          };
          newState.push(rduceState);
        } else {
          const rduceState = {
            id: commentList[item].id,
            text: commentList[item].text,
            count: commentList[item].count,
            liked: commentList[item].liked,
            user_id: commentList[item].user_id,
            created_at: commentList[item].created_at,
          };
          newState.push(rduceState);
        }
      }

      // Sort array
      newState.sort(function (a, b) {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        // a must be equal to b
        return 0;
      });

      await dispatch(fetchPostStart());

      if (
        resultReg.payload.id !== "" &&
        resultReg.payload.id !== null &&
        typeof resultReg.payload.id !== "undefined"
      ) {
        await dispatch(fetchAsyncDeleteLike(packet));
      } else {
        await dispatch(fetchAsyncPostLike(packet));
      }
      await dispatch(fetchPostEnd());
      await dispatch(fetchCount(newState));
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
              className={
                text.length === 0
                  ? styles.addButtonInActive
                  : styles.addButtonActive
              }
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
          <div key={commentAndCount.id}>
            <div className={styles.commentSentence}>
              <p className={styles.commentText}>{commentAndCount.text}　</p>
              <div className={styles.thumsUp}>
                <ThemeProvider theme={theme}>
                  <Checkbox
                    icon={<ThumbUp />}
                    checkedIcon={<ThumbUp />}
                    defaultChecked={commentAndCount.liked}
                    className={styles.likeBox}
                    onChange={() =>
                      handleLike(
                        commentAndCount.id,
                        commentAndCount.liked,
                        commentList
                      )
                    }
                  />
                </ThemeProvider>

                {commentAndCount.count !== null &&
                typeof commentAndCount.count !== "undefined" ? (
                  <p>{commentAndCount.count}</p>
                ) : (
                  <p>0</p>
                )}
              </div>

              <div className={styles.commentLike}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
