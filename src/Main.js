import React from "react";
import Map from "./Map"
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import "./App.css"


class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayInfo: false,
            city: '',
            cityData: {},
        }
    }
    handleSearchInput = (e) => {
        let cityName = e.target.value;
        this.setState({
            city: cityName
        },
        () => console.log(this.state.city)
        )
    }

    displaySearch = async(e) => {
        e.preventDefault();

        let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`)
         console.log(response.data[0]);
        
        this.setState({
            displayInfo: true,
            cityData: response.data[0]
        })

    }
    render() {
        return (
            <>
                <Container>
                    <Form class='mainForm'>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" onInput={this.handleSearchInput} />
                        </Form.Group>
                        <Button onClick={this.displaySearch} className="mainButton">Explore!</Button>
                    </Form>
                </Container>

                {this.state.displayInfo &&
                    <>
                        <h2>{this.state.cityData.display_name}</h2>
                        <p>Lat: {this.state.cityData.lat}</p> 
                        <p>Lon: {this.state.cityData.lon}</p>
                        <Map lat={this.state.cityData.lat} lon={this.state.cityData.lon} />
                    </>
                }
            </>
        )
    }
}


export default Main; 