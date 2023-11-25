class Thing {
  constructor(name) {
    if (!name) {
      throw new Error('Name is required');
    }

    this.name = name;
  }

  get is_a() {
    const self = this;
    const gender = ['man', 'woman'];
    return new Proxy(
      {},
      {
        get(target, prop) {
          if (gender.includes(prop)) {
            gender.forEach((item) => {
              self['is_a_' + item] = false;
            });
            self['is_a_' + prop] = true;
            return self;
          }
          self['is_a_' + prop] = true;
          return self;
        },
      }
    );
  }

  get is_not_a() {
    const self = this;
    return new Proxy(
      {},
      {
        get(target, prop) {
          self['is_a_' + prop] = false;
          return self;
        },
      }
    );
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
          console.log('is_a_', prop, value);
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
