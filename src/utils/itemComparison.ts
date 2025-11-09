import { ShoppingItem } from '../types';

export function getItemKey(item: ShoppingItem | Omit<ShoppingItem, 'id' | 'purchaseStatus'>): string {
  return `${item.block}-${item.number}`;
}

export function insertItemSorted(items: ShoppingItem[], newItem: ShoppingItem): ShoppingItem[] {
  const newItems = [...items];
  const newItemKey = getItemKey(newItem);
  
  // ブロックとナンバーでソート
  let insertIndex = 0;
  for (let i = 0; i < newItems.length; i++) {
    const currentKey = getItemKey(newItems[i]);
    if (currentKey.localeCompare(newItemKey, 'ja', { numeric: true, sensitivity: 'base' }) > 0) {
      insertIndex = i;
      break;
    }
    insertIndex = i + 1;
  }
  
  newItems.splice(insertIndex, 0, newItem);
  return newItems;
}

