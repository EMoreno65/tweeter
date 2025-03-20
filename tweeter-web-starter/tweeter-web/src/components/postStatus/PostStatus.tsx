import "./PostStatus.css";
import { useMemo, useState } from "react";
import { AuthToken, Status } from "tweeter-shared";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "../userInfo/UserInfoHook";
import { PostStatusPresenter } from "../../presenters/PostStatusPresenter";

interface Props {
  presenter?: PostStatusPresenter;
}  

const PostStatus = ({ presenter: providedPresenter }: Props) => {
  const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
    useToastListener();
  const { currentUser, authToken } = useUserInfo();
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const presenter = useMemo(
    () =>
      providedPresenter ||
      new PostStatusPresenter({
        displayErrorMessage,
        currentUser,
        authToken,
        displayInfoMessage,
        setIsLoading,
        clearLastInfoMessage,
        post,
        setPost,
      }),
    [
      providedPresenter,
      displayErrorMessage,
      currentUser,
      authToken,
      displayInfoMessage,
      setIsLoading,
      clearLastInfoMessage,
      post,
      setPost,
    ]
  ); 

  // const postStatus = async (
  //   authToken: AuthToken,
  //   newStatus: Status
  // ): Promise<void> => {
  //   // Pause so we can see the logging out message. Remove when connected to the server
  //   await new Promise((f) => setTimeout(f, 2000));

  //   // TODO: Call the server to post the status
  // };

  const submitPost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Is it going into submitPost?");
    presenter.submitPost(event, post);
  };

  const checkButtonStatus: () => boolean = () => {
    return !post.trim() || !authToken || !currentUser;
  };

  return (
    <div className={isLoading ? "loading" : ""}>
      <form>
        <div className="form-group mb-3">
          <textarea
            className="form-control"
            id="postStatusTextArea"
            rows={10}
            placeholder="What's on your mind?"
            aria-label = "statusField"
            value={post}
            onChange={(event) => {
              setPost(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <button
            id="postStatusButton"
            className="btn btn-md btn-primary me-1"
            type="button"
            disabled={checkButtonStatus()}
            style={{ width: "8em" }}
            onClick={submitPost}
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <div>Post Status</div>
            )}
          </button>
          <button
            id="clearStatusButton"
            className="btn btn-md btn-secondary"
            type="button"
            disabled={checkButtonStatus()}
            onClick={(event) => presenter.clearPost(event)}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostStatus;
