import React from "react";
import { Container } from "react-bootstrap";

class Map extends React.Component {
  render() {
      return (
          <Container>
              <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.props.lat},${this.props.lon}&zoom=13&format=json`} />
          </Container>
      )
  }
}


export default Map;