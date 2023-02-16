import React from "react";
import Map from "./Map"
import { Button, Container, Form, Modal } from "react-bootstrap";
import axios from "axios";
import "./App.css"
import Weather from "./Weather";
import Movies from "./Movies"


class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayInfo: false,
            showModal: false,
            city: '',
            cityData: {},
            weatherInfo: [],
            moviesInfo: []
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

    displayWeather = async(e) => {

       try {
       let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`

        let response = await axios.get(weatherUrl)
        this.setState({
            weatherInfo: response.data
        })
    }
    catch(error){
        this.setState({
            showModal: true
        })    
      }
    };


    displayMovies = async () => {
        try {
            let moviesUrl = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`;
            let response = await axios.get(moviesUrl)
            this.setState({
                moviesInfo: response.data
            })
        }
        catch (error) {
            this.setState({
                showModal: true
            })
        }
    };


    displaySearch = async(e) => {
        e.preventDefault();
        try {
            let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`
            let response = await axios.get(url)
             console.log(response.data[0]);

             this.displayWeather();
             this.displayMovies();

            
            this.setState({
                displayInfo: true,
                cityData: response.data[0]
            })    
        }
        catch (error) {
            this.setState({
                showModal: true
            })
        }
    };    

    closeModal = () => {
        this.setState({
            showModal: false
        });
    };

    render() {
        console.log(this.state)
        return (
            <main>
                <Container>
                    <Form class='mainForm' onSubmit={this.displaySearch}>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" onInput={this.handleSearchInput}/>
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
                        
                        <div>
                            {this.state.weatherInfo.length > 0 &&
                            <Weather weatherInfo={this.state.weatherInfo}/>
                            }
                        </div>
                        
                        <div>
                            {this.state.moviesInfo.length > 0 &&
                                <Movies moviesInfo={this.state.moviesInfo}/>
                            }
                        </div>
                    </>
                }
                <Modal 
                show={this.state.showModal}
                onHide={this.closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>The information you've entered is not valid. Please try again.</p>
                </Modal.Body>
                </Modal>
            </main>
        )
    }
};


export default Main;
