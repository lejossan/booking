import React from 'react';
// import { withTranslation, Trans } from 'react-i18next';

import Footer from './components/footer.js';
import Header from './components/header.js';
import Skogsrum from './components/skogsrum.js';
import Food from './components/food.js';
import Information from './components/information.js';
import i18n from './components/i18n';
import './sass/App.scss';
import './sass/general.scss';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lng: 'en'
    }
    this.onLanguageChanged = this.onLanguageChanged.bind(this);
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
  
  render() {
    const skogsrum = [
      {
        name: 'kolmilan',
        price: '1190',
        image: 'skogsrum',
        url: '/skogsrum/kolmilan',
        max: 2,
        info: 'För dig som söker det avskilda. En dubbelsäng med utsikt över en gammal kolmila. Egen grillplats och tillgång till dass i närheten. Passar för två personer.'
      },
      {
        name: 'björkhagen',
        price: '2190',
        image: 'skogsrum',
        max: 4,
        url: 'skogsrum/bjorkhagen',
        info: 'För dig som söker det avskilda. En dubbelsäng med utsikt över björkhagen. Egen grillplats och dass inomhus. Passar för upp till fyra personer.'
      }
    ];
    const food = [
      {
        name: 'traktens delikatesser',
        price: '299',
        image: 'food',
        url: '/food/delikatess',
        info: 'En lyxig matkorg med bara de bästa råvarorna från närområdet. Frossa i bla bla. Till efterrätt har vi stoppat i kolor i olika smaker. Denna matkorg behöver inte tillagas.'
      },
      {
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
          <button onClick={() => i18n.changeLanguage('sv')}>sv</button>
          <button onClick={() => i18n.changeLanguage('en')}>en</button>
          <p className="mt-1">{i18n.t('intro')}</p> 
          <Skogsrum skogsrum={skogsrum[0]}/>
          <Skogsrum skogsrum={skogsrum[1]}/>
          <h2>{i18n.t('food.title')}</h2>
          <p>{i18n.t('food.intro')}</p>
          <Food food={food[0]}/>
          <Food food={food[1]}/>
          <Information />

          <h3>Du har valt:</h3>
          <ul>
            <li>Kolmilan</li>
          </ul>
          <a className="button big green right" href="">NÄSTA</a>
        </div>
        <Footer />
      </div>
    );
  }
}
// export default withTranslation('common')(App);
export default App;

{/* <Trans i18nKey='welcome.intro'>
            To get started, edit <code>src/App.js</code> and save to reload.
          </Trans> */}