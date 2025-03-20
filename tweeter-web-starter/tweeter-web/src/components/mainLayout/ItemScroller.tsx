import { AuthToken, Status, User } from "tweeter-shared";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UserItem from "../userItem/UserItem";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "../userInfo/UserInfoHook";
import { UserItemPresenter, UserItemView } from "../../presenters/UserItemPresenter"; 

interface Props<T> {
  presenterGenerator: (view: ItemView<T>) => ItemPresenter<T>;
  ItemComponent: React.ComponentType<{ value: T }>;
}

interface ItemView<T> {
    addItems: (newItems: T[]) => void
    displayErrorMessage: (message: string) => void
}

interface ItemPresenter<T> {
    loadMoreItems: (authToken: string, userAlias: string) => void;
    reset: () => void;
    hasMoreItems: boolean;
  }



const ItemScroller = <T extends User | Status>({ presenterGenerator, ItemComponent }: Props<T>) => {
    const { displayErrorMessage } = useToastListener();
    const [items, setItems] = useState<T[]>([]);
    const [newItems, setNewItems] = useState<T[]>([]);
    const [changedDisplayedUser, setChangedDisplayedUser] = useState(true);
    const { displayedUser, authToken } = useUserInfo();
  

  // Initialize the component whenever the displayed user changes
  useEffect(() => {
    reset();
  }, [displayedUser]);

  // Load initial items whenever the displayed user changes. Done in a separate useEffect hook so the changes from reset will be visible.
  useEffect(() => {
    if(changedDisplayedUser) {
      loadMoreItems();
    }
  }, [changedDisplayedUser]);

  // Add new items whenever there are new items to add
  useEffect(() => {
    if(newItems) {
      setItems([...items, ...newItems]);
    }
  }, [newItems])

  const reset = async () => {
    setItems([]);
    setNewItems([]);
    setChangedDisplayedUser(true);

    presenter.reset();
  }
  const listener: ItemView<T> = {
    addItems: (newItems: T[]) => setNewItems((prev) => [...prev, ...newItems]),
    displayErrorMessage,
  };

  const [presenter] = useState(presenterGenerator(listener));

  const loadMoreItems = async () => {
    presenter.loadMoreItems(authToken!.token, displayedUser!.alias);
    setChangedDisplayedUser(false);
  };

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={presenter.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="row mb-3 mx-0 px-0 border rounded bg-white"
          >
            <ItemComponent value={item} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ItemScroller;