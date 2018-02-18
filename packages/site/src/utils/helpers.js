import tinycolor from 'tinycolor2';

export default class Utils {
    static buildColorVariables(fooVarVariables) {
        const colorObjects = Object.entries(fooVarVariables).map((e) => {
            const rgbaArray = e[1]();
            const rgbaObject = {
                r: null,
                g: null,
                b: null,
                a: 1
            };

            const rgbaObjectKeys = Object.keys(rgbaObject);

            rgbaArray.forEach((num, index) => {
                const rgbaIndex = rgbaObjectKeys[index];
                rgbaObject[rgbaIndex] = num;
            });

            const color = tinycolor(rgbaObject);

            if (color.isValid()) {
                return {
                    variable: `$${e[0]}`,
                    value: color,
                    dark: color.isDark()
                };
            }

            return false;
        });

        return colorObjects.filter(e => e);
    }

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

    static buildShadowVariables(fooVarVariables) {
        const shadowObjects = Object.entries(fooVarVariables).map(e => ({
            variable: `$${e[0]}`,
            value: typeof e[1] === 'string' ? e[1] : Utils.buildCSSfromArray(e[1])
        }));

        return shadowObjects.filter(e => e);
    }

    static buildTypographyVariables(fooVarVariables) {
        const typographyObjects = Object.entries(fooVarVariables).map(e => ({
            variable: `$${e[0]}`,
            value: e[1].css
        }));

        return typographyObjects.filter(e => e);
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static cleanString(string) {
        return string.replace(/\s/g, '').toLowerCase();
    }
}
