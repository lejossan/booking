import React from 'react';

function Menu() {
    return (
        <nav
            itemType="https://schema.org/SiteNavigationElement" itemScope role="navigation"
            aria-label="Header Menu">
            <ul id="menu-main-menu-1" className="menu">
                <li className="menu-item menu-item-type-custom">
                    <a href="https://boka.test.naturlogi.se/" className="suki-menu-item-link ">
                        <span className="suki-menu-item-title">BOKA</span>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="https://naturlogi.se/skogsrum/" className="suki-menu-item-link ">
                        <span className="suki-menu-item-title">Skogsrum</span>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="https://naturlogi.se/lagerplats/" className="suki-menu-item-link ">
                        <span className="suki-menu-item-title">Lägerplats</span>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="https://naturlogi.se/naturcamping/" className="suki-menu-item-link ">
                        <span className="suki-menu-item-title">Naturcamping</span>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="https://naturlogi.se/mat/" className="suki-menu-item-link ">
                        <span className="suki-menu-item-title">Äta</span>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="https://naturlogi.se/upplevelser/" aria-current="page" className="suki-menu-item-link ">
                        <span className="suki-menu-item-title">Uppleva</span>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="https://naturlogi.se/hallbarhet/" aria-current="page" className="suki-menu-item-link ">
                        <span className="suki-menu-item-title">Hållbarhet</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;
