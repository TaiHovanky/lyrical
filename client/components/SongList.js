import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'; //glue between the react app and the graphql data

class SongList extends Component {
    renderSongs () {
        return this.props.data.songs.map(song => {
            return (
                <li key={song.id} className="collection-item">
                {song.title}
                </li>
            );
        });
    }

    render () {
        console.log(this.props);
        if (this.props.data.loading) {
            return <div>Loading</div>
        }
        return <ul className="collection">
            {this.renderSongs()}
        </ul>
    }
}

const query = gql`
    {
        songs {
            id
            title
        }
    }
`; //this only defines the query - it doesn't execute the query!

export default graphql(query)(SongList); //graphql(query) returns a function that is immediately invoked with SongList passed in