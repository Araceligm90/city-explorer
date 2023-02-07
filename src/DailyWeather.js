import React from "react";
import { Container } from "react-bootstrap";

class DailyWeather extends React.Component {
    render() {
        return (
            <Container>
                <div>
                    <p>{this.props.day.date}</p>
                    <p>{this.props.day.description}</p>
                </div>
            </Container>
        )
    }
}

export default DailyWeather;