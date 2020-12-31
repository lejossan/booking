import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from "react-router-dom";
import moment from 'moment';

import ScrollToTop from './components/scrollToTop.js';
import Footer from './components/footer.js';
import Header from './components/header.js';
import Bookables from './components/bookables.js';
import Checkout from './pages/checkout.js';
import Confirmation from './pages/confirmation.js';
import Selected from './components/selected.js';
import i18n from './components/i18n';

import './sass/App.scss';
import './sass/general.scss';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lng: 'sv',
            selected: [],
            priceTotal: 0,
            error: '',
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

    handleBookableRemove(e) {
        console.log("remove")
    }
    handleBookableChange(data) {

        let newState = (this.state.selected.orderLines) ? this.state.selected.orderLines : [data];
        newState = [...newState.filter(n => n.productId !== data.productId), data];

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
            body: data
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.id) {
                    this.setState(prevState => {
                        return { selected: data }
                    });
                } else {
                    console.warn(data)
                    this.setState(prevState => {
                        return { error: data.title }
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
                        <Route exact path="/">
                            <p className="mt-1">{i18n.t('intro')}</p>
                            <Bookables onBookableChange={this.handleBookableChange} />
                            <Selected selectedItems={this.state.selected} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange}></Selected>
                        </Route>
                        <Route path="/checkout">
                            <Checkout />
                        </Route>
                        <Route path="/confirmation">
                            <Confirmation />
                        </Route>
                    </Switch>

                </div>

                <Route exact path="/">
                    <Link id="tocheckout" className="suki-wrapper suki-wrapper-text button" to={{ pathname: "/checkout", state: this.state.selected }} >Gå till checkout</Link>
                </Route>
                <div className="warning">{this.state.error}</div>
                <Footer />
            </Router>
        );
    }
}

export default App;
