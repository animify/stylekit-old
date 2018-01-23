import React from 'react';
import { Link } from 'react-router-dom';

const HomeContainer = () => (
    <div>
        <h2 className="text grey"><span role="img" aria-label="wave">👋</span></h2>
        <Link className="button primary medium" to="/">...</Link>
    </div>
);

export default HomeContainer;
