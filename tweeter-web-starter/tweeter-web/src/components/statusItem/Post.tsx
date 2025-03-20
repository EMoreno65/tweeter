import { AuthToken, FakeData, Status, User, Type } from "tweeter-shared";
import { Link } from "react-router-dom";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "../userInfo/UserInfoHook";
import { useNavigating } from "../UserNavigationHook";
import { PostPresenter } from "../../presenters/PostPresenter";
import { useState } from "react";

interface Props {
  status: Status;
}

const Post = (props: Props) => {
  const { setShownUser, currentUser, authToken } = useUserInfo();
  const { displayErrorMessage } = useToastListener();

  const [presenter] = useState(new PostPresenter({
    displayErrorMessage,
    setShownUser,
    authToken,
    currentUser,
  }));

  return (
    <>
      {props.status.segments.map((segment, index) =>
        segment.type === Type.alias ? (
          <Link
            key={index}
            to={segment.text}
            onClick={(event) => presenter.navigateToUser(event)}
          >
            {segment.text}
          </Link>
        ) : segment.type === Type.url ? (
          <a
            key={index}
            href={segment.text}
            target="_blank"
            rel="noopener noreferrer"
          >
            {segment.text}
          </a>
        ) : segment.type === Type.newline ? (
          <br key={index} />
        ) : (
          segment.text
        )
      )}
    </>
  );
};

export default Post;
