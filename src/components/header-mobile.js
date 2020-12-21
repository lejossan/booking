import React, { Component } from 'react';

class HeaderMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
        }
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle() {
        this.setState({showPopup: !this.state.showPopup});
    }
    
    render() {
        const showPopup = this.state.showPopup;
        let popup;
        if(showPopup) {
            popup = (<div className="popup" >
                        <button onClick={this.handleToggle} className="close-icon"><span className="suki-icon " title=""><svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
                            <path
                                d="M36.2,32,56,12.2a1.93,1.93,0,0,0,0-2.8L54.6,8a1.93,1.93,0,0,0-2.8,0L32,27.8,12.2,8A1.93,1.93,0,0,0,9.4,8L8,9.4a1.93,1.93,0,0,0,0,2.8L27.8,32,8,51.8a1.93,1.93,0,0,0,0,2.8L9.4,56a1.93,1.93,0,0,0,2.8,0L32,36.2,51.8,56a1.93,1.93,0,0,0,2.8,0L56,54.6a1.93,1.93,0,0,0,0-2.8Z">
                            </path>
                            </svg></span>
                        </button>

                        <div className="popup-content">
                            <div className="suki-header-mobile-vertical-bar-inner suki-header-section-vertical-inner">
                                <div className="suki-header-section-vertical-column">
                                    <div className="suki-header-mobile-vertical-bar-top suki-header-section-vertical-row">
                                        <nav className="suki-header-mobile-menu suki-header-menu site-navigation"
                                            itemType="https://schema.org/SiteNavigationElement" itemScope role="navigation"
                                            aria-label="Mobile Header Menu">
                                            <ul id="menu-main-menu" className="menu suki-toggle-menu">
                                                <li className="menu-item"><a
                                                    href="https://naturlogi.se/" className="suki-menu-item-link "><span>Hem</span></a></li>
                                                <li className="menu-item"><a
                                                    href="https://naturlogi.se/skogsrum/" className="suki-menu-item-link "><span>Skogsrum</span></a></li>
                                                <li className="menu-item"><a
                                                    href="https://naturlogi.se/lagerplats/" className="suki-menu-item-link "><span>Lägerplats</span></a></li>
                                                <li className="menu-item"><a
                                                    href="https://naturlogi.se/naturcamping/" className="suki-menu-item-link "><span>Naturcamping</span></a></li>
                                                <li className="menu-item">
                                                    <a href="https://naturlogi.se/upplevelser/" aria-current="page" className="suki-menu-item-link "><span>Äta</span></a></li>
                                                <li className="menu-item">
                                                    <a href="https://naturlogi.se/upplevelser/" aria-current="page" className="suki-menu-item-link "><span>Upplevela</span></a></li>
                                                <li className="menu-item">
                                                    <a href="https://naturlogi.se/hallbarhet/" aria-current="page" className="suki-menu-item-link "><span>Hållbarhet</span></a></li>
                                                <li className="menu-item">
                                                    <a href="https://naturlogi.se/information/" aria-current="page" className="suki-menu-item-link "><span>Inför ditt besök</span></a></li>
                                                <li className="menu-item">
                                                    <a href="https://naturlogi.se/kontakt/" aria-current="page" className="suki-menu-item-link "><span>Kontakt</span></a></li>
                                                <li className="menu-item">
                                                    <a href="https://naturlogi.se/om-oss/" aria-current="page" className="suki-menu-item-link "><span>Om Naturlogi</span></a></li>
                                                <li className="menu-item">
                                                    <a href="https://naturlogi.se/boka/" aria-current="page" className="suki-menu-item-link "><span>Boka</span></a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>)
        }
        return (
            <div id="mobile-header" className="">
                <button className="toggle" onClick={this.handleToggle} data-target="mobile-vertical-header" aria-expanded="false">
                    <span className="suki-icon suki-menu-icon" title="" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><path d="M60,35H4a2,2,0,0,1-2-2V31a2,2,0,0,1,2-2H60a2,2,0,0,1,2,2v2A2,2,0,0,1,60,35Zm0-22H4a2,2,0,0,1-2-2V9A2,2,0,0,1,4,7H60a2,2,0,0,1,2,2v2A2,2,0,0,1,60,13Zm0,44H4a2,2,0,0,1-2-2V53a2,2,0,0,1,2-2H60a2,2,0,0,1,2,2v2A2,2,0,0,1,60,57Z"></path></svg></span>		<span className="screen-reader-text">Mobile Menu</span>
                </button>
                {popup}
                
            </div>
        )
    }
}

export default HeaderMobile;


