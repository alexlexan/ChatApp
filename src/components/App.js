import React from "react";
import {Grid} from 'semantic-ui-react'
import clasess from './App.module.sass'
import ColorPanel from "./ColorPanel.js/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import { connect } from 'react-redux'


const App = (props) => {
  console.log('App',props);
  return (
    <Grid columns="equal" className={clasess.App}>
      <ColorPanel />
      <SidePanel currentUser={props.currentUser} />
  
      <Grid.Column className={clasess.AppColumn}>
        <Messages />
      </Grid.Column>
  
      <Grid.Column width={4}>
      <MetaPanel />
      </Grid.Column>
    </Grid>
  )
}




const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App);
