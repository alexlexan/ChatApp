import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

type Props = {
  channelName: string;
  numUniqueUsers: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchLoading: boolean;
  isPrivateChannel: boolean;
  handleStar: () => void;
  isChannelStarred: boolean;
};

const MessagesHeader: React.FC<Props> = ({
  channelName,
  numUniqueUsers,
  handleSearchChange,
  searchLoading,
  isPrivateChannel,
  handleStar,
  isChannelStarred,
}) => {
  return (
    <Segment clearing>
      {/* Channel Title */}
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {channelName}
          {!isPrivateChannel && (
            <Icon
              onClick={handleStar}
              name={isChannelStarred ? "star" : "star outline"}
              color={isChannelStarred ? "yellow" : "black"}
              className="messages__star"
            />
          )}
        </span>
        <Header.Subheader>{numUniqueUsers}</Header.Subheader>
      </Header>

      {/* Channel Search Input */}
      <Header floated="right">
        <Input
          loading={searchLoading}
          onChange={handleSearchChange}
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
        />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;
