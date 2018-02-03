export default class Utils {
    static buildColorVariables(fooVarVariables) {
        return Object.entries(fooVarVariables).map(e => ({
            variable: `$${e[0]}`,
            value: e[1]()
        }));
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static cleanString(string) {
        return string.replace(/\s/g, '').toLowerCase();
    }
}
