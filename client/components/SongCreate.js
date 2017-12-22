import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }

    onSubmit (event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{
                query
            }] // re-run query to fetch songs so that we see the song list with the new song added
        }).then(() => {
            hashHistory.push('/')
        });
    }

    render () {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a new song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title:</label>
                    <input 
                        onChange={
                            event => this.setState({ title: event.target.value })
                        }
                        value={this.state.title}
                    />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String){
        addSong(title: $title) {
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);