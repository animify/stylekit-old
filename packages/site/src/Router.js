import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import HomeLayout from './containers/HomeLayout';
import PageLayout from './containers/PageLayout';

export default class Router extends Component {
    static get stylePages() {
        return [
            {
                title: 'Components',
                description: 'The atomic building blocks used throughout the design system to create collective containers.',
                path: '/components/:type?',
                guide: 'components',
                active: true
            },
            {
                title: 'Layout',
                description: 'Structural units & helpers that make up the responsive & visual foundation of your page.',
                path: '/layout/:type?',
                guide: 'layout',
                active: true
            },
            {
                title: 'Utility',
                description: 'Useful classes & methods that assist in managing elements within a structured layout.',
                path: '/utility/:type?',
                guide: 'utility',
                active: true
            },
            {
                title: 'Variables',
                description: 'A collection of static style variables used universally by the stylekit for components and layout.',
                path: '/variables/:type?',
                guide: 'variables',
                active: true
            }
        ];
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" render={() => (<HomeLayout />)} />

                    { Router.stylePages.map(page => (
                        <Route exact path={page.path} render={props => (<PageLayout {...props} guide={page.guide} title={page.title} description={page.description} />)} />
                    )) }

                </div>
            </BrowserRouter>
        );
    }
}
