import React from "react";
import DailyWeather from "./DailyWeather"

class Weather extends React.Component {
  render() {
    return(
    <>
    <h3>Weather Forecast</h3>
    {this.props.weatherData.map((day, idx) =>
    <DailyWeather key={idx}
    date={day.date}
    description={day.description}
    /> 
    )}
    </>)
  }
}

export default Weather;