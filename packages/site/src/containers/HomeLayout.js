import React from 'react';
import { Link } from 'react-router-dom';

const HomeLayout = ({ stylePages }) => (
    <section className="container">
        <div className="layout">
            <div className="hero">
                <h1>Your Stylekit</h1>
                <h3>Choose which part of the stylekit you want to view:</h3>
            </div>
            <div className="row selectables">
                {
                    stylePages.filter(p => p.active).map(page => (
                        <div className="col-12@t col-6@m">
                            <div className="selectable">
                                <div className="inner">
                                    <h2>{page.title}</h2>
                                    <p>{page.description}</p>
                                </div>
                                <Link to={`/${page.guide}`} className="explore">Explore <i data-minicon="arrow-right" /></Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
);

export default HomeLayout;
