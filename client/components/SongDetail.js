import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import fetchSong from '../queries/fetchSong';

class SongDetail extends Component {
    render () {
        const { song } = this.props.data;
        if (!song) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={this.props.params.id} />
            </div>
        )
    }
    //mutations are run manually (onSubmit, onClick), but queries run automatically

}

export default graphql(fetchSong, {
    options: (props) => { return { variables: { id: props.params.id }}}
})(SongDetail);
//props are passed down into graphql helper and then down into SongDetail