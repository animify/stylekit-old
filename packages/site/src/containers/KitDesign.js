import React, { Component } from 'react';
import GuideSection from './../components/GuideSection';
import Utils from './../utils/helpers';

export default class KitDesign extends Component {
    state = {
        guides: []
    }

    componentDidMount() {
        Utils.importPage('design', this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.match.params.type !== this.props.match.params.type) {
            return false;
        }
        return true;
    }

    render() {
        const { guides, list } = this.state;

        return (
            <section className="container">
                <div className="layout">
                    <div className="hero">
                        <h1>Design</h1>
                        <h3>Components do this and that this and that this and that this and that this and that this and that.</h3>
                    </div>
                    {guides.map(sample => <GuideSection ref={(section) => { this[Utils.cleanString(sample.title)] = section; }} key={`sample-${sample.title}`} sample={sample} />)}
                </div>
            </section>
        );
    }
}
