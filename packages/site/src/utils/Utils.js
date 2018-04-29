import React, { Component } from 'react';
import tinycolor from 'tinycolor2';
import $ from 'jquery';
import variableDefs from './../definitions/variables';
import jsHTML from 'js-beautify';

const options = {
  "indent_size": 4,
  "unformatted": ['abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'select', 'small', 'strong', 'sub', 'sup', 'svg', 'template', 'time', 'u', 'var', 'video', 'wbr', 'text', 'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt']
}

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
            a[g.id] = { ...g, variables: [] }
            return a;
        }, {});

        Object.entries(variables).map(variable => {
            const variableName = variable[0];
            const variableData = variable[1];
            const variableType = typeof variableData;

            const belongsTo = guide.map(g => g.startsWith).find(g => variableName.startsWith(g.replace(/\$/, ''))).replace(/\$/, '')
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

            let snippetHtml = trimmedSnippet.clone().wrapAll('<div>').parent();
            snippetHtml.contents().filter(() => this.nodeType === 3).remove();

            const codeHtml = snippetHtml.clone();
            codeHtml.find('[hidechildren]').empty().removeAttr('hidechildren').append('...');
            snippetHtml.find('[hidechildren]').removeAttr('hidechildren');

            const newSubsection = {
                title: section.attr('title'),
                subtitle: section.attr('subtitle'),
                codeStyle: section.attr('codeStyle'),
                class: section.attr('class').replace(/snippet-section\b/g, '').trim(),
                snippet: jsHTML.html(snippetHtml.html(), options),
                displaySnippet: jsHTML.html(codeHtml.html(), options),
            };

            subsections.push(newSubsection);
        });

        return subsections;
    }

    static loadSection(pageName, section) {
        console.log('loading section', pageName, section);
        return new Promise((resolve, reject) => {
            import(`./../../pages/${pageName}/${section.folder}/snippet.html`)
                .then((snippet) => resolve({
                    ...section,
                    id: section.folder,
                    subsections: Utils.buildSnippet($(snippet))
                }));
        })

    }

    static importPage(pageName, pageContainer, sectionName) {
        import(`./../../pages/${pageName}/guide.json`).then((pageGuide) => {
            let pageSections = null;

            const setPageData = (sections, section) => {
                pageContainer.setState({ sections, section });

                if (pageName === 'variables') {
                    const availableVariables = Object.values(sections).map(section => ({ title: section.title, id: section.id }));
                    pageSections = availableVariables;
                } else {
                    pageSections = sections;
                }

                pageContainer.props.updateSectionNames({
                    current: sectionName,
                    page: pageName,
                    list: pageSections.map(section => ({
                        ...section,
                        page: pageName,
                    }))
                });
            }

            if (pageName === 'variables') {
                const variables = Utils.buildVariables(variableDefs, pageGuide);
                const pageSection = sectionName ? variables.find(g => g.id === sectionName) : variables[0];
                console.log(variables);
                setPageData(variables, pageSection);
            } else {
                const components = pageGuide.map(section => ({...section, id: section.folder}));
                const pageSection = sectionName ? components.find(g => g.folder === sectionName) : components[0];
                Utils.loadSection(pageName, pageSection).then(section => {
                    setPageData(components, section)
                });
            }
        });
    }
}
