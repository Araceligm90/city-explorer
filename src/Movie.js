import React from "react";

class Movie extends React.Component {
    render () {
        return (
            
            <div>
            <h3>{this.props.title}</h3>
            <img src={this.props.poster_path} alt={this.props.title} />
            <p>{this.props.overview}</p>
            <p>Release Date: {this.props.released_on}</p>
            <p>Average votes: {this.props.average_votes} Total votes: {this.props.total_votes}</p>
            <p>Rating: {this.props.popularity}</p>
            </div>
            
        )
    }
};

export default Movie