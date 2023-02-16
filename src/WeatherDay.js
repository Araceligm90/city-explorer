import React from "react";

class WeatherDay extends React.Component {
    render() {
        return (
            <>
            {this.props.item.date}
            {this.props.item.description}
            </>
        )
    }
}

export default WeatherDay