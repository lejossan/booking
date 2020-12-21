import React from 'react';
import Menu from './menu.js';
import HeaderMobile from './header-mobile.js';

function Header() {
    return (
        <header>
            <HeaderMobile />
            <div id="headerDesktop">
                <div className="main-bar">
                    <div className="suki-wrapper">
                        <a href="https://naturlogi.se/" rel="home" className="home">
                                <span className="logo">
                                    <span className="suki-logo-image">
                                        <img src="https://naturlogi.se/wp-content/uploads/2019/12/Horizontal-Thick.png"
                                            className="attachment-full size-full" alt=""
                                            srcSet="https://naturlogi.se/wp-content/uploads/2019/12/Horizontal-Thick.png 2000w,https://naturlogi.se/wp-content/uploads/2019/12/Horizontal-Thick-300x50.png 300w,https://naturlogi.se/wp-content/uploads/2019/12/Horizontal-Thick-768x127.png 768w,https://naturlogi.se/wp-content/uploads/2019/12/Horizontal-Thick-1024x169.png 1024w"
                                            sizes="(max-width: 2000px) 100vw, 2000px" />
                                    </span>
                                    <span className="screen-reader-text">Naturlogi</span>
                                </span>
                            </a>
                        <Menu/>
                    </div>
                </div>
            </div>
            <div className="header-block">
                <div className="wp-block-cover has-background-dim image image-wood">
                    <div className="wp-block-cover__inner-container">
                        <h2 className="has-text-align-left bigger suki-wrapper">BOKNING</h2>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
