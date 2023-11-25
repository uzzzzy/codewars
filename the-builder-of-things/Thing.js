class Thing {
  constructor(name) {
    if (!name) {
      throw new Error('Name is required');
    }

    this.name = name;

    this.is_a_person = false;
    this.is_a_man = false;
    this.is_a_woman = false;
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

  has(number) {
    const self = this;
    return new Proxy(
      {},
      {
        get(target, prop) {
          const parts = [];
          for (let i = 0; i < number; i++) {
            const singular = prop.replace(/s$/, '');
            const thing = new Thing(singular);
            parts.push(thing);
          }
          self[prop] = parts;
          return self;
        },
      }
    );
  }

  having(number) {
    const self = this;
    return new Proxy(
      {},
      {
        get(target, prop) {
          const parts = [];
          for (let i = 0; i < number; i++) {
            const singular = prop.replace(/s$/, '');
            const thing = new Thing(singular);
            parts.push(thing);
          }
          self[prop] = parts;
          return self;
        },
      }
    );
  }
}

module.exports = Thing;
