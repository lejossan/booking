import React from 'react';
import Lodging from './lodging.js';
import Camp from './camp.js';
import Food from './food.js';
import Rental from './rental.js';
import i18n from './i18n';
import Tabs from './tabs';
import Carousel from 'react-bootstrap/Carousel'
import { DateTime } from 'luxon';

class Bookables extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookables: [],
            lodgingDates: [],
          }
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.filterBookable = this.filterBookable.bind(this);
    }
    componentDidMount() {
        this.fetchData();
      }
      componentDidUpdate(prevProps) {
        //uppa statet med propcs
        console.log('BOOKABLES, component did update i food: ')
        console.log(prevProps)
        /* this.setState( prevState => {
            return { ...prevState, dates: this.props.dates ? this.props.dates : [] }
        }); */
	}
    handleChange(data, replace) {
        if(data.categories && data.categories.filter(n => n === 'skogsrum' || n === 'lagerplats' || n === 'camping').length > 0) {
            
            /* if(this.lodgingDates) {
                for(let i = 0; i < this.lodgingDates.length; i++) {
                    if(this.lodgingDates[i].name === data.productName) {
                        this.lodgingDates[i] = [{"name": data.productName, "dates": [data.startDate, data.endDate]}]
                    } else {
                        this.lodgingDates.push([{"name": data.productName, "dates": [data.startDate, data.endDate]}]);
                    }
                }
            } else {
                this.lodgingDates.push([{"name": data.productName, "dates": [data.startDate, data.endDate]}]);
            } */
            //this.lodgingDates = [data.startDate, data.endDate];
            this.setState( prevState => {
                return { ...prevState, lodgingDates: [data.startDate, data.endDate]}
            })
        }
        this.props.onBookableChange(data, replace);
    }
    handleRemove(id, date) {
        this.props.onBookableRemove(id, date);
    }
    fetchData() {
        fetch('https://api.test.naturlogi.se/api/products')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState(prevState => {
              return { ...prevState, bookables: data.data }
            });
        });
    }
    filterBookable = (type) => {
        return this.state.bookables.reduce(function(filtered, bookable) {
            if(bookable.categories && bookable.categories.includes(type)) {
                filtered.push(bookable);
            }
            return filtered;
        }, []);
    }
    isSelected = (id) => {
        let isSelected = [];
        if(this.props.selectedItems.orderLines) {
            isSelected = this.props.selectedItems.orderLines.filter(function(n) {
                return n.productId === id;
            }, id);
        }
        return isSelected;
    }
    renderLodging = (type) => {
        const bookables = this.filterBookable(type);
        return(bookables.map((bookable, i) => {
            const selected = this.isSelected(bookable.id);
            const dates = selected.length > 0 ? [new Date(selected[0].startDate), new Date(selected[0].endDate)] : null;
            return (<Lodging key={bookable.id} skogsrum={bookable} onChange={this.handleChange} date={dates}/>);
        }));
    }
    renderCamp = (type) => {
        const bookables = this.filterBookable(type);
        return(bookables.map((bookable, i) => {
            const selected = this.isSelected(bookable.id);
            const dates = selected.length > 0 ? [new Date(selected[0].startDate), new Date(selected[0].endDate)] : null;
            return (<Camp key={bookable.id} camp={bookable} onChange={this.handleChange} date={dates} />);
        }));
    }
    renderFood = (type) => {
        const bookables = this.filterBookable(type);
        return (bookables.map((bookable, i) => {
            
            return (<li key={bookable.id}><Food food={bookable} lodgingDates={this.state.lodgingDates} selectedItems={this.props.selectedItems.orderLines} onRemove={this.handleRemove} onChange={this.handleChange}/></li>);
        }));
    }
    renderFoodCarouselItem = (type) => {
        const bookables = this.filterBookable(type);
        return (bookables.map((bookable, i) => {
            const selected = this.isSelected(bookable.id);
            //const date = selected.length > 0 ? new Date(selected[0].startDate) : null;
            const dates = selected.map(date => {
                return DateTime.fromISO(date.startDate);
            });
            return (<Carousel.Item key={bookable.id}><Food food={bookable} lodgingDates={this.state.lodgingDates} selectedItems={this.props.selectedItems.orderLines} onRemove={this.handleRemove} onChange={this.handleChange}/></Carousel.Item>);
        }));
    }
    renderRentals = (type, range = "true") => {
        const rentals = this.filterBookable(type);
        return (rentals.map((rental, i) => {
            const selected = this.isSelected(rental.id);
            const dates = selected.length > 0 ? [new Date(selected[0].startDate), new Date(selected[0].endDate)] : null;
            return (<li key={rental.id} ><Rental range={range} rental={rental} onChange={this.handleChange} date={dates}/></li>);
        }));
    }

    render() {
        let activeTab = window.location.pathname.split("/boka/")[1];
        activeTab = (activeTab === undefined || activeTab === "") ? "skogsrum" : decodeURIComponent(activeTab);
        console.log('render bookable')
        return (
            <div>
                <Tabs activeTab={activeTab}> 
                    <div label="skogsrum">
                        {/* <p className="mt-1">{i18n.t('introLodging')}</p> */}
                        {this.renderLodging('skogsrum')}
                    </div>
                    <div label="lägerplats">
                        <p className="mt-1">{i18n.t('introLodging')}</p>
                        {this.renderCamp('lagerplats')}
                        <h2>{i18n.t('rentals.title')}</h2>
                        <p>{i18n.t('rentals.intro')}</p>
                        <ul className="rentals">
                            {this.renderRentals('hyra')}
                        </ul>
                    </div> 
                    <div label="naturcamping">
                        {/* <p className="mt-1">{i18n.t('introLodging')}</p> */}
                        {this.renderLodging('camping')}
                    </div> 
                </Tabs> 
                <div className="other">
                    <h2>{i18n.t('food.title')}</h2>
                    <p>{i18n.t('food.intro')}</p>
                    <Carousel interval={20000}>
                        {this.renderFoodCarouselItem('matkorg')}
                    </Carousel>
                    <h3>ENKLARE RÄTTER och SÖTSAKER</h3>
                    <p>Dessa lite enklare rätter funkar både som förrätt, lunch eller efterrätt.</p>
                    <ul className="smaratt">
                        {this.renderFood('smaratt')}
                    </ul>
                    {/* <h2>{i18n.t('rentals.title')}</h2>
                    <p>{i18n.t('rentals.intro')}</p> */}
                    <hr/>
                    <h2>{i18n.t('other.title')}</h2>
                    <ul className="rentals">
                        {this.renderRentals('kanot', false)}
                    </ul>
                </div>
            </div>
        );   
    }
}

export default Bookables;
