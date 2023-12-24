/* Use this file to export your Markdoc functions */

export const includes = {
  transform(parameters) : boolean {
    const [array, value] = Object.values(parameters);

    return Array.isArray(array) ? array.includes(value) : false;
  },
};

export const upper = {
  transform(parameters : string[]) : string {
    const string = parameters[0];
    console.log('upper', string);
    return typeof string === 'string' ? string.toUpperCase() : string;
  },
};


export const uppercase = {
  transform(parameters) {
    const string = parameters[0];
    console.log('uppercase', string);

    return typeof string === 'string' ? string.toUpperCase() : string;
  }
};
