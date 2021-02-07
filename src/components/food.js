import React from 'react';
import { DateTime } from 'luxon';

class Food extends React.Component {
    constructor(props) {
        super(props);
        this.food = props.food;
        this.state = {
            quantity: 2,
            dates: props.dates ? props.dates : [],
        }
        this.getDates = this.getDates.bind(this);
    }

    dateChanged = (e) => {
        const checked = e.currentTarget.checked;

        if(checked) {
            this.props.onChange({productId: this.food.id, productName: this.food.name, quantity: this.state.quantity, startDate: e.currentTarget.value }, false);
        } else {
            this.props.onRemove(this.food.id, e.currentTarget.checked);
        }
       
    }
    quantitySelected = (e) => {
        const quantity = e.target.value;
        this.setState({
            ...this.state,
            quantity: quantity,
        }, () => {
            if(this.state.startDate) {
                this.props.onChange({productId: this.food.id, productName: this.food.name, quantity: quantity, startDate: this.state.date[0] });
            }
        });
    }
    renderDate = (date) => {
        return (<span>{date.toFormat("dd MMM yy")}</span>);
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
            const days = this.getDates(DateTime.fromISO(startDate), DateTime.fromISO(endDate));

            const isSelected = (day) => {
                if (!this.props.selectedItems) return false;
                const selected = this.props.selectedItems.orderLines.filter(n => n.productId === this.food.id);
                return selected.some(n => day.hasSame(DateTime.fromISO(n.startDate), 'day'));
            }

            return (
                <div>
                    <em>Välj önskat datum:</em>
                    <ul className="dateSelect">
                        {days.map(day => {
                            return <li key={day.toISODate()}><input type="checkbox" checked={isSelected(day)} name={"date-"+this.food.name} onChange={this.dateChanged} value={day.toISODate()}></input><label>{this.renderDate(day)}</label></li>
                        })}
                    </ul>
                </div>);
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
                        <div>
                            
                            {this.renderDateSelector()}
                        </div>
                </div>
                
            </div>
        );
    }
}

export default Food;
