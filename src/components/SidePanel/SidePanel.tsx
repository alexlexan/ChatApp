import React from "react";
import { Menu } from "semantic-ui-react";

import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
import Starred from "./Starred";
import { CurrentUser } from "../../components/Types";

type Props = {
  currentUser: CurrentUser;
  primaryColor: string;
};

const SidePanel: React.FC<Props> = ({ currentUser, primaryColor }) => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: primaryColor, fontSize: "1.2rem" }}
    >
      <UserPanel primaryColor={primaryColor} currentUser={currentUser} />
      <Starred currentUser={currentUser} />
      <Channels currentUser={currentUser} />
      <DirectMessages currentUser={currentUser} />
    </Menu>
  );
};

export default SidePanel;
