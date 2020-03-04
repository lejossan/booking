import React from 'react';
// import { withTranslation, Trans } from 'react-i18next';

import Footer from './components/footer.js';
import Header from './components/header.js';
import Skogsrum from './components/skogsrum.js';
import Food from './components/food.js';
import Information from './components/information.js';
import i18n from './components/i18n';
import Moment from 'react-moment';
import './sass/App.scss';
import './sass/general.scss';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lng: 'en',
      skogsrumSelected: []
    }
    this.onLanguageChanged = this.onLanguageChanged.bind(this);
    this.skogsrumBooked = this.skogsrumBooked.bind(this);
  }
  componentDidMount() {
    i18n.on('languageChanged', this.onLanguageChanged)
  }

  componentWillUnmount() {
    i18n.off('languageChanged', this.onLanguageChanged)
  }

  onLanguageChanged(lng) {
    this.setState({
      lng: lng
    })
  }

  skogsrumBooked = (data) => {
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
  renderDate = (date) => {
    const dateToFormat = date.getTime();
    return (<Moment format="DD MMM YYYY" key={dateToFormat}>{dateToFormat}</Moment>);
  }
  render() {
    const skogsrum = [
      {
        id: 123,
        name: 'kolmilan',
        price: '1190',
        image: 'skogsrum',
        url: '/skogsrum/',
        max: 2,
        info: 'För dig som söker det avskilda. En dubbelsäng med utsikt över en gammal kolmila. Egen grillplats och tillgång till dass i närheten. Passar för två personer.'
      },
      {
        id: 234,
        name: 'björkhagen',
        price: '2190',
        image: 'skogsrum',
        max: 4,
        url: 'skogsrum/',
        info: 'För dig som söker det avskilda. En dubbelsäng med utsikt över björkhagen. Egen grillplats och dass inomhus. Passar för upp till fyra personer.'
      }
    ];
    const food = [
      {
        id: 321,
        name: 'traktens delikatesser',
        price: '299',
        image: 'food',
        url: '/food/delikatess',
        info: 'En lyxig matkorg med bara de bästa råvarorna från närområdet. Frossa i bla bla. Till efterrätt har vi stoppat i kolor i olika smaker. Denna matkorg behöver inte tillagas.'
      },
      {
        id: 432,
        name: 'kolarkorgen',
        price: '129',
        image: 'food',
        url: 'food/kolarkorgen',
        info: 'En lyxig matkorg med bara de bästa råvarorna från närområdet. Frossa i bla bla. Till efterrätt har vi stoppat i kolor i olika smaker. Denna matkorg behöver inte tillagas.'
      }
    ];
    
    return (
      <div className="App">
        <Header />
        <div className="suki-wrapper suki-wrapper-text">
          <button className="button mr-1" onClick={() => i18n.changeLanguage('sv')}>sv</button>
          <button className="button" onClick={() => i18n.changeLanguage('en')}>en</button>
          <p className="mt-1">{i18n.t('intro')}</p> 
          <Skogsrum skogsrum={skogsrum[0]} bookingCallback = {this.skogsrumBooked}/>
          <Skogsrum skogsrum={skogsrum[1]} bookingCallback = {this.skogsrumBooked}/>
          <h2>{i18n.t('food.title')}</h2>
          <p>{i18n.t('food.intro')}</p>
          <Food food={food[0]}/>
          <Food food={food[1]}/>
          <Information />

          <h3>Du har valt:</h3>
          <table>
            <thead>
              <tr><th>Namn</th><th>Datum</th><th>Antal</th></tr>
            </thead>
            <tbody>{this.renderSelected()}</tbody>
          </table>
          <hr/>
          <button className="button big green mb-2">KLARNA CHECKOUT</button>
        </div>
        <Footer />
      </div>
    );
  }
}
// export default withTranslation('common')(App);
export default App;

/*{ <Trans i18nKey='welcome.intro'>
            To get started, edit <code>src/App.js</code> and save to reload.
          </Trans> }*/