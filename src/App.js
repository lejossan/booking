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

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lng: 'sv',
            selected: {},
            priceTotal: 0,
            error: '',
            lodgingDates: [],
        }
        this.onLanguageChanged = this.onLanguageChanged.bind(this);
        this.handleBookableChange = this.handleBookableChange.bind(this);
        this.handleBookableRemove = this.handleBookableRemove.bind(this);
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
        })
    }

    handleBookableRemove(id, date = null) {
        let newState;

        if(this.state.selected.orderLines) {
            newState = this.state.selected.orderLines;
            let index = [];
            if(date) {
                index = newState.findIndex(n => {
                    return n.productId === id && DateTime.fromISO(n.startDate).hasSame(date, 'day');
                });
            } else {
                index = newState.findIndex(n => n.productId === id);
            }
            
            newState.splice(index, 1);
        }
        /* this.setState(prevState => ({
            ...prevState,
            selected: {
                orderLines: newState
            }
        })); */
        let formattedProduct = newState.map((selected, i) => {
            const startDate = selected.startDate ? moment(selected.startDate).format("YYYY-MM-DD") : '';
            const endDate = selected.endDate ? moment(selected.endDate).format("YYYY-MM-DD") : '';
            return ({ "id": selected.productId, "quantity": selected.quantity, "startDate": startDate, "endDate": endDate })
        });
        this.updateOrder(formattedProduct);
    }
    handleBookableChange(data, replace = true) {
        
        
        //newState = [...newState.filter(n => n.productId !== data.productId), data];
        
        let newState = [];
        if(replace) {
            newState = (this.state.selected.orderLines) ? this.state.selected.orderLines : [data];
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
    }
    updateOrder(products) {
        let data = {
            "products": products
        };
        
        data = JSON.stringify(data);
        fetch('https://api.test.naturlogi.se/api/order/validate', {
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
                } else {
                    console.warn(data)
                    this.setState(prevState => {
                        return { ...prevState, error: data.title }
                    });
                }
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
                        <Route path="/boka">
                            <h3>BOKA DIN VISTELSE</h3>
                            <p className="mt-1">{i18n.t('intro')}</p>
                            <Bookables selectedItems={this.state.selected} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange} />
                            <Selected selectedItems={this.state.selected} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange}></Selected>
                        </Route>
                        {/* <Route path={"/boka" | "/checkout"}>
                            <Selected selectedItems={this.state.selected} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange}></Selected>
                        </Route> */}
                        <Route path="/checkout">
                            <Checkout selectedItems={this.state.selected} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange} />
                        </Route>
                        <Route path="/confirmation">
                            <Confirmation />
                        </Route>
                    </Switch>

                </div>

                <Route path="/boka">
                    <Link id="tocheckout" className="suki-wrapper suki-wrapper-text button" to={{ pathname: "/checkout", state: this.state.selected, lodgingDates: this.state.lodgingDates }} >Gå till checkout</Link>
                </Route>
                <div className="warning">{this.state.error}</div>
                <Footer />
            </Router>
        );
    }
}

export default App;
