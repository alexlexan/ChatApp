import React from 'react'
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react'
import classes from './SidePanel.module.sass'
import { connect} from 'react-redux'
import {setCurrentChannel} from '../../actions'

import firebase from "../../firebase";

class Channels extends React.Component {
    state = {
        user: this.props.currentUser,
        channels: [],
        modal: false,
        channelName: '',
        channelDetails: '',
        channelsRef: firebase.database().ref('channels')
    }

    componentDidMount() {
        this.addListeners()
    }

    addListeners = () => {
        let loadedChannels = []
        this.state.channelsRef.on('child_added', snap =>{
            loadedChannels.push(snap.val())
            this.setState({channels: loadedChannels})
        })
    }

    addChannel = () => {
        const {channelsRef, channelName, channelDetails, user} = this.state

        const key = channelsRef.push().key

        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        }

        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({ channelName: '', channelDetails: ''})
                this.closeModal()
                
                console.log('add')
            })
            .catch(err => {
                console.error(err)
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.isFormvalid(this.state)){
            this.addChannel()
        }
    }

    changeChannel = channel => {
        this.props.setCurrentChannel(channel)
    }

    isFormvalid = ({channelName, channelDetails}) => channelName && channelDetails

    closeModal = () => this.setState({modal:false})

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    displayChannels = channels => (
        channels.length > 0 && channels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => this.changeChannel(channel)}
                name={channel.name}
                style={{opacity: 0.7}}
            >
                # {channel.name}
            </Menu.Item>
        ))
    )

    openModal = () => this.setState({modal:true})

    render() {
        const {channels, modal} = this.state

        return (
            <>
            <Menu.Menu style={{paddingBottom: '2em'}}>
                <Menu.Item>
                    <span>
                        <Icon name="exchange"/> CHANNELS
                    </span>
                    &nbsp;({channels.length}) <Icon name="add" className={classes.Icon} onClick={this.openModal}/>
                </Menu.Item>
                {this.displayChannels(channels)}
            </Menu.Menu>

            
            <Modal basic open={modal} onClose={this.closeModal}>
                <Modal.Header>Add a Channel</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Input 
                                fluid
                                label="Name of Channel"
                                name="channelName"
                                onChange={this.handleChange}
                            />
                        </Form.Field>

                        <Form.Field>
                            <Input 
                                fluid
                                label="About the Channel"
                                name="channelDetails"
                                onChange={this.handleChange}
                            />
                        </Form.Field> 
                    </Form>       
                </Modal.Content>

                <Modal.Actions>
                    <Button color="green" inverted onClick={this.handleSubmit}>
                        <Icon name="checkmark"/> Add
                    </Button>
                    <Button color="red" inverted onClick={this.closeModal}>
                        <Icon name="remove"/> Cancel
                    </Button>
                </Modal.Actions>

            </Modal>
            </>
        )
    }
}

export default connect(
    null,
    {setCurrentChannel}
    )(Channels)