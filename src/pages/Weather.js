import React from 'react'
import {connect} from 'react-redux'
import {fetchWeather} from '../store/modules/weather'
import Select from 'react-select'

class Users extends React.Component {
  // componentDidMount() {
  //   this.props.fetchWeather()
  // }

  state = {
    selectedCityId: null,
  }

  onSelect = ( {value} ) => {
    // debugger
    this.setState({selectedCityId: value})
    this.props.fetchWeather(value)
  }

  render() {
    const {cities, citiesAreFetching} = this.props
    const {selectedCityId} = this.state
    return (
      <div style={{padding: 30, width: '100%'}}>
        {cities.fetching ? <>Loading...</> :
          <Select
            value={console.log(selectedCityId) || selectedCityId}
            options={cities}
            width={400}
            onChange={this.onSelect}
          />
        }
      </div>
    )
  }
}

export default connect(store => ({
  cities: store.cities.citiesToSelect,
  citiesAreFetching: store.cities.citiesAreFetching,
  selectedCityId: store.weather.selectedCityId,
}), {fetchWeather})(Users)