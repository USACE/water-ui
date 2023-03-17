export default function SimpleTable({ headers, items, itemFields }) {
  return (
    <div className="flex flex-col">
      {/* <div className="overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
      <div className="overflow-x-auto">
        {/* <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"> */}
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  {headers.map((th, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {!items || !items.length
                  ? null
                  : items.map((item, idx) => (
                      <tr key={idx}>
                        {/* Item Fields */}
                        {itemFields &&
                          itemFields.length &&
                          itemFields.map((f, idx) => (
                            <td
                              key={idx}
                              className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                              {!f.render ? item[f.key] : f.render(item)}
                            </td>
                          ))}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}