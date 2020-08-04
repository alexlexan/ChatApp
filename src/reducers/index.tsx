import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";
import { UserActions, ColorActions, ChannelActions } from "../actions";
import { CurrentUser, CurrentChannel, UserPosts } from "../components/Types";

const initialUserState = {
  currentUser: (null as unknown) as CurrentUser,
  isLoading: true,
};

type UserState = {
  currentUser: CurrentUser;
  isLoading: boolean;
};

const user_reducer = (
  state: UserState = initialUserState,
  action: UserActions
) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false,
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

const initialChannelState = {
  currentChannel: null as CurrentChannel | null,
  isPrivateChannel: false,
  userPosts: null as UserPosts | null,
} as ChannelState;

type ChannelState = {
  currentChannel: CurrentChannel;
  isPrivateChannel: boolean;
  userPosts: UserPosts;
};

const channel_reducer = (
  state: ChannelState = initialChannelState,
  action: ChannelActions
) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel as CurrentChannel,
      };
    case actionTypes.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: action.payload.isPrivateChannel,
      };
    case actionTypes.SET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload.userPosts,
      };
    default:
      return state;
  }
};

const initialColorsState = {
  primaryColor: "#4c3c4c",
  secondaryColor: "#eee",
};

type ColorsState = {
  primaryColor: string;
  secondaryColor: string;
};

const colors_reducer = (
  state: ColorsState = initialColorsState,
  action: ColorActions
) => {
  switch (action.type) {
    case actionTypes.SET_COLORS:
      return {
        primaryColor: action.payload.primaryColor,
        secondaryColor: action.payload.secondaryColor,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer,
  colors: colors_reducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
