import React from 'react';
import { DateTime } from 'luxon';

class Food extends React.Component {
    constructor(props) {
        super(props);
        this.food = props.food;
        this.state = {
            quantity: 2, 
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.handleChange(e);
    }
    dateSelected = (e) => {
        const date = new Date(e.currentTarget.value);
        const quantity = this.state.quantity > 0 ? this.state.quantity : 1;
        this.setState({
            ...this.state,
            startDate: date,
            endDate: date,
            quantity: quantity,
        }, () => {
            this.props.onChange({productId: this.food.id, productName: this.food.name, quantity: this.state.quantity, startDate: date, endDate: date });
        });
    }
    quantitySelected = (e) => {
        const quantity = e.target.value;
        this.setState({
            ...this.state,
            quantity: quantity,
        }, () => {
            if(this.state.startDate) {
                this.props.onChange({productId: this.food.id, productName: this.food.name, quantity: quantity, startDate: this.state.startDate, endDate: this.state.endDate });
            }
        });
    }
    renderDate = (date) => {
        return (<span>{date.toFormat("dd MMM yy")}</span>);
        //return (<Moment format="DD MMM YYYY" key={Math.floor(Math.random() * 10)}>{date}</Moment>);
    }

    getDates = (startDate, endDate) => {
        const result = [];

        let date = startDate;
        while(!date.hasSame(endDate.plus({days: 1}), "day")) {
            result.push(date);
            date = date.plus({days: 1});
        }

        return result;
    }

    renderDateSelector = () => {
        if(this.props.lodgingDates && this.props.lodgingDates.length > 0) {
        const startDate = this.props.lodgingDates ? this.props.lodgingDates[0] : "";
        const endDate = this.props.lodgingDates ? this.props.lodgingDates[1] : "";
        const days = this.getDates(DateTime.fromJSDate(startDate), DateTime.fromJSDate(endDate));
        return (
            <ul className="dateSelect mt-2">
                <li><em>Välj önskat datum:</em></li>
                {days.map(day => {
                    return <li key={day.toISODate()}><input type="radio" name={"date-"+this.food.name} onChange={this.dateSelected} value={day.toString()}></input><label className="ml-1">{this.renderDate(day)}</label></li>
                })}
            </ul>);
        } else {
           return (<em className="mt-2">Välj datum för boende först för att kunna välja datum för mat.</em>);
        }
    }
    render() {
        return (
            <div className="food">
                <h3 className="mt-1">{this.food.name}</h3>
                <img className="image" alt="foodbasket" src={this.food.imgUrl} />
                <div className="wrapper">
                        <p>{this.food.description}</p>
                        <div className="number-wrapper">
                            <input ref={(quantity) => { this.quantity = quantity }} onChange={(evt) => this.quantitySelected(evt)} type="number" min="1" className="mr-1 numberbox" defaultValue="2"/><span>ANTAL PERSONER</span>
                            <span className="price_big">{Math.ceil(this.food.priceFirstNight)}:- /pers</span>
                        </div>
                        {this.renderDateSelector()}
                    {/* <Dateselector key={this.props.date} range="false" dateCallback = {this.dateSelected} date={this.props.date} minDate={new Date(this.food.earliest)} maxDate={new Date(this.food.latest)} /> */}
                </div>
                
            </div>
        );
    }
}

export default Food;
