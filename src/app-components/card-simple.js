export default function CardSimple({ title, children }) {
  return (
    <div className="overflow-hidden rounded-lg shadow">
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
      </div>
      <div className="bg-white py-5 px-5">{children}</div>
    </div>
  );
}
