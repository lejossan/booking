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
            warningText: "ingen incheckning tillgänglig för detta datum",
            showWarning: false,
        }
        this.tileDisabled = this.tileDisabled.bind(this);
        this.onClickDay = this.onClickDay.bind(this);
        this.closeToast = this.closeToast.bind(this);
    }

    onChange = (date, event) => {
        if(this.state.range) { 
            
            const startDate = DateTime.fromJSDate(date[0]);
            const endDate = DateTime.fromJSDate(date[1]);
            if(startDate.hasSame(endDate, 'day')) {
                this.setState(prevState => {
                    return { ...prevState, showWarning: true, warningText: "Du måste välja olika dagar för in- och utcheckning." }
                });
                return;
            } else {
                date = [startDate.toISODate(), endDate.toISODate()];
            }
        } else {
            date = DateTime.fromJSDate(date).toISODate();
        }
        this.props.dateCallback(date);
        
    }
    onClickDay = (value, event) => {
        
        if(event.currentTarget.classList.contains('disabled')) {
            this.setState(prevState => {
                return { ...prevState, showWarning: true, date: null }
            });
            //this.props.dateCallback([null,null]);
        }
    }
    tileDisabled = ({ activeStartDate, date, view }) => {
        if(date <= new Date()) return true;
        if(!this.state.range) {
            
            const tile = this.state.disabledDates.find(dDate => {
                return DateTime.fromISO(dDate.date).hasSame(DateTime.fromJSDate(date), 'day');
            });
            if(tile) return true;
        }
    }
    tileClass = ({ activeStartDate, date, view }) => {
        if(this.state.range) {
            const tile = this.state.disabledDates.find(dDate => {
                return DateTime.fromISO(dDate.date).hasSame(DateTime.fromJSDate(date), 'day');
            });
            if(tile && tile.canCheckOut) {
                return 'disabled cancheckout';
            } else if (tile) {
                return 'disabled';
            }
        }
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
                    tileClassName={this.tileClass}
                    minDate={this.state.minDate}
                    maxDate={this.state.maxDate}
                    showNeighboringMonth={false}
                    maxDetail="month"
                    minDetail="month"
                    /* activeStartDate={new Date(this.props.minDate)} */
                />
                <Toast show={this.state.showWarning} type="warning" text={this.state.warningText} onClose={this.closeToast} />
            </div>
        );
    }
}

export default Dateselector;