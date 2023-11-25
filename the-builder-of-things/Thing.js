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

  get is_the() {
    const self = this;
    return new Proxy(
      {},
      {
        get(target, prop) {
          return new Proxy(
            {},
            {
              get(target, prop2) {
                return (self[prop] = prop2);
              },
            }
          );
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
          self[prop] = parts.length === 1 ? parts[0] : parts;
          self[prop].each = function (callback) {
            this.forEach((hand) => {
              const [_, number, prop] = callback
                .toString()
                .match(/having\((\d+)\)\.(.*)/);

              hand.having(number)[prop];
            });
            return this;
          };
          return self[prop];
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
          self[prop] = parts.length === 1 ? parts[0] : parts;
          return self[prop];
        },
      }
    );
  }
}

module.exports = Thing;
