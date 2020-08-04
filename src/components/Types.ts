export type MessageType = {
  user: {
    avatar: string;
    id: string;
    name: string;
  };
  image?: string;
  content?: string;
  timestamp: object;
};

export type CurrentUser = {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  status?: string;
  name?: string;
};

export type CurrentChannel = {
  createdBy: {
    avatar: string;
    name: string;
  };
  details: string;
  id: string;
  name: string;
};

export type Notification = {
  id: string;
  count: number;
  total: number;
  lastKnownTotal: number;
};

export type UserPosts = {
  [key: string]: {
    avatar: string;
    count: number;
  };
};

export type listeners = {
  id: string;
  ref: firebase.database.Reference;
  event: EventListeners;
};

export type EventListeners =
  | "value"
  | "child_added"
  | "child_changed"
  | "child_moved"
  | "child_removed"
  | undefined;

export type MetaDataFile = { contentType: string };

export type StateFile = {
  name: string;
};
