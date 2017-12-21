import React, {Component} from 'react';

export default ({ children }) => {
    return <div className="container">{children}</div>
}; //SongList (one of the child components) will be passed to the App component