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
    componentDidUpdate(prevProps) {
        //uppa statet med propcs
        console.log('FOOD, component did update i food: ')
        console.log(prevProps)
        /* this.setState( prevState => {
            return { ...prevState, dates: this.props.dates ? this.props.dates : [] }
        }); */
	}
    dateChanged = (e) => {
        
        const checked = e.currentTarget.checked;
        const date = DateTime.fromISO(e.currentTarget.value);

        console.log('date', date)

        if(checked) {
            console.log('lägg till')
            
            //dates = this.state.dates.concat(date)
            this.props.onChange({productId: this.food.id, productName: this.food.name, quantity: this.state.quantity, startDate: date.toJSDate() }, false);
            this.setState(prevState => {
                return { ...prevState, dates: [...prevState.dates, date] }
            });
        } else {
            console.log('ta bort')
            this.props.onRemove(this.food.id, date);
            
            this.setState(prevState => {
                return {...prevState, dates: prevState.dates.filter(x => x.hasSame(date, 'day'))}
            })
        }
       /*  const uniqueDates =  dates.filter((value, index, self) => {
            debugger;
            return self.indexOf(value) === index;
          });
          console.log(uniqueDates); */
        /* this.setState(state => {
            const dates = uniqueDates;
            return {
              dates: dates,
            }}, () => {
            this.state.dates.forEach(date => {
                this.props.onChange({productId: this.food.id, productName: this.food.name, quantity: this.state.quantity, startDate: date });
            })
        }); */
       
    }
    quantitySelected = (e) => {
        // kolla så att detta funkar med datumen!
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
  /*   isSelected = (id) => {
        let isSelected = [];
        console.log('isSelected i bookables', this.props.selectedItems)
        if(this.props.selectedItems.orderLines) {
            isSelected = this.props.selectedItems.orderLines.filter(function(n) {
                return n.productId === id;
            }, id);
        }
        return isSelected;
    } */
    renderDateSelector = () => {
        
        if(this.props.lodgingDates && this.props.lodgingDates.length > 0) {
            const startDate = this.props.lodgingDates ? this.props.lodgingDates[0] : "";
            const endDate = this.props.lodgingDates ? this.props.lodgingDates[1] : "";
            
/*             const startDate = this.props.lodgingDates.map(n => {
                return n.dates[0];
            });
            const endDate = this.props.lodgingDates.map(n => {
                return n.dates[0];
            }); */
            //const days = this.getDates(DateTime.fromJSDate(startDate), DateTime.fromJSDate(endDate));
        
            const days = this.getDates(DateTime.fromJSDate(startDate), DateTime.fromJSDate(endDate));

            const isSelected = (day) => {
                if (!this.state.dates) return false;

                return this.state.dates.some(n => day.hasSame(n, 'day'))
            }
            /* const selected = this.isSelected(bookable.id);
            
            //const date = selected.length > 0 ? new Date(selected[0].startDate) : null;
            const dates = selected.map(date => {
                return DateTime.fromISO(date.startDate);
            }); */
            return (
                <ul className="dateSelect mt-2">
                    <li><em>Välj önskat datum:</em></li>
                    {days.map(day => {
                        return <li key={day.toISODate()}><input type="checkbox" checked={isSelected(day)} name={"date-"+this.food.name} onChange={this.dateChanged} value={day.toISODate()}></input><label className="ml-1">{this.renderDate(day)}</label></li>
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
                    {/* <Dateselector key={this.props.date} range="false" dateCallback = {this.dateChanged} date={this.props.date} minDate={new Date(this.food.earliest)} maxDate={new Date(this.food.latest)} /> */}
                </div>
                
            </div>
        );
    }
}

export default Food;
