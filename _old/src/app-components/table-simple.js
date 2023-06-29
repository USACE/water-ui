import { parseISO, formatDistanceStrict, differenceInHours } from 'date-fns';

const SimpleTable = ({ headers, items, itemFields, options = {} }) => {
  const { striped, shadow, rounded, rowBlur } = options;

  return (
    <div className={`flex flex-col ${shadow ? 'shadow-lg' : null}`}>
      {/* <div className="overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
      <div className="overflow-x-auto ">
        {/* <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"> */}
        <div className="inline-block min-w-full align-middle">
          <div
            className={`overflow-hidden shadow ring-1 ring-black ring-opacity-5 ${
              rounded ? 'md:rounded-lg' : null
            }`}
          >
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((th, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className={`px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ${th.className}`}
                    >
                      {th.text}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {!items || !items.length
                  ? null
                  : items.map((item, idx) => (
                      <tr
                        key={idx}
                        className={
                          striped
                            ? idx % 2 === 0
                              ? undefined
                              : 'bg-gray-50'
                            : null
                        }
                      >
                        {/* Item Fields */}
                        {itemFields &&
                          itemFields.length &&
                          itemFields.map((f, idx) => (
                            <td
                              key={idx}
                              className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${
                                f.className
                              } ${rowBlur ? 'blur-sm' : null}`}
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
};

const TableLink = ({
  href,
  title,
  text,
  target = '_self',
  download = null,
}) => {
  return (
    <a
      className="hover:underline"
      href={href}
      title={title || text}
      target={target}
      download={download}
    >
      {text}
    </a>
  );
};

const TableValueWithTime = ({ tsObj }) => {
  const ageInHours = differenceInHours(
    new Date(),
    parseISO(tsObj?.latest_time)
  );
  return (
    <>
      <span className="block font-bold">
        {tsObj?.latest_value?.toLocaleString(undefined, {
          maximumFractionDigits: 1,
        })}
      </span>
      <span
        className={`block text-xs font-light ${
          ageInHours > 3 ? 'text-red-400' : 'text-gray-400'
        } `}
        title={tsObj?.latest_time}
      >
        {tsObj?.latest_time &&
          formatDistanceStrict(parseISO(tsObj?.latest_time), new Date(), {
            addSuffix: true,
            unit: 'hour',
          })}
      </span>
      {/* <span className="block text-gray-400" title={tsObj?.latest_time}>
        {tsObj?.latest_time &&
          format(parseISO(tsObj?.latest_time), 'dd-LLL-yyyy @ p')}
      </span> */}
    </>
  );
};

export { SimpleTable, TableLink, TableValueWithTime };