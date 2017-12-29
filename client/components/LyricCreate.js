import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
    constructor (props) {
        super(props);

        this.state = {
            content: ''
        }
    }

    onSubmit (event) {
        console.log('submitting', this.props)
        event.preventDefault();
        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
                //can't use this.props.params because React Router only passes down props
                //to the highest component that the route is linked to.
                //instead, pass songId down as props into LyricCreate
            }
        }).then(() => this.setState({ content: '' }))
    }

    render () {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input
                    value={this.state.content}
                    onChange={event => this.setState({ content: event.target.value })}
                />
            </form>
        );
    }
}

const mutation = gql`
    mutation AddLyricToSong ($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
            }
        }
    }
`;

export default graphql(mutation)(LyricCreate);