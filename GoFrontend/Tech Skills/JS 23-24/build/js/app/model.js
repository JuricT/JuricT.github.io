define('model', [], function () {
  class Model {
    constructor() {
      this.data = [{
        text: 'Java',
        staus: true
      }, {
        text: 'JavaScript',
        staus: true
      }, {
        text: 'Delphi',
        staus: true
      }];
    }

    addItem(item) {
      if (item.length === 0) return this.data;
      this.data.push({ text: item, status: false });
      return this.data;
    }

    changeItem(index, text) {
      this.data[index] = { text: text, status: false };
      console.log('cang');
    }

    removeItem(index) {
      if (index < 0) return this.data;
      this.data.splice(index, 1);
      return this.data;
    }
  } // class Model

  return Model;
} //define function
); // define

// try {
//   module.export = Model;
// } catch (e) {}