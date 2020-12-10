import React from 'react';

function Footer() {
    return (
        <footer id="colophon" class="site-footer suki-footer" role="contentinfo" itemtype="https://schema.org/WPFooter" itemscope>
			<div id="suki-footer-widgets-bar" class="suki-footer-widgets-bar suki-footer-section suki-section suki-section-default suki-widget-title-alignment-left suki-widget-title-decoration-border-bottom suki-footer-widgets-bar-with-bottom-bar">
                <div class="suki-footer-widgets-bar-inner suki-section-inner">
                    <div class="suki-wrapper">
                        <div class="suki-footer-widgets-bar-row suki-footer-widgets-bar-columns-3">
                            <div class="suki-footer-widgets-bar-column-1 suki-footer-widgets-bar-column">
                                <div id="search-6" class="widget widget_search">
                                    <h2 class="widget-title">LETAR DU EFTER NÅGOT?</h2>
                                    <form role="search" method="get" class="search-form" action="https://naturlogi.se/">
                                        <label>
                                            <span class="screen-reader-text">Search for:</span>
                                            <input type="search" class="search-field" placeholder="Search…" value="" name="s" />
                                        </label>
                                        <input type="submit" class="search-submit" value="Search" />
                                        <span class="suki-icon suki-search-icon" title="" aria-hidden="true">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" width="24" height="24"><path d="M26,46.1a20,20,0,1,1,20-20A20,20,0,0,1,26,46.1ZM63.4,58.5,48.2,43.3a3.67,3.67,0,0,0-2-.8A26.7,26.7,0,0,0,52,26a26,26,0,1,0-9.6,20.2,4.64,4.64,0,0,0,.8,2L58.4,63.4a1.93,1.93,0,0,0,2.8,0l2.1-2.1A1.86,1.86,0,0,0,63.4,58.5Z"></path></svg>
                                        </span>
                                    </form>
                                </div>
                            </div>
                            <div class="suki-footer-widgets-bar-column-2 suki-footer-widgets-bar-column">
                                <div id="wpsr_main_widget-5" class="widget widget_wpsr_main_widget">
                                    <h2 class="widget-title">SOCIAL MEDIA</h2>
                                    <div class="socializer sr-followbar sr-32px sr-opacity sr-pad sr-multiline">
                                        <span class="sr-facebook ">
                                            <a rel="nofollow" href="https://facebook.com/naturlogi" target="_blank" title="Naturlogi på Facebook" style={{color: '#ffffff'}}><i class="fab fa-facebook-f"></i></a>
                                        </span>
                                        <span class="sr-instagram ">
                                            <a rel="nofollow" href="https://instagram.com/naturlogi" target="_blank" title="Naturlogi på Instagram" style={{color: '#ffffff'}}><i class="fab fa-instagram"></i></a>
                                        </span>
                                        <span class="sr-email ">
                                            <a rel="nofollow" href="mailto:info@verklighetensgard.se" target="_blank" title="Maila oss!" style={{color: '#ffffff'}}><i class="fa fa-envelope"></i></a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="suki-footer-widgets-bar-column-3 suki-footer-widgets-bar-column">
                                <div id="nav_menu-5" class="widget widget_nav_menu">
                                    <h2 class="widget-title">Mer info</h2>
                                    <div class="menu-footer-menu-container">
                                        <ul id="menu-footer-menu" class="menu">
                                            <li id="menu-item-29" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-29">
                                                <a href="https://naturlogi.se/kontakt/" class="suki-menu-item-link "><span class="suki-menu-item-title">Kontakt</span></a>
                                            </li>
                                            <li id="menu-item-112" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-112">
                                                <a href="https://naturlogi.se/om-oss/" class="suki-menu-item-link "><span class="suki-menu-item-title">Om Naturlogi</span></a>
                                            </li>
                                            <li id="menu-item-1000" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1000">
                                                <a href="https://naturlogi.se/information/" class="suki-menu-item-link "><span class="suki-menu-item-title">Inför ditt besök</span></a>
                                                </li>
                                            <li id="menu-item-114" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-114">
                                                <a href="https://verklighetensgard.se" class="suki-menu-item-link "><span class="suki-menu-item-title">Verklighetens Gård</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer> 
    );
}

export default Footer;
