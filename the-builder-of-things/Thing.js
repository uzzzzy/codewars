class Thing {
  constructor(name) {
    if (!name) {
      throw new Error('Name is required');
    }

    this.name = name;

    this.is_a_person = false;
    this.is_a_man = false;
    this.is_a_woman = false;

    this.track = null;
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

  get and_the() {
    const self = this;
    return new Proxy(
      {},
      {
        get(target, prop) {
          return new Proxy(
            {},
            {
              get(target, prop2) {
                self[prop] = prop2;
                return self;
              },
            }
          );
        },
      }
    );
  }

  get being_the() {
    const self = this;
    return new Proxy(
      {},
      {
        get(target, prop) {
          return new Proxy(
            {},
            {
              get(target, prop2) {
                self[prop] = prop2;
                return self;
              },
            }
          );
        },
      }
    );
  }

  get can() {
    return this;
  }

  speak(...args) {
    const [arg1, arg2] = args;
    let fn = arg1;
    if (arg2) {
      fn = arg2;
      this.track = arg1;
    }

    if (typeof fn !== 'function') {
      if (this.track) {
        this[this.track] = [...this[this.track], this._speak(fn)];
      }
      return this._speak(fn);
    }
    let fnString = fn.toString();

    fnString = fnString.replace(/\${name}/g, this.name);

    this._speak = new Function('return ' + fnString)();

    if (arg2) {
      this[arg1] = [];
    }

    return this;
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
            this.forEach((thing) => {
              const cbString = callback.toString().replace(/\s/g, '');
              const [instance, fn] = cbString.split('=>');
              const hasNumber = fn.match(/\((\d+)\)/);
              const [method, value] = fn.split('.');
              const [toRemove, number] = method.match(/\((\d+)\)/);
              const method2 = method.replace(toRemove, '');
              return thing[method2](number)[value];
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
          self[prop].each = function (callback) {
            this.forEach((thing) => {
              const cbString = callback.toString().replace(/\s/g, '');
              const [instance, fn] = cbString.split('=>');
              const args = fn.split('.');

              const chunks = [];
              for (let i = 0; i < args.length; i += 3) {
                chunks.push(args.slice(i, i + 3));
              }
              chunks.forEach((chunk) => {
                thing[chunk[0]][chunk[1]][chunk[2]];
              });

              return thing;
            });
            return this;
          };
          return self[prop];
        },
      }
    );
  }
}

module.exports = Thing;
