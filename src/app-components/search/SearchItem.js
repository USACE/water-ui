import React from "react";
import { connect } from "redux-bundler-react";

const SearchItem = connect(
  "doSelectedSelect",
  "doSearchClose",
  "doSearchClear",
  ({
    doSelectedSelect,
    doSearchClose,
    doSearchClear,
    icon: Icon,
    name,
    providerName,
    buttons,
    provider,
    uid,
    clickable = false,
    goTo,
  }) => (
    <div
      onClick={
        !clickable
          ? null
          : () => {
              doSelectedSelect({
                provider: provider,
                uid: uid,
                goTo: goTo,
              });
              doSearchClose();
              doSearchClear();
            }
      }
      className={`p-2 ${clickable ? "hover:bg-gray-200 cursor-pointer" : null}`}
    >
      <div className='flex w-100 space-x-4'>
        <Icon />
        {/* Text */}
        <div className='flex flex-col'>
          <div className='font-normal text-medium capitalize'>{name}</div>
          <div className='uppercase font-thin opacity-50 text-xs'>
            {providerName || "CHEESE"}
          </div>
        </div>
      </div>
    </div>
  )
);

export default SearchItem;
