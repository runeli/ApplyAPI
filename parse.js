//Helper function to parse objects boolean strings 'true' & 'false' and numeric values to their corresponding native types.
function parse(obj) {
    var result = {},
        key,
        value;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            value = obj[key];

            if (typeof value === 'string') {
                if (!isNaN(parseFloat(value))) {
                    result[key] = parseFloat(value);
                }
                else if (value === 'true') {
                    result[key] = true;
                }
                else if (value === 'false') {
                    result[key] = false;
                }
                else {
                    result[key] = value;
                }
            }
            else if (value.constructor === Object) {
                result[key] = parse(value);
            }
            else {
                result[key] = value;
            }
        }
    }

    return result;
}

module.exports = parse;