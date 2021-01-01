import React from 'react';
import Lodging from './lodging.js';
import Camp from './camp.js';
import Food from './food.js';
import Rental from './rental.js';
import i18n from './i18n';
import Tabs from './tabs';
import Carousel from 'react-bootstrap/Carousel'

class Bookables extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookables: [],
          }
        this.handleChange = this.handleChange.bind(this);
        this.filterBookable = this.filterBookable.bind(this);
    }
    componentDidMount() {
        this.fetchData();
      }
    handleChange(data) {
        this.props.onBookableChange(data);
    }
    fetchData() {
        fetch('https://api.test.naturlogi.se/api/products')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState(prevState => {
              return { bookables: data.data }
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
    renderLodging = (type) => {
        const bookables = this.filterBookable(type);
        return(bookables.map((bookable, i) => {
            return (<Lodging key={bookable.id} skogsrum={bookable} onChange={this.handleChange}/>);
        }));
    }
    renderCamp = (type) => {
        const bookables = this.filterBookable(type);
        return(bookables.map((bookable, i) => {
            return (<Camp key={bookable.id} camp={bookable} onChange={this.handleChange}/>);
        }));
    }
    renderFood = (type) => {
        const bookables = this.filterBookable(type);
        return (bookables.map((bookable, i) => {
            return (<Carousel.Item key={bookable.id}><Food food={bookable} onChange={this.handleChange}/></Carousel.Item>);
        }));
    }
    renderRentals = (type) => {
        const rentals = this.filterBookable(type);
        return (rentals.map((rental, i) => {
            return (<li key={rental.id} ><Rental rental={rental} onChange={this.handleChange} /></li>);
        }));
    }

    render() {

        let activeTab = window.location.pathname.split("/boka/")[1];
        activeTab = (activeTab != "") ? decodeURIComponent(activeTab) : "skogsrum";
        
        return (
            <div>
                <Tabs activeTab={activeTab}> 
                    <div label="skogsrum">
                        {/* <p className="mt-1">{i18n.t('introLodging')}</p> */}
                        {this.renderLodging('skogsrum')}
                    </div>
                    <div label="lägerplats">
                        {/* <p className="mt-1">{i18n.t('introLodging')}</p> */}
                        {this.renderCamp('lagerplats')}
                        <h2>{i18n.t('rentals.title')}</h2>
                        <p>{i18n.t('rentals.intro')}</p>
                        <ul className="rentals">
                            {this.renderRentals('hyra')}
                        </ul>
                    </div> 
                    <div label="glamping">
                        <p className="mt-1">{i18n.t('introLodging')}</p>
                        {this.renderLodging('glamping')}
                    </div> 
                </Tabs> 
                <div className="other">
                    <h2>{i18n.t('food.title')}</h2>
                    <p>{i18n.t('food.intro')}</p>
                    <Carousel interval={20000}>
                        {this.renderFood('matkorg')}
                    </Carousel>
                    {/* <h2>{i18n.t('rentals.title')}</h2>
                    <p>{i18n.t('rentals.intro')}</p> */}
                    <hr/>
                    <h2>{i18n.t('other.title')}</h2>
                    <ul className="rentals">
                        {this.renderRentals('kanot')}
                    </ul>
                </div>
            </div>
        );   
    }
}

export default Bookables;
