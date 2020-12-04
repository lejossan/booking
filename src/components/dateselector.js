import React, { Component } from 'react';
import Calendar from 'react-calendar';
 // https://www.npmjs.com/package/react-calendar

class Dateselector extends Component {
  state = {
    startdate: new Date(),
    enddate: new Date(),
  }
 
  // onChange = date => this.setState({ date })
  onChange = date => {
    this.props.dateCallback(date);
  }
  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          selectRange
          showWeekNumbers
        />
      </div>
    );
  }
}

export default Dateselector;