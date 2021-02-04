import React, { Component } from 'react';
import Calendar from 'react-calendar';
// https://www.npmjs.com/package/react-calendar
import { DateTime } from 'luxon';

class Dateselector extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            date: this.props.date,
            startdate: new Date(),
            minDate: props.minDate,
            maxDate: props.maxDate,
            disabledDates: props.unavailableDates ? props.unavailableDates : [],
            calendarType: "utc",
            range: props.range === true,
        }
    }

    onChange = date => {
        if(this.state.range) {
            date = [DateTime.fromJSDate(date[0]).toISODate(), DateTime.fromJSDate(date[1]).toISODate()];
        } else {
            date = DateTime.fromJSDate(date).toISODate();
        }
        this.props.dateCallback(date);
    }

    tileDisabled = ({ activeStartDate, date, view }) => {
        if(this.state.disabledDates.length == 0) return false;
        return this.state.disabledDates.find(dDate => {
            return DateTime.fromISO(dDate).hasSame(DateTime.fromJSDate(date), 'day');
        });
    }

    render() {
        return (
            <div>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    selectRange={this.state.range}
                    showWeekNumbers
                    tileDisabled={this.tileDisabled}
                    minDate={new Date(this.state.minDate)}
                    maxDate={new Date(this.state.maxDate)}
                    showNeighboringMonth={false}
                    //activeStartDate={new Date(2021, 4, 1)}
                />
            </div>
        );
    }
}

export default Dateselector;