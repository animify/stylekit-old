import React from 'react';
import { Link } from 'react-router-dom';

const HomeContainer = () => (
    <div>
        <h2 className="text grey"><span role="img" aria-label="wave">Stylekit</span></h2>
        <Link className="button base" to="/components">Go to components</Link>
    </div>
);

export default HomeContainer;
