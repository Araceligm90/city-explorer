import React from "react";
import Map from "./Map"
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import "./App.css"
import Weather from "./Weather";
import Movies from "./Movies"

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayInfo: false,
            city: '',
            cityData: {},
            moviesData: [],
            weatherData: []
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

        let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`
        let response = await axios.get(url);
        
       this.showWeather();
       this.showMovie()
        
        this.setState({
            displayInfo: true,
            cityData: response.data[0],
        })
    }

showWeather = async () => {
    let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`
    let response2 = await axios.get(weatherUrl);
    this.setState({
        weatherData: response2.data
    })
}

showMovie = async () => {
    let moviesUrl = `${process.env.REACT_APP_SERVER}/movies?searchQuery2=${this.state.city}`;
    let response3 = await axios.get(moviesUrl);
    this.setState({
        moviesData: response3.data
    })
}


    render() {
        return (
            <>
                <Container>
                    <Form className='mainForm' onSubmit={this.displaySearch}>
                        <Form.Group>
                            <Form.Label>Enter City Name</Form.Label>
                            <Form.Control type="text" onInput={this.handleSearchInput} />
                        </Form.Group>
                        <Button onClick={this.displaySearch} className="mainButton">Explore!</Button>
                    </Form>
                </Container>

                {this.state.displayInfo &&
                    <div>
                        <h2>{this.state.cityData.display_name}</h2>
                        <p>Lat: {this.state.cityData.lat}</p> 
                        <p>Lon: {this.state.cityData.lon}</p>
                        <Map lat={this.state.cityData.lat} lon={this.state.cityData.lon} />

                        <div>
                            <Weather weatherData={this.state.weatherData}/>
                        </div>
                        <div>
                            {this.state.moviesData.length > 0 &&
                            <Movies moviesData= {this.state.moviesData}/>
                        }
                        </div>
                    </div>
                }
            </>
        )
    }
}


export default Main; 