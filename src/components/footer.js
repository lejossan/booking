import React from 'react';

function Footer() {
    return (
        <footer id="colophon" className="site-footer suki-footer" role="contentinfo" itemType="https://schema.org/WPFooter" itemScope>
            <div id="suki-footer-widgets-bar" className="suki-footer-widgets-bar suki-footer-section suki-section suki-section-default suki-widget-title-alignment-left suki-widget-title-decoration-border-bottom suki-footer-widgets-bar-with-bottom-bar">
                <div className="suki-footer-widgets-bar-inner suki-section-inner">
                    <div className="suki-wrapper">
                        <div className="suki-footer-widgets-bar-row suki-footer-widgets-bar-columns-3">
                            <div className="suki-footer-widgets-bar-column-1 suki-footer-widgets-bar-column">
                                <aside id="weglot-translate-5" className="widget widget_weglot-translate">
                                    <h2 className="widget-title">Välj språk</h2>
                                    <aside data-wg-notranslate className="country-selector weglot-dropdown weglot-widget">
                                    <input id="wg15816666195e46513b8d89e770" className="weglot_choice" type="checkbox" name="menu" />
                                        <label
                                            htmlFor="wg15816666195e46513b8d89e770"
                                            className="wgcurrent wg-li weglot-lang weglot-language weglot-flags flag-0 sv"
                                            data-code-language="sv">
                                            <span>Svenska</span>
                                        </label>
                                        <ul>
                                            <li className="wg-li weglot-lang weglot-language weglot-flags flag-0 en" data-code-language="en">
                                                <a data-wg-notranslate href="https://naturlogi.se/en/treats/">English</a>
                                            </li>
                                        </ul>
                                    </aside>
                                </aside>
                            </div>
                            <div className="suki-footer-widgets-bar-column-2 suki-footer-widgets-bar-column">
                                <aside id="search-4" className="widget widget_search">
                                    <h2 className="widget-title">Letar du efter något?</h2>
                                    <form role="search" method="get" className="search-form" action="https://naturlogi.se/">
                                        <label>
                                            <span className="screen-reader-text">Search for:</span>
                                            <input type="search" className="search-field" placeholder="Search…" name="s" />
                                        </label>
                                        <input type="submit" className="search-submit" value="Search" />
                                        <span className="suki-icon suki-search-icon" title=""><svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 64 64" width="64" height="64">
                                            <path
                                                d="M26,46.1a20,20,0,1,1,20-20A20,20,0,0,1,26,46.1ZM63.4,58.5,48.2,43.3a3.67,3.67,0,0,0-2-.8A26.7,26.7,0,0,0,52,26a26,26,0,1,0-9.6,20.2,4.64,4.64,0,0,0,.8,2L58.4,63.4a1.93,1.93,0,0,0,2.8,0l2.1-2.1A1.86,1.86,0,0,0,63.4,58.5Z">
                                            </path>
                                        </svg></span>
                                    </form>
                                </aside>
                            </div>
                            <div className="suki-footer-widgets-bar-column-3 suki-footer-widgets-bar-column">
                                <aside id="nav_menu-5" className="widget widget_nav_menu">
                                    <h2 className="widget-title">Mer info</h2>
                                    <div className="menu-footer-menu-container">
                                        <ul id="menu-footer-menu" className="menu">
                                            <li id="menu-item-29" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29">
                                                <a href="https://naturlogi.se/kontakt/" className="suki-menu-item-link ">
                                                    <span className="suki-menu-item-title">Kontakt</span>
                                                </a>
                                            </li>
                                            <li id="menu-item-112" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-112">
                                                <a href="https://naturlogi.se/om-oss/" className="suki-menu-item-link ">
                                                    <span className="suki-menu-item-title">Om Naturlogi</span>
                                                </a>
                                            </li>
                                            <li id="menu-item-114" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-114">
                                                <a href="https://verklighetensgard.se" className="suki-menu-item-link ">
                                                    <span className="suki-menu-item-title">Verklighetens Gård</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
