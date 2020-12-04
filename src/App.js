import React from 'react';
import Footer from './components/footer.js';
import Header from './components/header.js';
import Bookables from './components/bookables.js';
import Information from './components/information.js';
import i18n from './components/i18n';
import Moment from 'react-moment';
import './sass/App.scss';
import './sass/general.scss';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lng: 'sv',
       skogsrumSelected: [],
    }
    this.onLanguageChanged = this.onLanguageChanged.bind(this);
    this.handleBookableChange = this.handleBookableChange.bind(this);
  }
  componentDidMount() {
    i18n.on('languageChanged', this.onLanguageChanged);
  }
  componentWillUnmount() {
    i18n.off('languageChanged', this.onLanguageChanged)
  }
  onLanguageChanged(lng) {
    this.setState({
      lng: lng
    })
  }
  handleBookableChange(data) {
    // skicka även till klaza
    this.setState(prevState => {
      return { skogsrumSelected: [ ...prevState.skogsrumSelected.filter(n => n.id !== data.id), data ] }
    });
  }
  renderSelected = () => {
    return (this.state.skogsrumSelected.map((skogsrum) => {
      const dates = Object.keys(skogsrum.data.date).length > 1 ? skogsrum.data.date.map((date) => {
        return this.renderDate(date);
      }) : 'Välj datum!';
      return (
        <tr key={skogsrum.id}>
          <td>{skogsrum.name}</td>
          <td className="dates">{dates}</td>
          <td>{skogsrum.data.quantity}</td>
        </tr>); 
    }));
  }

  renderCheckout = () => {
      // maybe get this from Klas???
      const htmlSnippet = "<div id=\"klarna-checkout-container\" style=\"overflow-x: hidden;\">\n  <div id=\"klarna-unsupported-page\">\n  <style type=\"text/css\">\n  @-webkit-keyframes klarnaFadeIn{from{opacity:0}to{opacity:1}}@-moz-keyframes klarnaFadeIn{from{opacity:0}to{opacity:1}}@keyframes klarnaFadeIn{from{opacity:0}to{opacity:1}}#klarna-unsupported-page{opacity:0;opacity:1\\9;-webkit-animation:klarnaFadeIn ease-in 1;-moz-animation:klarnaFadeIn ease-in 1;animation:klarnaFadeIn ease-in 1;-webkit-animation-fill-mode:forwards;-moz-animation-fill-mode:forwards;animation-fill-mode:forwards;-webkit-animation-duration:.1s;-moz-animation-duration:.1s;animation-duration:.1s;-webkit-animation-delay:5s;-moz-animation-delay:5s;animation-delay:5s;text-align:center;padding-top:64px}#klarna-unsupported-page .heading{font-family:Source Sans Pro,Helvetica,Arial,sans-serif;line-height:48px;font-weight:200;color:#303030;font-size:42px;margin:24px 0}#klarna-unsupported-page .subheading{font-family:Source Sans Pro,Helvetica,Arial,sans-serif;line-height:28px;font-weight:400;color:rgba(0,0,0,.7);font-size:19px;max-width:560px;margin:10px auto}#klarna-unsupported-page .subheading a{text-decoration:none;background-color:transparent;border:0;color:rgba(0,0,0,.7);font-weight:600}\n  </style>\n  <h1 class=\"heading\">Oops.</h1>\n    <p class=\"subheading\">It looks like an important part of the checkout experience failed to load and we are unable to offer you a way to pay right now.</p>\n    <p class=\"subheading\">Please refresh the page to try again. If this isn't the first time you've seen this message then there may be a more permanent error and you should contact customer service at Klarna.com.</p>\n  </div>\n  <script type=\"text/javascript\">\n  /* <![CDATA[ */\n  (function(w,k,i,d,n,c,l){\n    w[k]=w[k]||function(){(w[k].q=w[k].q||[]).push(arguments)};\n    l=w[k].config={\n      container:w.document.getElementById(i),\n      ORDER_URL:'https://js.playground.klarna.com/eu/kco/checkout/orders/0a267b78-18e2-656b-b3e6-e7ef33d1772d',\n      AUTH_HEADER:'KlarnaCheckout y61k1vlofknka5lc0ipo',\n      LOCALE:'en-GB',\n      ORDER_STATUS:'checkout_incomplete',\n      MERCHANT_TAC_URI:'https://www.example.com/terms.html',\n      MERCHANT_NAME:'Your business name',\n      HASHED_MERCHANT_ID:'f09220c0a774cf8364ee05ed557c3be9',\n      GUI_OPTIONS:[],\n      ALLOW_SEPARATE_SHIPPING_ADDRESS:false,\n      PURCHASE_COUNTRY:'gbr',\n      PURCHASE_CURRENCY:'GBP',\n      TESTDRIVE:true,\n      CHECKOUT_DOMAIN:'https://checkout-eu.playground.klarna.com',\n      BOOTSTRAP_SRC:'https://js.playground.klarna.com/kcoc/200427-96ae120/checkout.bootstrap.js',\n      DEVICE_RECOGNITION_URL:'https://js.playground.klarna.com/eu/kco/checkout/orders/0a267b78-18e2-656b-b3e6-e7ef33d1772d/device_recognition',\n      DEVICE_RECOGNITION_TYPE1:true,\n      DEVICE_RECOGNITION_TYPE3_ORG_ID:'87rxrdob',\n      DEVICE_RECOGNITION_TYPE3_REF:'KLRNA_87rxrdob_0a267b78-18e2-656b-b3e6-e7ef33d1772d',\n      CLIENT_EVENT_HOST:'https://eu.playground.klarnaevt.com',\n      LIQUORICE_ENABLED:false,\n      CONDENSED_ENABLED:false\n    };\n    n=d.createElement('script');\n    c=d.getElementById(i);\n    n.async=!0;\n    n.src=l.BOOTSTRAP_SRC;\n    c.appendChild(n);\n    try{\n      ((w.Image && (new w.Image))||(d.createElement && d.createElement('img'))||{}).src =\n        l.CLIENT_EVENT_HOST + '/v1/checkout/snippet/load' +\n        '?sid=' + l.ORDER_URL.split('/').slice(-1) +\n        '&order_status=' + w.encodeURIComponent(l.ORDER_STATUS) +\n        '&timestamp=' + (new Date).getTime();\n    }catch(e){}\n  })(this,'_klarnaCheckout','klarna-checkout-container',document);\n  /* ]]> */\n  </script>\n  <noscript>\nPlease <a href=\"http://enable-javascript.com\">enable JavaScript</a>.\n  </noscript>\n</div>";
      var checkoutContainer = document.getElementById('my-checkout-container')
      checkoutContainer.innerHTML = htmlSnippet
      var scriptsTags = checkoutContainer.getElementsByTagName('script')
      // This is necessary otherwise the scripts tags are not going to be evaluated
      for (var i = 0; i < scriptsTags.length; i++) {
          var parentNode = scriptsTags[i].parentNode
          var newScriptTag = document.createElement('script')
          newScriptTag.type = 'text/javascript'
          newScriptTag.text = scriptsTags[i].text
          parentNode.removeChild(scriptsTags[i])
          parentNode.appendChild(newScriptTag)
      }
    
  }
  renderDate = (date) => {
    const dateToFormat = date.getTime();
    return (<Moment format="DD MMM YYYY" key={dateToFormat}>{dateToFormat}</Moment>);
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div className="suki-wrapper suki-wrapper-text">
          <button className="button mr-1 mt-1" onClick={() => i18n.changeLanguage('sv')}>sv</button>
          <button className="button mt-1" onClick={() => i18n.changeLanguage('en')}>en</button>
          <p className="mt-1">{i18n.t('intro')}</p> 

          <Bookables onBookableChange = {this.handleBookableChange} />
          <Information />

          <h3>Du har valt:</h3>
          <table>
            <thead>
              <tr><th>Namn</th><th>Datum</th><th>Antal</th></tr>
            </thead>
           <tbody>{this.renderSelected()}</tbody>
          </table>
          <hr/>
          <div id="my-checkout-container"></div>
          
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
