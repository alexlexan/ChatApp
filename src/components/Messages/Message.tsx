import React from "react";
import moment from "moment";
import { Comment, Image } from "semantic-ui-react";
import { MessageType, CurrentUser } from "../../components/Types";

type Props = {
  message: MessageType;
  user: CurrentUser;
};

const isOwnMessage = (message: MessageType, user: CurrentUser) => {
  return message.user.id === user.uid ? "message__self" : "";
};

const isImage = (message: MessageType) => {
  return message.hasOwnProperty("image") && !message.hasOwnProperty("content");
};

const timeFromNow = (timestamp: object) => moment(timestamp).fromNow();

const Message: React.FC<Props> = ({ message, user }) => (
  <Comment>
    <Comment.Avatar src={message.user.avatar} />
    <Comment.Content className={isOwnMessage(message, user)}>
      <Comment.Author as="a">{message.user.name}</Comment.Author>
      <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
      {isImage(message) ? (
        <Image src={message.image} className="message__image" />
      ) : (
        <Comment.Text>{message.content}</Comment.Text>
      )}
    </Comment.Content>
  </Comment>
);

export default Message;
