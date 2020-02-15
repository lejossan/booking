import React from 'react';

function HeaderMobile() {
    return (
        <div id="mobile-vertical-header"
            className="suki-header-mobile-vertical suki-header suki-popup suki-header-mobile-vertical-display-drawer suki-header-mobile-vertical-position-left suki-text-align-left"
            itemType="https://schema.org/WPHeader" itemScope>
            <div className="suki-popup-background suki-popup-close">
                <button className="suki-popup-close-icon suki-popup-close suki-toggle"><span className="suki-icon " title=""><svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
                    <path
                        d="M36.2,32,56,12.2a1.93,1.93,0,0,0,0-2.8L54.6,8a1.93,1.93,0,0,0-2.8,0L32,27.8,12.2,8A1.93,1.93,0,0,0,9.4,8L8,9.4a1.93,1.93,0,0,0,0,2.8L27.8,32,8,51.8a1.93,1.93,0,0,0,0,2.8L9.4,56a1.93,1.93,0,0,0,2.8,0L32,36.2,51.8,56a1.93,1.93,0,0,0,2.8,0L56,54.6a1.93,1.93,0,0,0,0-2.8Z">
                    </path>
                </svg></span></button>
            </div>

            <div className="suki-header-mobile-vertical-bar suki-header-section-vertical suki-popup-content">
                <div className="suki-header-mobile-vertical-bar-inner suki-header-section-vertical-inner">
                    <div className="suki-header-section-vertical-column">
                        <div className="suki-header-mobile-vertical-bar-top suki-header-section-vertical-row">
                            <nav className="suki-header-mobile-menu suki-header-menu site-navigation"
                                itemType="https://schema.org/SiteNavigationElement" itemScope role="navigation"
                                aria-label="Mobile Header Menu">
                                <ul id="menu-main-menu" className="menu suki-toggle-menu">
                                    <li id="menu-item-187" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-187"><a
                                        href="https://naturlogi.se/skogsrum/" className="suki-menu-item-link "><span
                                            className="suki-menu-item-title">Skogsrum</span></a></li>
                                    <li id="menu-item-19" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-19"><a
                                        href="https://naturlogi.se/lagerplats/" className="suki-menu-item-link "><span
                                            className="suki-menu-item-title">Lägerplats</span></a></li>
                                    <li id="menu-item-18" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-18"><a
                                        href="https://naturlogi.se/stallplatser/" className="suki-menu-item-link "><span
                                            className="suki-menu-item-title">Ställplatser</span></a></li>
                                    <li id="menu-item-174"
                                        className="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-172 current_page_item menu-item-174">
                                        <a href="https://naturlogi.se/upplevelser/" aria-current="page" className="suki-menu-item-link "><span
                                            className="suki-menu-item-title">Upplevelser</span></a></li>
                                    <li id="menu-item-196" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-196"><a
                                        href="http://boka.naturlogi.se" className="suki-menu-item-link "><span
                                            className="suki-menu-item-title">Boka</span></a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HeaderMobile;
