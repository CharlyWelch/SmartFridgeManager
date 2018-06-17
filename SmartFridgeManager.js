/**
 * Interface for the Smart Fridge Manager
 *
 */

class SmartFridgeManager {

  constructor(items) {
    this.items = []
  }

  handleItemRemoved(id) {
    this.items = this.items.filter(item => item.itemUUID !== id);
  }

  handleItemAdded(itemType, itemUUID, name, fillFactor = 1) {
    const newItem = {
      itemType: itemType, 
      itemUUID: itemUUID, 
      name: name, 
      fillFactor: fillFactor};
    this.items.push(newItem);
  }

  getItems(fillFactor) {
    const shoppingList = [];
    this.items.forEach(item => {
      if(this.getFillFactor(item.itemType) <= fillFactor && !shoppingList.includes(item.itemType)) {
        shoppingList.push([item.itemType, item.fillFactor]);
      };
    });
    return shoppingList;
  }

  getFillFactor(itemType) {
    let fillFactorAccumulator = 0
    const typePartialOnly = this.items.filter(item => item.itemType == itemType).filter(item => item.fillFactor > 0); 
    typePartialOnly.forEach( item => {
      fillFactorAccumulator += item.fillFactor;
    });
    return fillFactorAccumulator / typePartialOnly.length;
  } 

  forgetItem(itemType) {
    this.items = this.items.filter( item => item.itemType !== itemType);
  }
}

// TEST FUNCTIONALITY IN TERMINAL BY RUNNING `node SmartFridgeManager.js`

const fridge = new SmartFridgeManager();
fridge.handleItemAdded('fruit', '1', 'apples', .75);
fridge.handleItemAdded('fruit', '2', 'oranges', .5);
fridge.handleItemAdded('fruit', '1', 'strawberries', .3); 
fridge.handleItemAdded('mustard', '3', 'honey dijon', .2);
fridge.handleItemAdded('mustard', '4', 'yellow mustard', .1);
fridge.handleItemAdded('milk', '6', 'milk', .3);
fridge.handleItemAdded('meat', '5', 'steak'); 
fridge.handleItemAdded('meat', '7', 'ground beef', .2);
fridge.handleItemAdded('meat', '8', 'ground beef', 0);
fridge.handleItemAdded('meat', '8', 'sausage', .5);
console.log('***** All items after adding to fridge: ', fridge.items); 
console.log('***** Calculate fill factor for meat: ', fridge.getFillFactor('meat'));
console.log('***** Get items less than or equal to 30% full, cumulatively', fridge.getItems(0.3)); 
fridge.handleItemRemoved('3'); 
fridge.forgetItem('meat');
console.log('***** All items after removing honey dijon and forgetting meat: ', fridge.items);

