import React from "react";
import { connect } from "react-redux";
import { setCurrentChannel, setPrivateChannel } from "../../actions";
import { Menu, Icon } from "semantic-ui-react";
import firebase from "../../firebase";
import { CurrentUser, CurrentChannel } from "../../components/Types";

type Props = {
  setCurrentChannel: typeof setCurrentChannel;
  setPrivateChannel: typeof setPrivateChannel;
  currentUser: CurrentUser;
};

type State = {
  user: CurrentUser;
  usersRef: firebase.database.Reference;
  activeChannel: string;
  starredChannels: CurrentChannel[];
};

class Starred extends React.PureComponent<Props, State> {
  state: State = {
    user: this.props.currentUser,
    usersRef: firebase.database().ref("users"),
    activeChannel: "",
    starredChannels: [],
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListeners(this.state.user.uid);
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  removeListener = () => {
    this.state.usersRef.child(`${this.state.user.uid}/starred`).off();
  };

  addListeners = (userId: string) => {
    this.state.usersRef
      .child(userId)
      .child("starred")
      .on("child_added", (snap) => {
        const starredChannel = { id: snap.key, ...snap.val() };
        this.setState({
          starredChannels: [...this.state.starredChannels, starredChannel],
        });
      });

    this.state.usersRef
      .child(userId)
      .child("starred")
      .on("child_removed", (snap) => {
        const channelToRemove = { id: snap.key, ...snap.val() };
        const filteredChannels = this.state.starredChannels.filter(
          (channel) => {
            return channel.id !== channelToRemove.id;
          }
        );
        this.setState({ starredChannels: filteredChannels });
      });
  };

  setActiveChannel = (channel: CurrentChannel) => {
    this.setState({ activeChannel: channel.id });
  };

  changeChannel = (channel: CurrentChannel) => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
  };

  displayChannels = (starredChannels: CurrentChannel[]) =>
    starredChannels.length > 0 &&
    starredChannels.map((channel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));

  render() {
    const { starredChannels } = this.state;

    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="star" /> STARRED
          </span>{" "}
          ({starredChannels.length})
        </Menu.Item>
        {this.displayChannels(starredChannels)}
      </Menu.Menu>
    );
  }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(Starred);
