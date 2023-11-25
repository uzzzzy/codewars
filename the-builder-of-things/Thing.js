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
  }
}

module.exports = Thing;
