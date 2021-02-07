import React, { Component } from 'react';
import Calendar from 'react-calendar';
// https://www.npmjs.com/package/react-calendar
import { DateTime } from 'luxon';
import Toast from '../components/toast';

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
            warningText: "ingen incheck på ej tillgängligt datum",
            showWarning: false,
        }
        this.tileDisabled = this.tileDisabled.bind(this);
        this.onClickDay = this.onClickDay.bind(this);
        this.closeToast = this.closeToast.bind(this);
    }

    onChange = date => {
        if(this.state.range) {
            date = [DateTime.fromJSDate(date[0]).toISODate(), DateTime.fromJSDate(date[1]).toISODate()];
        } else {
            date = DateTime.fromJSDate(date).toISODate();
        }
        this.props.dateCallback(date);
    }
    onClickDay = (value, event) => {
        if(event.currentTarget.classList.contains('disabled')) {
            this.setState(prevState => {
                return { ...prevState, showWarning: true, date: [] }
            });
        }
    }
    tileDisabled = ({ activeStartDate, date, view }) => {
        
        if(date < new Date()) return true;
        if(this.state.disabledDates.length == 0) return false;
        /* return this.state.disabledDates.find(dDate => {
            return DateTime.fromISO(dDate).hasSame(DateTime.fromJSDate(date), 'day');
        }); */
    }
    tileContent = ({ activeStartDate, date, view }) => {
        if(this.state.disabledDates.length == 0) return '';
        if(date < new Date()) return 'disabled';
        const tile = this.state.disabledDates.find(dDate => {
            return DateTime.fromISO(dDate).hasSame(DateTime.fromJSDate(date), 'day');
        });
        if(tile) return 'disabled';
    }
    closeToast() {
        this.setState(prevState => {
            return { ...prevState, showWarning: false }
        });
    }
    render() {
        return (
            <div>
                <Calendar
                    onChange={this.onChange}
                    onClickDay={this.onClickDay}
                    value={this.state.date}
                    selectRange={this.state.range}
                    showWeekNumbers
                    tileDisabled={this.tileDisabled}
                    tileClassName={this.tileContent}
                    minDate={new Date(this.state.minDate)}
                    maxDate={new Date(this.state.maxDate)}
                    showNeighboringMonth={false}
                    /* activeStartDate={this.props.minDate} */
                />
                <Toast show={this.state.showWarning} type="warning" text={this.state.warningText} onClose={this.closeToast} />
            </div>
        );
    }
}

export default Dateselector;