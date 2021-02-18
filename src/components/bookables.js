import React from 'react';
import Skogsrum from './skogsrum.js';
import Camp from './camp.js';
import Food from './food.js';
import Rental from './rental.js';
import i18n from './i18n';
import Tabs from './tabs';
import Carousel from 'react-bootstrap/Carousel'
import { DateTime } from 'luxon';

const apiBase = process.env.API_BASE;

class Bookables extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookables: [],
            expanded: "",
            toggleText: "Se alla smårätter >",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.filterBookable = this.filterBookable.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }

    handleChange(data, replace) {
        this.props.onBookableChange(data, replace);
    }
    handleRemove(id, date) {
        this.props.onBookableRemove(id, date);
    }
    fetchData() {
        fetch(apiBase + 'products')
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
        if(this.props.selectedItems && 'orderLines' in this.props.selectedItems) {
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
            return (<Skogsrum key={bookable.id} skogsrum={bookable} onChange={this.handleChange} date={dates}/>);
        }));
    }
    renderCamp = (type) => {
        const bookables = this.filterBookable(type);
        return(bookables.map((bookable, i) => {
            const selected = this.isSelected(bookable.id);
            const quantity = selected.length > 0 ? selected[0].quantity : 2;
            const dates = selected.length > 0 ? [new Date(selected[0].startDate), new Date(selected[0].endDate)] : null;
            return (<Camp key={bookable.id} camp={bookable} onChange={this.handleChange} quantity={quantity} date={dates} />);
        }));
    }
    renderFood = (type) => {
        const bookables = this.filterBookable(type);
        return (bookables.map((bookable, i) => {
            return (<li key={bookable.id}><Food food={bookable} lodgingDates={this.props.lodgingDates} selectedItems={this.props.selectedItems} onRemove={this.handleRemove} onChange={this.handleChange}/></li>);
        }));
    }
    renderFoodCarouselItem = (type) => {
        const bookables = this.filterBookable(type);
        return (bookables.map((bookable, i) => {
            const selected = this.isSelected(bookable.id);
            const dates = selected.map(date => {
                return DateTime.fromISO(date.startDate);
            });
            return (<Carousel.Item key={bookable.id}><Food food={bookable} lodgingDates={this.props.lodgingDates} selectedItems={this.props.selectedItems} onRemove={this.handleRemove} onChange={this.handleChange}/></Carousel.Item>);
        }));
    }
    renderRentals = (type, range = "true", night = "true") => {
        const rentals = this.filterBookable(type);
        return (rentals.map((rental, i) => {
            let selected = this.isSelected(rental.id);
            const quantity = selected.length > 0 ? selected[0].quantity : 2;
            const dates = selected.length > 0 ? [new Date(selected[0].startDate), new Date(selected[0].endDate)] : null;
            return (<li key={rental.id} ><Rental rental={rental} onChange={this.handleChange} quantity={quantity} date={dates}/></li>);
        }));
    }

    expandSmaratt = (e) => {
        this.setState(prevState => {
            return { 
                ...prevState, 
                expanded: (this.state.expanded === "expanded") ? "" : "expanded",
                toggleText: (this.state.expanded === "expanded") ? "Se alla smårätter >" : "Göm alla smårätter >",
            }
        });
    }
    render() {
        let activeTab = window.location.pathname.split("/boka/")[1];
        activeTab = (activeTab === undefined || activeTab === "") ? "skogsrum" : decodeURIComponent(activeTab);
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
                    {/* <h2>{i18n.t('food.title')}</h2>
                    <p>{i18n.t('food.intro')}</p>
                    <h3>MIDDAGAR</h3>
                    <p>Våra middagar är lokalproducerade och ansvarsfullt komponerade. Allt är förberett för dig att tillaga själv över öppen eld. </p>
                    <Carousel interval={20000}>
                        {this.renderFoodCarouselItem('matkorg')}
                    </Carousel>
                    <h3>ENKLARE RÄTTER och SÖTSAKER</h3>
                    <p>Dessa lite enklare rätter funkar både som förrätt, lunch eller efterrätt.</p>
                    <span className="mobile button" onClick={this.expandSmaratt}>{this.state.toggleText}</span>
                    <ul className={"smaratt " + this.state.expanded}>
                        {this.renderFood('smaratt')}
                        <span className="mobile button" onClick={this.expandSmaratt}>{this.state.toggleText}</span>
                    </ul> */}
                    {/* <h2>{i18n.t('rentals.title')}</h2>
                    <p>{i18n.t('rentals.intro')}</p> */}
                    <hr/>

                </div>
            </div>
        );   
    }
}

export default Bookables;
