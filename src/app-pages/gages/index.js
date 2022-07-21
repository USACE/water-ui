import { connect } from 'redux-bundler-react';

export default connect('selectGageStatsItems', ({ gageStatsItems: items }) => {
  return (
    <div>
      <table className="">
        <thead className="bg-gray-300">
          <tr>
            <th className="p-2">Office</th>
            <th className="p-2">Platforms</th>
            <th className="p-2">GOES Medium</th>
            <th className="p-2">Iridium Medium</th>
            <th className="p-2">Other Medium</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.owner} className="border-2">
                <td className="p-1">{item.owner}</td>
                <td className="p-1">{item.platform_count}</td>
                <td className="p-1">{item.tm_goes_count}</td>
                <td className="p-1">{item.tm_iridium_count}</td>
                <td className="p-1">{item.tm_other_count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

// export default GageStats;
