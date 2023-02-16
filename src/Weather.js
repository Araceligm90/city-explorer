import React from "react";
import WeatherDay from "./WeatherDay"

class Weather extends React.Component {
  render() {
    return(
    <>
    <h2>Daily Forecast:</h2>
     {this.props.weatherInfo.map((item, idx) =>
     <WeatherDay item={item} key={idx} />
     )}
    </>
    )
  }
}

export default Weather;