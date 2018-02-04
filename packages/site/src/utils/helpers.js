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

    static buildTypographyVariables(fooVarVariables) {
        const colorObjects = Object.entries(fooVarVariables).map(e => ({
            variable: `$${e[0]}`,
            value: e[1].css
        }));

        return colorObjects.filter(e => e);
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static cleanString(string) {
        return string.replace(/\s/g, '').toLowerCase();
    }
}
