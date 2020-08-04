import * as actionTypes from "./types";
import { UserPosts, CurrentChannel, CurrentUser } from "../components/Types";

/* User Actions */
export const setUser = (user: CurrentUser) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user,
    },
  } as const;
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER,
  } as const;
};

/* Channel Actions */
export const setCurrentChannel = (
  channel: Pick<CurrentChannel, "id" | "name">
) => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel,
    },
  } as const;
};

export const setPrivateChannel = (isPrivateChannel: boolean) => {
  return {
    type: actionTypes.SET_PRIVATE_CHANNEL,
    payload: {
      isPrivateChannel,
    },
  } as const;
};

export const setUserPosts = (userPosts: UserPosts) => {
  return {
    type: actionTypes.SET_USER_POSTS,
    payload: {
      userPosts,
    },
  } as const;
};

export const setColors = (primaryColor: string, secondaryColor: string) => {
  return {
    type: actionTypes.SET_COLORS,
    payload: {
      primaryColor,
      secondaryColor,
    },
  } as const;
};

const ChannelActions = {
  setCurrentChannel,
  setPrivateChannel,
  setUserPosts,
};
const ColorActions = {
  setColors,
};
const UserActions = {
  setUser,
  clearUser,
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type ChannelActions = ReturnType<InferValueTypes<typeof ChannelActions>>;
export type ColorActions = ReturnType<InferValueTypes<typeof ColorActions>>;
export type UserActions = ReturnType<InferValueTypes<typeof UserActions>>;
