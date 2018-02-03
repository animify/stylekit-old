import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer>
        <div className="container">
            <div className="footer menu">
                <ul className="list">
                    <li className="item header">Sections</li>
                    <li className="item"><Link to="/components">Components</Link></li>
                    <li className="item"><Link to="/design">Design</Link></li>
                    <li className="item"><Link to="/utilities">Utilities</Link></li>
                    <li className="item"><Link to="/variables">Variables</Link></li>
                </ul>
            </div>
        </div>
    </footer>
);

export default Footer;
