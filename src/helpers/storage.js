const store = localStorage;

const save = (key, val) => {
  let data = get(key) || [];
  const findItem = exist(key, val);
  if (findItem >= 0) {
    data.splice(findItem, 1);
  } else {
    data.push(val);
  }
  store.setItem(key, JSON.stringify(data));
}

const get = (key) => {
  return JSON.parse(store.getItem(key));
}

const exist = (key, val) => {
  let data = get(key) || [];
  let findItem = data.findIndex(d => d.id === val.id);
  console.log(findItem)
  return findItem;
}

export {save, get, exist}