const Placeholder = ({ ready, children, className }) => {
  const placeholder = (
    <span className={`block bg-gray-200 ${className} animate-pulse`}>
      &nbsp;
    </span>
  );
  return ready ? children : placeholder;
};

export { Placeholder };
