import React from 'react';
import {
    BrowserRouter as Router, // eslint-disable-line
    Link,
    withRouter
  } from 'react-router-dom';
import Selected from '../components/selected.js';
import i18n from '../components/i18n';
import Toast from '../components/toast';
import Canoe from '../components/canoe.js';
import Food from '../components/food.js';
import Rental from '../components/rental.js';

const apiBase = process.env.API_BASE;

class Extras extends React.Component {

    constructor(props) {
        let bookingData = localStorage.getItem('bookingData');
        bookingData = bookingData ? JSON.parse(bookingData) : {};

        super(props);
        this.state = {
            bookables: [],
            selected: this.props.selectedItems ? this.props.selectedItems.orderLines : [],
            discount: bookingData && bookingData.couponCode ? bookingData.couponCode : "",
            discountMessage: "",
            notes: bookingData ? bookingData.notes : "",
            valid: "notvalid",
            approved: false,
            showWarning: false,
        }
        this.klarnaHtmlSnippet = React.createRef();
        this.handleDiscountChange = this.handleDiscountChange.bind(this);
        this.verifyDiscount = this.verifyDiscount.bind(this);
        this.approvedChange = this.approvedChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.fetchData();
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

    handleChange(data, replace) {
        this.props.onBookableChange(data, replace);
    }

    handleRemove(id, date) {
        this.props.onBookableRemove(id, date);
    }

    closeToast() {
        this.setState(prevState => {
            return { ...prevState, showInfo: false, showWarning: false }
        });
    }

    handleDiscountChange(event) {
        event.persist();
        this.setState(prevState => {
            return { ...prevState, discount: event.target.value }
        });
    }

    verifyDiscount() {
        let data = {
            "notes": this.state.notes,
            "couponCode": this.state.discount,
        }
        this.props.onOtherChange(data);
        localStorage.setItem('bookingData', JSON.stringify(data));
    }
    handleTextAreaChange = (event) => {
        event.persist();
        this.setState(prevState => {
            return { ...prevState, notes: event.target.value }
        });
        let data = {
            "notes": event.target.value,
            "couponCode": this.state.discount,
        }
        this.props.onOtherChange(data);
        localStorage.setItem('bookingData', JSON.stringify(data));
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
    renderCanoe = (type) => {
        const rentals = this.filterBookable(type);
        return (rentals.map((rental, i) => {
            const selected = this.isSelected(rental.id);
            const dates = selected.length > 0 ? [new Date(selected[0].startDate), new Date(selected[0].endDate)] : null;
            return (<li key={rental.id} ><Canoe rental={rental} onChange={this.handleChange} date={dates}/></li>);
        }));
    }
    approvedChange = () => {
        this.setState(prevState => {
            return { approved: prevState.approved === false }
        });
    }
    renderFood = (type) => {
        const rentals = this.filterBookable(type);
        return (rentals.map((bookable, i) => {
            return (<li key={bookable.id}><Food food={bookable} lodgingDates={this.props.lodgingDates} selectedItems={this.props.selectedItems} onRemove={this.handleRemove} onChange={this.handleChange}/></li>);
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
    filterBookable = (type) => {
        return this.state.bookables.reduce(function(filtered, bookable) {
            if(bookable.categories && bookable.categories.includes(type)) {
                filtered.push(bookable);
            }
            return filtered;
        }, []);
    }
    renderCheckoutLink = () => {
        if(this.state.approved) {
            return (<Link className="link suki-wrapper suki-wrapper-text button" to={{ pathname: "/checkout", state: this.props.selectedItems }} >{i18n.t('checkout.tocheckout')}</Link>);
        } else {
            return (<span>{i18n.t('checkout.approve')}</span>);
        }
    }

    showDiscountMessage = () => {
        let isValid, message = "";
        if(this.props.selectedItems && this.props.selectedItems.orderLines && this.props.selectedItems.couponCode != "" ) {
            const hasDiscount = this.props.selectedItems.orderLines.filter(n => n.type === "Discount");

            isValid = hasDiscount.length > 0 ? "valid" : "";
            message = hasDiscount.length > 0 ? hasDiscount[0].text : "Rabattkoden är inte giltig.";
        }
        return (<span className={isValid}>{message}</span>);
    }
    render() {
        return (
            <div className="checkout">
                <Link to={{ pathname: "/", state: this.state}} className="button" >Tillbaka</Link>
                <h3>Steg 2 av 3</h3>
                <h2>Tillval</h2>
                <ul className="canoe">
                    {this.renderCanoe('tillval')}
                </ul>
                
                <div className="extraInfo">
                    <label htmlFor="other">Övrig info</label>
                    <textarea name="other" type="text" value={this.state.notes} onChange={this.handleTextAreaChange} placeholder="Ange eventuella matpreferenser eller andra önskemål när det gäller din bokning."/>

                    <label htmlFor="discount">Rabattkod/Presentkort</label>
                    <input name="discount" type="text" value={this.state.discount} onChange={this.handleDiscountChange}/>
                    <div>
                        {this.showDiscountMessage()}
                        <button className="verifyDiscount button" onClick={this.verifyDiscount} >Aktivera</button>
                    </div>
                </div>
                <Selected selectedItems={this.props.selectedItems} onBookableRemove={this.handleRemove} readOnly={false} onBookableChange={this.handleChange}></Selected>
                <div className="approve">
                    <input type="checkbox" checked={this.state.approved} onChange={this.approvedChange}></input>
                    <label>Godkänn <a href="https://naturlogi.se/bokningsvillkor/" target="_blank" alt="bokningsvillkoren">bokningsvillkoren</a></label>
                </div>
                {this.renderCheckoutLink()}
                
                {/* <div id="klarnaHtmlSnippet" ref={this.klarnaHtmlSnippet}>{i18n.t('checkout.approve')}</div> */}
                <Toast show={this.state.showWarning} type="warning" text={this.state.warningText} onClose={this.closeToast} />
            </div>
        );
    }
}

export default withRouter(Extras);
