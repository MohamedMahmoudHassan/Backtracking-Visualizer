var GetRandFromList = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

export { GetRandFromList };