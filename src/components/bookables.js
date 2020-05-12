import React from 'react';
import Dateselector from './dateselector.js';
import Skogsrum from './skogsrum.js';
import Food from './food.js';
import Gadget from './gadget.js';
import i18n from './i18n';

class Bookables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookables: []
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
        fetch('http://findus:7000/api/bookable')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState(prevState => {
              return { bookables: data }
            });
        });
    }
    filterBookable = (type) => {
        return this.state.bookables.reduce(function(filtered, bookable) {
            if(bookable.type === type) {
                filtered.push(bookable);
            }
            return filtered;
        }, []);
    }
    renderSkogsrum = (type) => {
        const bookables = this.filterBookable(type);
        return(bookables.map((bookable, i) => {
            return (<Skogsrum key={bookable.uuid} skogsrum={bookable} onChange={this.handleChange}/>);
        }));
    }
    renderFood = (type) => {
        const bookables = this.filterBookable(type);
        return(bookables.map((bookable, i) => {
            return (<Food key={i} food={bookable} onChange={this.handleChange}/>);
        }));
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
              description: 'För dig som söker det avskilda. En dubbelsäng med utsikt över en gammal kolmila. Egen grillplats och tillgång till dass i närheten. Passar för två personer.'
            },
            {
              id: 234,
              name: 'björkhagen',
              price: '2190',
              image: 'skogsrum',
              max: 4,
              url: 'skogsrum/',
              description: 'För dig som söker det avskilda. En dubbelsäng med utsikt över björkhagen. Egen grillplats och dass inomhus. Passar för upp till fyra personer.'
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
            <div>
                {this.renderSkogsrum('house')}
                <h2>{i18n.t('food.title')}</h2>
                <p>{i18n.t('food.intro')}</p>
                {this.renderFood('tent')}
            </div>
        );   
    }
}

export default Bookables;
