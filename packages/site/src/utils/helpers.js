import React, { Component } from 'react';
import tinycolor from 'tinycolor2';
import $ from 'jquery';
import Variable from './../components/Variable';

export default class Utils {
    static buildCSSfromArray(arrays) {
        let cssString = '';

        if (arrays.length > 1 && typeof arrays[0] !== 'string') {
            arrays.forEach((arr) => {
                cssString += arr.join(' ');
                cssString += ', ';
            });
        } else {
            cssString += arrays.join(' ');
        }

        cssString.trim();
        cssString = cssString.replace(/(^\s*,)|(,\s*$)/g, '');

        return cssString;
    }

    static buildVariables(variables, guide) {
        const variablesStructure = guide.reduce((a, g) => {
            a[g.id] = {...g, variables: []}
            return a;
        }, {});

        Object.entries(variables).map(variable => {
            const variableName = variable[0];
            const variableData = variable[1];
            const variableType = typeof variableData;

            const belongsTo = guide.map(g => g.startsWith).find(g => variableName.startsWith(g.replace(/\$/,''))).replace(/\$/,'')
            const variableDataArray = variablesStructure[belongsTo].variables;

            switch (variableType) {
                case 'string':
                    variableDataArray.push({
                        name: `$${variableName}`,
                        data: variableData
                    });
                    break;
                case 'object':
                    const isArray = Array.isArray(variableData);

                    if (isArray) {
                        variableDataArray.push({
                            name: `$${variableName}`,
                            data: Utils.buildCSSfromArray(variableData)
                        });
                    } else {
                        Object.entries(variableData).forEach(v => {
                            const name = `$${variableName}.${v[0]}`
                            let data = v[1];
                            data = Array.isArray(data) ? Utils.buildCSSfromArray(data) : data;

                            variableDataArray.push({
                                name,
                                data
                            });
                        });
                    }
                    break;
            }
        });


        return variablesStructure;
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static cleanString(string) {
        return string.replace(/\s/g, '').toLowerCase();
    }

    static buildSnippet(snippet) {
        const subsections = [];
        const sections = snippet.filter('.snippet-section');

        sections.each((i, s) => {
            const section = $(s);
            let trimmedSnippet = null;

            if (sections[i + 1]) {
                trimmedSnippet = section.nextUntil(sections[i + 1]);
            } else {
                trimmedSnippet = section.nextAll();
            }

            const newSubsection = {
                title: section.attr('title'),
                subtitle: section.attr('subtitle'),
                codeStyle: section.attr('codeStyle'),
                snippet: trimmedSnippet.clone().wrapAll('<div>').parent().html()
            };

            subsections.push(newSubsection);
        });

        return subsections;
    }

    static importPage(pageName, pageContainer, currentSectionId) {
        import(`./../../pages/${pageName}/guide.json`).then((pageGuide) => {
            const imports = pageGuide.map(guideSection => new Promise((resolve) => {
                import(`./../../pages/${pageName}/${guideSection.folder}/snippet.html`)
                    .then((snippet) => {
                        const section = { ...guideSection };
                        section.subsections = Utils.buildSnippet($(snippet));
                        resolve(section);
                    });
            }));

            Promise.all(imports)
                .then((sections) => {
                    pageContainer.setState({ sections });

                    const hasTitle = pageGuide.find(guideSection => guideSection.folder === currentSectionId);

                    pageContainer.props.updateNavSections({
                        current: hasTitle ? hasTitle.title : currentSectionId,
                        page: pageName,
                        list: pageGuide.map(guideSection => ({
                            id: guideSection.folder,
                            title: guideSection.title,
                            pageName: pageName,
                            section: pageContainer[Utils.cleanString(guideSection.folder)]
                        }))
                    });
                })
                .catch((e) => {
                    console.debug(`Stylekit: Oops, looks like you're missing a snippet file. ${e.message}`);
                });
        });
    }
}
