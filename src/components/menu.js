import React from 'react';

function Menu() {
    return (
        <nav className="suki-header-menu-1 suki-header-menu site-navigation"
            itemType="https://schema.org/SiteNavigationElement" itemScope role="navigation"
            aria-label="Header Menu 1">
            <ul id="menu-main-menu-1" className="menu suki-hover-menu">
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-187"><a
                    href="https://naturlogi.se/skogsrum/" className="suki-menu-item-link "><span
                        className="suki-menu-item-title">Skogsrum</span></a></li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-19"><a
                    href="https://naturlogi.se/lagerplats/" className="suki-menu-item-link "><span
                        className="suki-menu-item-title">Lägerplats</span></a></li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-18"><a
                    href="https://naturlogi.se/stallplatser/" className="suki-menu-item-link "><span
                        className="suki-menu-item-title">Ställplatser</span></a></li>
                <li
                    className="menu-item menu-item-type-post_type menu-item-object-page page_item page-item-172 current_page_item menu-item-174">
                    <a href="https://naturlogi.se/upplevelser/" aria-current="page"
                        className="suki-menu-item-link "><span className="suki-menu-item-title">Upplevelser</span></a></li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-196"><a
                    href="http://boka.naturlogi.se" className="suki-menu-item-link "><span
                        className="suki-menu-item-title">Boka</span></a></li>
            </ul>
        </nav>
    );
}

export default Menu;
