/**
 * @param {uuid} id
 * @constructor
 */
function Entry(id) {
  /** @type {uuid} */
  this.id = id;

  /** @type {string} */
  this.word = '';

  /** @type {string} */
  this.translation = '';

  /** @type {number} */
  this.level = 1;

  /** @type {Array.<Answer>} */
  this.answers = [];

  /** @type {date} */
  this.created = new Date();
}

Entry.incrementLevel = function(self) {
  if (self.level < 5) {
    self.level++;
  }
};

Entry.decrementLevel = function(self) {
  if (self.level > 1) {
    self.level--;
  }
};