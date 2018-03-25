import React from 'react';
import { Link } from 'react-router-dom';

const HomeContainer = () => (
    <section className="container">
        <div className="layout">
            <div className="hero">
                <h1>Your Stylekit</h1>
                <h3>Choose which part of the stylekit you want to view:</h3>
            </div>
            <div className="row selectables">
                <div className="col xs-12 m-6">
                    <div className="selectable">
                        <div className="inner">
                            <h2>Components</h2>
                            <p>Components Components Components Components</p>
                        </div>
                        <Link to="/components" className="explore">Explore <i data-minicon="arrow-right" /></Link>
                    </div>
                </div>
                <div className="col xs-12 m-6">
                    <div className="selectable">
                        <div className="inner">
                            <h2>Layout</h2>
                            <p>Components Components Components Components</p>
                        </div>
                        <Link to="/layout" className="explore">Explore <i data-minicon="arrow-right" /></Link>
                    </div>
                </div>
            </div>
            <div className="row selectables">
                <div className="col xs-12 m-6">
                    <div className="selectable">
                        <div className="inner">
                            <h2>Utility</h2>
                            <p>Components Components Components Components</p>
                        </div>
                        <Link to="/utility" className="explore">Explore <i data-minicon="arrow-right" /></Link>
                    </div>
                </div>
                <div className="col xs-12 m-6">
                    <div className="selectable">
                        <div className="inner">
                            <h2>Variables</h2>
                            <p>Components Components Components Components</p>
                        </div>
                        <Link to="/variables" className="explore">Explore <i data-minicon="arrow-right" /></Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default HomeContainer;
