import { UserPosts, CurrentChannel } from "../../components/Types";
import React from "react";
import {
  Segment,
  Accordion,
  Header,
  Icon,
  Image,
  List,
  AccordionTitleProps,
} from "semantic-ui-react";

type State = {
  channel: CurrentChannel;
  privateChannel: boolean;
  activeIndex: number;
};

type Props = {
  currentChannel: CurrentChannel;
  isPrivateChannel: boolean;
  userPosts: UserPosts;
};

class MetaPanel extends React.PureComponent<Props, State> {
  state = {
    channel: this.props.currentChannel,
    privateChannel: this.props.isPrivateChannel,
    activeIndex: 0,
  };

  setActiveIndex = (
    _: React.MouseEvent<HTMLDivElement>,
    titleProps: AccordionTitleProps
  ) => {
    console.log(titleProps);
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex } as { activeIndex: number });
  };

  formatCount = (num: number) =>
    num > 1 || num === 0 ? `${num} posts` : `${num} post`;

  displayTopPosters = (posts: UserPosts) =>
    Object.entries(posts)
      .sort((a, b) => b[1]["count"] - a[1]["count"])
      .map(([key, val], i) => (
        <List.Item key={i}>
          <Image avatar src={val.avatar} />
          <List.Content>
            <List.Header as="a">{key}</List.Header>
            <List.Description>{this.formatCount(val.count)}</List.Description>
          </List.Content>
        </List.Item>
      ))
      .slice(0, 5);

  render() {
    const { activeIndex, privateChannel, channel } = this.state;
    const { userPosts } = this.props;

    if (privateChannel) return null;

    return (
      <Segment loading={!channel}>
        <Header as="h3" attached="top">
          About # {channel && channel.name}
        </Header>
        <Accordion styled attached="true">
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="info" />
            Channel Details
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            {channel && channel.details}
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="user circle" />
            Top Posters
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <List>{userPosts && this.displayTopPosters(userPosts)}</List>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="pencil alternate" />
            Created By
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <Header as="h3">
              <Image circular src={channel && channel.createdBy?.avatar} />
              {channel && channel.createdBy?.name}
            </Header>
          </Accordion.Content>
        </Accordion>
      </Segment>
    );
  }
}

export default MetaPanel;
