import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentChannel, setPrivateChannel } from "../../actions";
import { Menu, Icon } from "semantic-ui-react";
import { CurrentUser } from "../../components/Types";

type Props = {
  setCurrentChannel: typeof setCurrentChannel;
  setPrivateChannel: typeof setPrivateChannel;
  currentUser: CurrentUser;
};

type State = {
  activeChannel: string;
  user: CurrentUser;
  users: CurrentUser[];
  usersRef: firebase.database.Reference;
  connectedRef: firebase.database.Reference;
  presenceRef: firebase.database.Reference;
};

class DirectMessages extends React.PureComponent<Props, State> {
  state: State = {
    activeChannel: "",
    user: this.props.currentUser,
    users: [],
    usersRef: firebase.database().ref("users"),
    connectedRef: firebase.database().ref(".info/connected"),
    presenceRef: firebase.database().ref("presence"),
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListeners(this.state.user.uid);
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  removeListeners = () => {
    this.state.usersRef.off();
    this.state.presenceRef.off();
    this.state.connectedRef.off();
  };

  addListeners = (currentUserUid: string) => {
    let loadedUsers: CurrentUser[] = [];
    this.state.usersRef.on("child_added", (snap) => {
      if (currentUserUid !== snap.key) {
        let user = snap.val();
        user["uid"] = snap.key;
        user["status"] = "offline";
        loadedUsers.push(user);
        this.setState({ users: loadedUsers });
      }
    });

    this.state.connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        const ref = this.state.presenceRef.child(currentUserUid);
        ref.set(true);
        ref.onDisconnect().remove((err) => {
          if (err !== null) {
            console.error(err);
          }
        });
      }
    });

    this.state.presenceRef.on("child_added", (snap) => {
      if (currentUserUid !== snap.key) {
        this.addStatusToUser(snap.key as string);
      }
    });

    this.state.presenceRef.on("child_removed", (snap) => {
      if (currentUserUid !== snap.key) {
        this.addStatusToUser(snap.key as string, false);
      }
    });
  };

  addStatusToUser = (userId: string, connected = true) => {
    const updatedUsers = this.state.users.reduce(
      (acc: CurrentUser[], user: CurrentUser) => {
        if (user.uid === userId) {
          user["status"] = `${connected ? "online" : "offline"}`;
        }
        return acc.concat(user);
      },
      []
    );
    this.setState({ users: updatedUsers });
  };

  isUserOnline = (user: CurrentUser) => user.status === "online";

  changeChannel = (user: CurrentUser) => {
    const channelId = this.getChannelId(user.uid);
    const channelData = {
      id: channelId,
      name: user.name!,
    };
    this.props.setCurrentChannel(channelData);
    this.props.setPrivateChannel(true);
    this.setActiveChannel(user.uid);
  };

  getChannelId = (userId: string) => {
    const currentUserId = this.state.user.uid;
    return userId < currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  setActiveChannel = (userId: string) => {
    this.setState({ activeChannel: userId });
  };

  render() {
    const { users, activeChannel } = this.state;

    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="mail" /> DIRECT MESSAGES
          </span>{" "}
          ({users.length})
        </Menu.Item>
        {users.map((user) => (
          <Menu.Item
            key={user.uid}
            active={user.uid === activeChannel}
            onClick={() => this.changeChannel(user)}
            style={{ opacity: 0.7, fontStyle: "italic" }}
          >
            <Icon
              name="circle"
              color={this.isUserOnline(user) ? "green" : "red"}
            />
            @ {user.name}
          </Menu.Item>
        ))}
      </Menu.Menu>
    );
  }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(
  DirectMessages
);
