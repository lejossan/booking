import React from 'react';
import Menu from './menu.js';
import HeaderMobile from './header-mobile.js';

function Header() {
    return (
        <div>
            <HeaderMobile />
            <div id="canvas" className="suki-canvas">
                <div id="page" className="site">
                    <header id="masthead" className="site-header" role="banner" itemType="https://schema.org/WPHeader" itemScope>
                        <div id="header" className="suki-header-main suki-header">
                            <div id="suki-header-main-bar"
                                className="suki-header-main-bar suki-header-section suki-section suki-section-default suki-header-menu-highlight-none"
                                data-height="80">
                                <div className="suki-header-main-bar-inner suki-section-inner">
                                    <div className="suki-wrapper">
                                        <div className="suki-header-main-bar-row suki-header-row ">
                                            <div className="suki-header-main-bar-left suki-header-column">
                                                <div className="suki-header-logo site-branding menu">
                                                    <div className="site-title menu-item h1">
                                                        <a href="https://naturlogi.se/" rel="home" className="suki-menu-item-link">
                                                            <span className="suki-default-logo suki-logo">
                                                                <span className="suki-logo-image">
                                                                    <img width="2000"
                                                                        height="331" src="https://naturlogi.se/wp-content/uploads/2019/12/Horizontal-Thick.png"
                                                                        className="attachment-full size-full" alt=""
                                                                        srcSet="https://naturlogi.se/wp-content/uploads/2019/12/Horizontal-Thick.png 2000w,https://naturlogi.se/wp-content/uploads/2019/12/Horizontal-Thick-300x50.png 300w,https://naturlogi.se/wp-content/uploads/2019/12/Horizontal-Thick-768x127.png 768w,https://naturlogi.se/wp-content/uploads/2019/12/Horizontal-Thick-1024x169.png 1024w"
                                                                        sizes="(max-width: 2000px) 100vw, 2000px" />
                                                                </span>
                                                                <span className="screen-reader-text">Naturlogi</span>
                                                            </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="suki-header-main-bar-right suki-header-column">
                                                <Menu/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="mobile-header" className="suki-header-mobile suki-header">
                            <div id="suki-header-mobile-main-bar"
                                className="suki-header-mobile-main-bar suki-header-section suki-section suki-section-default" data-height="60">
                                <div className="suki-header-mobile-main-bar-inner suki-section-inner">
                                    <div className="suki-wrapper">
                                        <div className="suki-header-mobile-main-bar-row suki-header-row suki-header-row-with-center">
                                            <div className="suki-header-mobile-main-bar-left suki-header-column">
                                                <div className="suki-header-mobile-vertical-toggle">
                                                    <button className="suki-popup-toggle suki-toggle" data-target="mobile-vertical-header">
                                                        <span className="suki-icon suki-menu-icon" title=""><svg xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 64 64" width="64" height="64">
                                                            <path
                                                                d="M60,35H4a2,2,0,0,1-2-2V31a2,2,0,0,1,2-2H60a2,2,0,0,1,2,2v2A2,2,0,0,1,60,35Zm0-22H4a2,2,0,0,1-2-2V9A2,2,0,0,1,4,7H60a2,2,0,0,1,2,2v2A2,2,0,0,1,60,13Zm0,44H4a2,2,0,0,1-2-2V53a2,2,0,0,1,2-2H60a2,2,0,0,1,2,2v2A2,2,0,0,1,60,57Z">
                                                            </path>
                                                        </svg></span> <span className="screen-reader-text">Mobile Menu</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="suki-header-mobile-main-bar-center suki-header-column">
                                                <div className="suki-header-mobile-logo site-branding menu">
                                                    <div className="site-title menu-item h1">
                                                        <a href="https://naturlogi.se/" rel="home" className="suki-menu-item-link">
                                                            <span className="suki-default-logo suki-logo"><span className="suki-logo-image">
                                                                <img width="2000"
                                                                    height="1071" src="https://naturlogi.se/wp-content/uploads/2019/12/Full-Regular.png"
                                                                    className="attachment-full size-full" alt=""
                                                                    srcSet="https://naturlogi.se/wp-content/uploads/2019/12/Full-Regular.png 2000w,https://naturlogi.se/wp-content/uploads/2019/12/Full-Regular-300x161.png 300w,https://naturlogi.se/wp-content/uploads/2019/12/Full-Regular-768x411.png 768w,https://naturlogi.se/wp-content/uploads/2019/12/Full-Regular-1024x548.png 1024w"
                                                                    sizes="(max-width: 2000px) 100vw, 2000px" />
                                                            </span>
                                                            <span className="screen-reader-text">Naturlogi</span></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="suki-header-mobile-main-bar-right suki-header-column">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div id="content" className="site-content">
                        <div id="post-5" className="entry post-5 page type-page status-publish hentry" role="article">
                            <div className="wp-block-cover has-background-dim image image-wood">
                                <div className="wp-block-cover__inner-container">
                                    <h2 className="has-text-align-left bigger suki-wrapper">BOKNING</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
