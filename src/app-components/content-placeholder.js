const Placeholder = ({ ready, children, className, rows = 1 }) => {
  let elements = [];
  for (let x = 0; x < rows; x++) {
    elements.push(
      <span key={x} className={`block bg-gray-200 ${className} animate-pulse`}>
        &nbsp;
      </span>
    );
  }

  return ready ? children : elements;
};

export { Placeholder };
