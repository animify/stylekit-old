import React, { Component } from 'react';
import tinycolor from 'tinycolor2';
import $ from 'jquery';
import variableDefs from './../definitions/variables';

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


        return Object.values(variablesStructure);
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static cleanString(string) {
        return string.replace(/\s/g, '');
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

            const snippetHtml = trimmedSnippet.clone().wrapAll('<div>').parent();
            snippetHtml.contents().filter(() => this.nodeType === 3).remove();

            const newSubsection = {
                title: section.attr('title'),
                subtitle: section.attr('subtitle'),
                codeStyle: section.attr('codeStyle'),
                class: section.attr('class').replace(/snippet-section\b/g, '').trim(),
                snippet: snippetHtml.html()
            };

            subsections.push(newSubsection);
        });

        return subsections;
    }

    static importPage(pageName, pageContainer, currentSectionNameOverride) {
        import(`./../../pages/${pageName}/guide.json`).then((pageGuide) => {
            let currentSectionName = null;
            let pageSections = null;

            const setPageData = (sections) => {
                pageContainer.setState({ sections });

                if (pageName === 'variables') {
                    const availableVariables = Object.values(sections).map(section => ({title: section.title, id: section.id}));
                    currentSectionName = availableVariables.find(v => v.id === currentSectionNameOverride);
                    pageSections = availableVariables;
                } else {
                    currentSectionName = pageGuide.find(guideSection => guideSection.folder === currentSectionNameOverride);
                    pageSections = sections;
                }

                pageContainer.props.updateNavSections({
                    current: currentSectionName ? currentSectionName.id : currentSectionNameOverride,
                    page: pageName,
                    list: pageSections.map(section => ({
                        id: section.id,
                        title: section.title,
                        pageName: pageName,
                        section: pageContainer[Utils.cleanString(section.id)]
                    }))
                });
            }

            if (pageName === 'variables') {
                const variables = Utils.buildVariables(variableDefs, pageGuide);
                setPageData(variables);
            } else {
                const pageImports = pageGuide.map(guideSection => new Promise((resolve) => {
                    import(`./../../pages/${pageName}/${guideSection.folder}/snippet.html`)
                        .then((snippet) => resolve({
                            ...guideSection,
                            id: guideSection.folder,
                            subsections: Utils.buildSnippet($(snippet))
                        }));
                }));

                Promise.all(pageImports)
                    .then((sections) => setPageData(sections))
                    .catch((e) => {
                        console.debug(`Stylekit: Oops, looks like you're missing a snippet file. ${e.message}`);
                    });
            }
        });
    }
}
