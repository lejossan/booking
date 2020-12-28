import React, { Component } from 'react';
import Calendar from 'react-calendar';
 // https://www.npmjs.com/package/react-calendar
 import moment from 'moment';

class Dateselector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startdate: new Date(),
      minDate: props.minDate,
      maxDate: props.maxDate,
      disabledDates: [new Date(2021,4,10), new Date(2021,4,17)],
    }
  }

  onChange = date => {
    this.props.dateCallback(date);
  }

  tileDisabled =({ date }) => {
    return this.state.disabledDates.find(dDate => moment(dDate).isSame(date, 'day'));
  }

  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          selectRange
          showWeekNumbers
          allowPartialRange
          tileDisabled={this.tileDisabled}
          minDate={new Date(this.state.minDate)}
          maxDate={new Date(this.state.maxDate)}
          activeStartDate={new Date(2021,4,1)}
        />
      </div>
    );
  }
}

export default Dateselector;