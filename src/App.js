import React, { useEffect } from 'react';
import './sass/App.scss';
import Footer from './components/footer.js';
import Header from './components/header.js';
import Skogsrum from './components/skogsrum.js';
import './sass/general.scss';


function App() {
  const skogsrum = [
    {
      name: 'kolmilan',
      price: '1190',
      image: 'skogsrum',
      url: '/skogsrum/kolmilan',
      info: 'För dig som söker det avskilda. En dubbelsäng med utsikt över en gammal kolmila. Egen grillplats och tillgång till dass i närheten. Passar för två personer.'
    },
    {
      name: 'björkhagen',
      price: '2190',
      image: 'skogsrum',
      url: 'skogsrum/bjorkhagen',
      info: 'För dig som söker det avskilda. En dubbelsäng med utsikt över björkhagen. Egen grillplats och dass inomhus. Passar för upp till fyra personer.'
    }
  ];

  
  // test för att få in js för mobilmenyn men är nog bättre o lättare att skriva själv
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://naturlogi.se/wp-content/themes/suki/assets/js/main.min.js";
    script.async = true;
    document.body.appendChild(script);
});
  return (
    <div className="App">
      <Header />
      <div className="suki-wrapper suki-wrapper-text">
        <p className="mt-1">Här kan du boka din Naturlogi, välj först vilket boende du önskar och sedan kan du välja till de olika matpaketen. Du bokar boende genom att välja datum och skriva in antal personer.</p> 
        <Skogsrum skogsrum={skogsrum[0]}/>
        <Skogsrum skogsrum={skogsrum[1]}/>
        <h2>MATPAKET</h2>
        <p>För din vistelse finns en rad olika alternativ när det gäller mat. Vill du få allt färdigt eller vill du laga din egen mat över öppen eld. Här kan du köpa till det som passar dig.</p>

        <h2>ÖVRIG INFO</h2>
        <label for="name">Name</label>
        <input name="name"/>

        <label for="name">Emailadress</label>
        <input name="name"/>

        <label for="name">Övrig info</label>
        <input name="name"/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
