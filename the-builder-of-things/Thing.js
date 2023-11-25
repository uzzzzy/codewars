class Thing {
  /**
   * @class
   * @classdesc This will allow you to define things in a descriptive sentence like format.
   *
   * @param {string} name - The name of the thing.
   * @throws {Error} - If name is not provided.
   */
  constructor(name) {
    if (!name) {
      throw new Error('Name is required');
    }
    this.name = name;

    // instance type
    this._person = false;

    this._is_a = null;

    this.currentAction = null;

    this._dynamicValues = {
      person: false,
    };
  }

  get is_a() {
    this.currentAction = 'is_a';
    return this;
  }

  get person() {
    if (this.currentAction === 'is_a') {
      this[this.currentAction + '_person'] = true;
    }
    return this;
  }

  get is_a_() {
    const self = this;
    return new Proxy(
      {},
      {
        get(target, prop) {
          console.log('is_a_', prop);
          if (prop.startsWith('person')) {
            const dynamicProp = prop.slice('person'.length);
            return self._dynamicValues[dynamicProp];
          } else {
            return undefined; // or any default value/error handling as needed
          }
        },
        set(target, prop, value) {
          if (prop.startsWith('person')) {
            const dynamicProp = prop.slice('person'.length);
            self._dynamicValues[dynamicProp] = value;
            return true;
          } else {
            return false; // disallow setting properties not starting with 'person'
          }
        },
        deleteProperty(target, prop) {
          if (prop.startsWith('person')) {
            const dynamicProp = prop.slice('person'.length);
            if (dynamicProp in self._dynamicValues) {
              delete self._dynamicValues[dynamicProp];
              return true;
            }
          }
          return false;
        },
      }
    );
  }
}

module.exports = Thing;
