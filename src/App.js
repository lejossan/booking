import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from "react-router-dom";
import { DateTime } from 'luxon';

import Toast from './components/toast';
import ScrollToTop from './components/scrollToTop.js';
import Footer from './components/footer.js';
import Header from './components/header.js';
import Bookables from './components/bookables.js';
import Checkout from './pages/checkout.js';
import Extras from './pages/extras.js';
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
            warningText: '',
            lodgingDates: lodgingDates,
            couponCode: '',
            notes: '',
            showInfo: false,
            showWarning: false,
        }
        this.onLanguageChanged = this.onLanguageChanged.bind(this);
        this.handleBookableChange = this.handleBookableChange.bind(this);
        this.handleBookableRemove = this.handleBookableRemove.bind(this);
        this.handleOtherChange = this.handleOtherChange.bind(this);
        this.closeToast = this.closeToast.bind(this);
    }

    componentDidMount() {
        i18n.on('languageChanged', this.onLanguageChanged);
        i18n.changeLanguage('sv');
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
            this.setState({
                ...this.state,
                "selected": {
                    "orderLines": newState
                }
            }, () => {
                this.updateOrder();
            });
        }
    }

    handleOtherChange(other) {
        this.setState({
            ...this.state,
            ...other
        }, () => {
            this.updateOrder();
        });
    }
    handleBookableChange(data, replace = true) {
        let newState = [];
        if(replace) {
            newState = (this.state.selected && 'orderLines' in this.state.selected) ? this.state.selected.orderLines : [data];
            newState = [...newState.filter(n => n.productId && (n.productId !== data.productId)), data];
        } else {
            newState = [...this.state.selected.orderLines, data];
        }
        newState = [...newState.filter(n => n.productId)];
        const startDates = newState.map( orderLine => { return orderLine.startDate ? DateTime.fromISO(orderLine.startDate) : null });
        const startDate = startDates.reduce((prevDate, date) => {
            return prevDate < date ? prevDate : date;
        });
        
        const endDates = newState.map( orderLine => { return orderLine.endDate ? DateTime.fromISO(orderLine.endDate) : null });
        const endDate = endDates.reduce((prevDate, date) => {
            return prevDate > date ? prevDate : date;
        });
        let diff = {};
        if(startDate && endDate) {
            diff = endDate ? endDate.diff(startDate, ["days"]) : {};
        }
        if(diff.values && diff.values.days > 14) {
            this.setState(prevState => {
                return { ...prevState, warningText: i18n.t('toast.warning.range'), showWarning: true }
            });
            return;
        } else {
            this.setState({
                ...this.state,
                "selected": {
                    "orderLines": newState
                }
            }, () => {
                this.updateOrder();
            });
        }
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
        if("orderLines" in data && data.orderLines.length > 0) {
            const startDates = data.orderLines.map( orderLine => { return orderLine.startDate ? DateTime.fromISO(orderLine.startDate) : null });
            const startDate = startDates.reduce((prevDate, date) => {
                return prevDate < date ? prevDate : date;
            });
            
            const endDates = data.orderLines.map( orderLine => { return orderLine.endDate ? DateTime.fromISO(orderLine.endDate) : null });
            const endDate = endDates.reduce((prevDate, date) => {
                return prevDate > date ? prevDate : date;
            });
            lodgingDates = [startDate, endDate == null ? startDate : endDate];
        }
        this.setState(prevState => {
            return { ...prevState, lodgingDates: lodgingDates }
        });
        localStorage.setItem('lodgingDates', JSON.stringify(lodgingDates));
    }
    updateOrder() {
        let data = {
            "id": this.selected ? this.selected.id : null,
            "couponCode": this.state.couponCode,
            "notes": this.state.notes,
            "products": (this.state.selected && 'orderLines' in this.state.selected) ? this.state.selected.orderLines : []
        };
        //strip product list from copuon codes
        data.products = [...data.products.filter(n => n.productId)];
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
                        return { ...prevState, selected: data, couponCode: data.couponCode, notes: data.notes, showInfo: true }
                    });
                    localStorage.setItem('selectedItems', JSON.stringify(data));
                    this.setLodgingDates(data);
                } else {
                    console.warn(data)
                    if(data.errors) {
                        this.setState(prevState => {
                            return { ...prevState, warningText: i18n.t('toast.warning.general'), showWarning: true }
                        });
                    } else {
                        this.setState(prevState => {
                            return { ...prevState, warningText: data, showWarning: true }
                        });
                    }
                }
            });
    }
    closeToast() {
        this.setState(prevState => {
            return { ...prevState, showInfo: false, showWarning: false }
        });
    }
    render() {
        return (
            <Router className="App">
                <ScrollToTop />

                <Header />
                <div className="suki-wrapper suki-wrapper-text">
                    {/* <button className={`lng button mr-1 mt-1 ${(this.state.lng === 'sv') ? 'active' : ''}` } onClick={() => i18n.changeLanguage('sv')}>sv</button>
          <button className={`lng button mt-1 ${this.state.lng === 'en' ? 'active' : ''}` } onClick={() => i18n.changeLanguage('en')}>en</button> */}

                    <Switch>
                        <Route exact path="/">
                            <h3>BOKA DIN VISTELSE</h3>
                            <p className="mt-1">{i18n.t('intro')}</p>
                            <Bookables selectedItems={this.state.selected} lodgingDates={this.state.lodgingDates} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange} />
                            <Selected key={Math.floor(Math.random() * 9999)} selectedItems={this.state.selected} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange}></Selected>
                        </Route>
                        <Route path="/extras" render={(props) => (
                            <Extras {...props} selectedItems={this.state.selected} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange} onOtherChange={this.handleOtherChange} />
                        )} />
                        <Route path="/checkout" render={(props) => (
                            <Checkout {...props} selectedItems={this.state.selected} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange} />
                        )} />
                        <Route path="/confirmation">
                            <Confirmation />
                        </Route>
                    </Switch>
                </div>

                <Route exact path="/">
                    <Link className="link suki-wrapper suki-wrapper-text button" to={{ pathname: "/extras", state: this.state.selected }} >Gå vidare</Link>
                    <Toast show={this.state.showInfo} type="info" text={i18n.t('toast.down')} onClose={this.closeToast} />
                    <Toast show={this.state.showWarning} type="warning" text={this.state.warningText} onClose={this.closeToast} />
                </Route>
                <Footer />
            </Router>
        );
    }
}

export default App;
