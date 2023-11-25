console.log('The builder of things');

class Thing {
  constructor(name) {
    this.name = name;

    // body parts
    this._head = [];
    this._arms = [];
    this._legs = [];

    // head parts
    this._eyes = [];

    // arms parts
    this._hands = [];
    this._fingers = [];

    // instance type
    this.is_a_person = false;

    // person type
    this.is_a_woman = false;
    this.is_a_man = false;

    // statement
    this._is_a = null;

    this.eachPart = null;
    this.temporaryNumber = null;
    this.havingNumber = null;
    this.lastPart = null;
  }

  /**
   *
   * @param {number} number
   * @returns
   */
  has(number) {
    this.temporaryNumber = number;

    return this;
  }

  /**
   *
   * @param {number} number
   * @returns
   */
  having(number) {
    this.temporaryNumber = number;
    this.havingNumber = number;

    return this;
  }

  each(callback) {
    console.log('each', this.lastPart);
    return this;
  }

  get is_a() {
    this._is_a = true;
    return this;
  }

  get is_not_a() {
    this._is_a = false;
    return this;
  }

  get person() {
    this.is_a_person = this._is_a;
    this._is_a = null;
    return this;
  }

  get woman() {
    this.is_a_woman = this._is_a;
    this.is_a_man = this._is_a ? false : this.is_a_man;
    this._is_a = null;
    return this;
  }

  get man() {
    this.is_a_man = this._is_a;
    this.is_a_woman = this._is_a ? false : this.is_a_woman;
    this._is_a = null;
    return this;
  }

  get head() {
    this.lastPart = this._head;
    const self = this;
    console.log('head', this.temporaryNumber);
    if (this.temporaryNumber !== null) {
      this._head = [];
      for (let i = 0; i < this.temporaryNumber; i++) {
        this._head.push(new Thing('head'));
      }

      this.temporaryNumber = null;
    }

    if (this.havingNumber !== null) {
      this.havingNumber = null;
      return this._head.length === this.havingNumber;
    }

    const dataObj = {
      length: self._head.length,
      having: function (number) {
        return self.having(number);
      },
      each: function (callback) {
        for (let i = 0; i < this.length; i++) {
          callback(this[i]);
        }
      },
    };

    Object.defineProperties(dataObj, Symbol.iterator, {
      value: function* () {
        yield* self._head;
      },
    });

    return new Proxy(dataObj, {
      get(target, prop, receiver) {
        const int = parseInt(prop);
        if (isNaN(int)) {
          return self._head[prop];
        }
        return Reflect.get(target, prop, receiver);
      },
    });
  }

  get arms() {
    this.lastPart = this._arms;
    const self = this;
    if (this.temporaryNumber !== null) {
      this._arms = [];
      for (let i = 0; i < this.temporaryNumber; i++) {
        this._arms.push(new Thing('arm'));
      }

      this.temporaryNumber = null;
    }

    if (this.havingNumber !== null) {
      this.havingNumber = null;
      return this._arms.length === this.havingNumber;
    }
    const dataObj = {
      length: self._arms.length,
      having: function (number) {
        return self.having(number);
      },
      each: function (callback) {
        for (let i = 0; i < this.length; i++) {
          callback(this[i]);
        }
      },
    };

    Object.defineProperties(dataObj, Symbol.iterator, {
      value: function* () {
        yield* self._legs;
      },
    });

    return new Proxy(dataObj, {
      get(target, prop, receiver) {
        const int = parseInt(prop);
        if (!isNaN(int)) {
          return self._legs[prop];
        }
        return Reflect.get(target, prop, receiver);
      },
    });
  }

  get legs() {
    this.lastPart = this._legs;
    const self = this;

    if (this.temporaryNumber !== null) {
      this._legs = [];
      for (let i = 0; i < this.temporaryNumber; i++) {
        this._legs.push(new Thing('leg'));
      }

      this.temporaryNumber = null;
    }

    if (this.havingNumber !== null) {
      this.havingNumber = null;
      return this._legs.length === this.havingNumber;
    }

    const dataObj = {
      length: self._legs.length,
      having: (number) => self.having(number),
      each: function (callback) {
        for (let i = 0; i < this.length; i++) {
          callback(this[i]);
        }
      },
    };

    Object.defineProperties(dataObj, Symbol.iterator, {
      value: function* () {
        yield* self._legs;
      },
    });

    return new Proxy(dataObj, {
      get(target, prop, receiver) {
        const int = parseInt(prop);
        if (!isNaN(int)) {
          return self._legs[prop];
        }
        return Reflect.get(target, prop, receiver);
      },
    });
  }

  // head parts
  get eyes() {
    this.lastPart = this._eyes;
    if (this.temporaryNumber !== null) {
      this._eyes = [];
      for (let i = 0; i < this.temporaryNumber; i++) {
        this._eyes.push(new Thing('eye'));
      }

      this.temporaryNumber = null;
    }

    if (this.havingNumber !== null) {
      this.havingNumber = null;
      return this._eyes.length === this.havingNumber;
    }

    return this._eyes.length === 1 ? this._eyes[0] : this._eyes;
  }

  // arms parts
  get hands() {
    this.lastPart = this._hands;
    if (this.temporaryNumber !== null) {
      this._hands = [];
      for (let i = 0; i < this.temporaryNumber; i++) {
        this._hands.push(new Thing('hand'));
      }

      this.temporaryNumber = null;
    }

    if (this.havingNumber !== null) {
      this.havingNumber = null;
      return this._hands.length === this.havingNumber;
    }

    return this._hands.length === 1 ? this._hands[0] : this._hands;
  }

  // fingers parts
  get fingers() {
    this.lastPart = this._fingers;
    if (this.temporaryNumber !== null) {
      this._fingers = [];
      for (let i = 0; i < this.temporaryNumber; i++) {
        this._fingers.push(new Thing('finger'));
      }

      this.temporaryNumber = null;
    }

    if (this.havingNumber !== null) {
      this.havingNumber = null;
      return this._fingers.length === this.havingNumber;
    }

    return this._fingers.length === 1 ? this._fingers[0] : this._fingers;
  }
}

try {
  const jane = new Thing('Jane');

  console.log('jane.name', jane.name === 'Jane'); // => true

  jane.is_a.person;
  jane.is_a.woman;
  jane.is_not_a.woman;
  jane.is_a.man;
  console.log('jane.is_a_person', jane.is_a_person === true); // => true

  console.log('jane.is_a_person', jane.is_a_person === true); // => true
  console.log('jane.is_a_woman', jane.is_a_woman === false); // => fals
  console.log('jane.is_a_man', jane.is_a_man === true); // => true

  // can define number of child things
  // when more than 1, an array is created
  jane.has(2).legs;

  console.log('jane.legs.length', jane.legs.length === 2); // => true
  console.log(
    'jane.legs[0] instanceof Thing',
    jane.legs[0] instanceof Thing === true
  ); // => true

  // can define single items
  jane.has(1).head;

  jane.has(1).head;
  console.log('jane.head.eyes.length', jane.head[0]); // => true

  console.log(
    'jane.head instanceof Thing',
    jane.head instanceof Thing === true
  ); // => true

  jane.having(2).arms;

  console.log('jane.arms.length', jane.arms.length === 2); // => true

  jane.has(2).hands;
} catch (error) {
  console.error(error);
}
