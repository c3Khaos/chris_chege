// src/components/Header.jsx
import React from 'react';

const Header = () => (
    <header className="section" style={{ padding: '20px 0', borderBottom: '1px solid #333' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="header-brand" style={{ margin: 0, fontSize: '1.8rem' }}>
                <span className="accent">c3</span> Works
            </h1>
            <nav>
                <a href="#projects" className="btn-secondary btn" style={{ marginRight: '10px' }}>Projects</a>
                <a href="#contact" className="btn-secondary btn">Contact</a>
            </nav>
        </div>
    </header>
);

export default Header;