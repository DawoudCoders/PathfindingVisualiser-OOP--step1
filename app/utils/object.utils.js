function generateQueryConstructor(query) {
  for (const key in query) {
    this[key] = query[key];
  }
}

export default generateQueryConstructor;
