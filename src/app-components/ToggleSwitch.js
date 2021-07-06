import React, { useState } from "react";
import { connect } from "redux-bundler-react";

const ToggleSwitch = ({
  isEngaged,
  onToggle,
  engagedLabel,
  disengagedLabel,
}) => {
  const [engaged, setEngaged] = useState(isEngaged);

  return (
    <div className='flex items-center justify-center'>
      {/* Disengaged Label */}
      {disengagedLabel && (
        <div className={`pr-3 ${isEngaged && "text-gray-400"}`}>
          {disengagedLabel}
        </div>
      )}
      {/* Toggle Button */}
      <div
        className={`px-1 w-16 h-8 rounded-full flex items-center ${
          engaged ? "flex-row-reverse bg-green-400" : "flex-row bg-gray-200"
        }`}
        onClick={() => {
          onToggle && onToggle();
          setEngaged(!engaged);
        }}
      >
        <div className='w-7 h-7 bg-gray-600 rounded-full'></div>
      </div>
      {/* Engaged Label */}
      {engagedLabel && (
        <div className={`pl-3 ${!isEngaged && "text-gray-400"}`}>
          {engagedLabel}
        </div>
      )}
    </div>
  );
};

const ToggleSwitchAllLocations = connect(
  "selectLocationDisplayAll",
  "doLocationToggleDisplayAll",
  ({ locationDisplayAll: isEngaged, doLocationToggleDisplayAll }) => (
    <ToggleSwitch
      isEngaged={isEngaged}
      engagedLabel='Show All Locations'
      disengagedLabel='Projects Only'
      onToggle={doLocationToggleDisplayAll}
    />
  )
);

export { ToggleSwitchAllLocations };

export default ToggleSwitch;
