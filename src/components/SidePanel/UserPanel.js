import React from 'react';
import {Grid, Header, Icon, Dropdown, Image} from 'semantic-ui-react'
import classes from './SidePanel.module.sass';
import firebase from '../../firebase'

class UserPanel extends React.Component {
    state = {
        user: this.props.currentUser
    }

    dropdownOptions = () => [
            {
                key: 'user',
                text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
                disabled: true
            },
            {
                key: 'avatar',
                text: <span>Change Avatar</span>
            },
            {
                key: 'signout',
                text: <span onClick={this.handleSignout}>Sign Out</span>
            }
        ]

    handleSignout = () => {
        console.log(1)
        firebase
            .auth()
            .signOut()
            .then(() => console.log("signed out"))
    }

    render() {

        const {user} = this.state


        return (
            <Grid className={classes.UserPanel}>
                <Grid.Column>
                    <Grid.Row className={classes.UserPanelRow}>
                        <Header inverted floated="left" as="h2">
                            <Icon name="code"/>
                            <Header.Content>DevChat</Header.Content>
                        </Header>
                        <Header style={{padding: "0.25em"}} as="h4" inverted>
                            <Dropdown trigger={
                                <span>
                                    <Image src={user.photoURL} spaced="right" avatar />
                                    {user.displayName}
                                    </span>
                            } options={this.dropdownOptions()} />
                        </Header>
                    </Grid.Row>

                </Grid.Column>
            </Grid>
        )
    }
}

export default UserPanel