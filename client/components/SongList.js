import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'; //glue between the react app and the graphql data
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
    onSongDelete (id) {
        this.props.mutate({ variables: { id }})
            .then(() => this.props.data.refetch())
            //refetch query automatically calls any queries associated w/ songlist component
            //in this case, the fetchSongs query
    }

    renderSongs () {
        return this.props.data.songs.map(({ id, title }) => {
            return (
                <li key={id} className="collection-item">
                    <Link to={`/songs/${id}`}>
                    {title}
                    </Link>
                    <i
                        className="material-icons"
                        onClick={() => {
                            this.onSongDelete(id)
                        }}
                    >delete</i>
                </li>
            );
        });
    }

    render () {
        console.log(this.props);
        if (this.props.data.loading) {
            return <div>Loading</div>
        }
        return (
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link
                    to="/songs/new"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID) {
       deleteSong(id: $id) {
         id
       }
    }
`;

export default graphql(mutation)(
    graphql(query)(SongList) //graphql(query) returns a function that is immediately invoked with SongList passed in
);