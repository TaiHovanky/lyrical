import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
    onLike (id, likes) {
        console.log('id', id);
        this.props.mutate({
            variables: {id},
            optimisticResponse: {
                _typename: 'Mutation',
                likeLyric: {
                    id: id,
                    _typename:'LyricType',
                    likes: likes + 1
                }
            } //guess the optimistic response from backend
            //this updates the UI before a response is received
            //after the optimistic update, if actual data from server is different, UI will reflect actual data
        });
    }

    renderLyrics() {
        return this.props.lyrics.map(({ id, content, likes }) => {
            console.log('ids',)
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="vote-box">
                        <i 
                            onClick={() => this.onLike(id, likes)}
                            className="material-icons"
                        >thumb_up</i>
                        {likes}
                    </div>
                </li>
            );
        });
    }

    render () {
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        );
    }
}

const mutation = gql`
    mutation LikeLyric($id: ID) {
        likeLyric(id: $id) {
            id
            likes
        }
    }
`;

export default graphql(mutation)(LyricList);