function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// includeIfTrue accepts any number of arguments
// and returns an array containing any arguments that evaluate to true
function includeIfTrue(...items) {
  return items.filter(Boolean);
}

export { classNames, includeIfTrue };
