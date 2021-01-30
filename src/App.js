import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from "react-router-dom";
import moment from 'moment';
import { DateTime } from 'luxon';

import ScrollToTop from './components/scrollToTop.js';
import Footer from './components/footer.js';
import Header from './components/header.js';
import Bookables from './components/bookables.js';
import Checkout from './pages/checkout.js';
import Confirmation from './pages/confirmation.js';
import Selected from './components/selected.js';
import i18n from './components/i18n';

const apiBase = process.env.API_BASE;

class App extends React.Component {
    constructor(props) {
        super(props)
        let selectedItems = localStorage.getItem('selectedItems');
        selectedItems = selectedItems ? JSON.parse(selectedItems) : {};
        
        let lodgingDates = localStorage.getItem('lodgingDates');
        lodgingDates = lodgingDates ? JSON.parse(lodgingDates) : [];

        this.state = {
            lng: 'sv',
            selected: selectedItems,
            priceTotal: 0,
            error: '',
            showInfo: 'hidden',
            lodgingDates: lodgingDates,
        }
        this.onLanguageChanged = this.onLanguageChanged.bind(this);
        this.handleBookableChange = this.handleBookableChange.bind(this);
        this.handleBookableRemove = this.handleBookableRemove.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        i18n.on('languageChanged', this.onLanguageChanged);
        i18n.changeLanguage('sv');
        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll() {
        this.setState(prevState => {
            return {...prevState, showInfo: 'hidden' }
        });
    }
    componentWillUnmount() {
        i18n.off('languageChanged', this.onLanguageChanged)
    }

    onLanguageChanged(lng) {
        this.setState({
            lng: lng
        });
    }
    handleBookableRemove(id, date = null) {
        let newState;
        if(this.state.selected) {
            newState = this.state.selected.orderLines;
            let index = [];
            if(date) {
                index = newState.findIndex(n => {
                    return n.productId === id && DateTime.fromISO(n.startDate).hasSame(DateTime.fromISO(date), 'day');
                });
            } else {
                index = newState.findIndex(n => n.productId === id);
            }
            if(index >= 0) {
                newState.splice(index, 1);
            }
        }
        let formattedProduct = newState.map((selected, i) => {
            const startDate = selected.startDate ? moment(selected.startDate).format("YYYY-MM-DD") : '';
            const endDate = selected.endDate ? moment(selected.endDate).format("YYYY-MM-DD") : '';
            return ({ "id": selected.productId, "quantity": selected.quantity, "startDate": startDate, "endDate": endDate })
        });
        this.updateOrder(formattedProduct);
    }
    handleBookableChange(data, replace = true) {
        let newState = [];
        if(replace) {
            newState = (this.state.selected && 'orderLines' in this.state.selected) ? this.state.selected.orderLines : [data];
            newState = [...newState.filter(n => n.productId !== data.productId), data];
        } else {
            newState = [...this.state.selected.orderLines, data];
        }

        let formattedProduct = newState.map((selected, i) => {
            const startDate = selected.startDate ? moment(selected.startDate).format("YYYY-MM-DD") : '';
            const endDate = selected.endDate ? moment(selected.endDate).format("YYYY-MM-DD") : '';
            return ({ "id": selected.productId, "quantity": selected.quantity, "startDate": startDate, "endDate": endDate })
        });
        this.updateOrder(formattedProduct);
        this.setState(prevState => {
            return { ...prevState, showInfo: "visible" }
        });
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
    setLodgingDates = (data) => {
        let lodgingDates = [];
        
        if("orderLines" in data) {
            const startDates = data.orderLines.map( orderLine => { return orderLine.startDate ? DateTime.fromISO(orderLine.startDate) : null });
            const startDate = startDates.reduce((prevDate, date) => {
                return prevDate < date ? prevDate : date;
            });
            
            const endDates = data.orderLines.map( orderLine => { return orderLine.endDate ? DateTime.fromISO(orderLine.endDate) : null });
            const endDate = endDates.reduce((prevDate, date) => {
                return prevDate > date ? prevDate : date;
            });
            lodgingDates = [startDate, endDate];
        }
        this.setState(prevState => {
            return { ...prevState, lodgingDates: lodgingDates }
        });
        localStorage.setItem('lodgingDates', JSON.stringify(lodgingDates))
    }
    updateOrder(products) {
        let data = {
            "products": products
        };
        
        data = JSON.stringify(data);
        fetch(apiBase + 'order/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
			body: data,
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.id) {
                    this.setState(prevState => {
                        return { ...prevState, selected: data }
                    });
                    localStorage.setItem('selectedItems', JSON.stringify(data));
                    this.setLodgingDates(data);
                } else {
                    console.warn(data)
                    this.setState(prevState => {
                        return { ...prevState, error: data }
                    });
                }
            });
    }

    render() {
        return (
            <Router className="App">
                
                <Header />
                <div className="suki-wrapper suki-wrapper-text">
                    {/* <button className={`lng button mr-1 mt-1 ${(this.state.lng === 'sv') ? 'active' : ''}` } onClick={() => i18n.changeLanguage('sv')}>sv</button>
          <button className={`lng button mt-1 ${this.state.lng === 'en' ? 'active' : ''}` } onClick={() => i18n.changeLanguage('en')}>en</button> */}

                    <Switch>
                        <Route exact path="/">
                            <h3>BOKA DIN VISTELSE</h3>
                            <p className="mt-1">{i18n.t('intro')}</p>
                            <Bookables selectedItems={this.state.selected} lodgingDates={this.state.lodgingDates} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange} />
                            <Selected selectedItems={this.state.selected} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange}></Selected>
                        </Route>
                        <Route path="/checkout" render={(props) => (
                            <Checkout {...props} selectedItems={this.state.selected} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange} />
                        )} />
                        <Route path="/confirmation">
                            <Confirmation />
                        </Route>
                    </Switch>
                </div>

                <Route exact path="/">
                    <Link id="tocheckout" className="suki-wrapper suki-wrapper-text button" to={{ pathname: "/checkout", state: this.state.selected }} >Gå till checkout</Link>
                    <div className="warning">{this.state.error}</div>
                    <div className={"info " + this.state.showInfo}><a href="#selected"><span>Gå ner för att se din bokning och gå till kassan</span> <span className="arrow-down"></span></a></div>
                </Route>
                <Footer />
            </Router>
        );
    }
}

export default App;
