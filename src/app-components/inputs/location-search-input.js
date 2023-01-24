import { useMemo } from 'react';
import { debounce } from 'lodash';
import { Combobox } from '@headlessui/react';
import { useConnect } from 'redux-bundler-hook';

const LocationItem = ({
  attributes,
  code,
  datatype,
  datatype_name,
  provider,
  provider_name,
  slug,
  state,
  state_name,
}) => {
  return (
    <div key={slug}>
      <div className="font-bold">{attributes.public_name || code}</div>
      <div className="text-sm">Datatype: {datatype_name}</div>
      <div className="text-sm">Provider: {provider_name}</div>
      <div className="text-sm">
        State: {state_name} ({state})
      </div>
    </div>
  );
};

function LocationCombobox({
  label,
  value,
  setValue,
  isValid,
  setIsValid,
  isRequired,
  placeholder,
}) {
  const {
    doSearchClear,
    doSearchFire,
    doSearchQueryUpdate,
    locationSearchItems,
    doUpdateUrl,
  } = useConnect(
    'doSearchClear',
    'doSearchFire',
    'doSearchQueryUpdate',
    'selectLocationSearchItems',
    'doUpdateUrl'
  );

  // debounced search fire function
  const debouncedSearchFire = useMemo(
    () => debounce(() => doSearchFire('location'), 300),
    [doSearchFire]
  );

  return (
    <Combobox
      value={value}
      onChange={(v) => {
        //setValue(v);
        //setIsValid(true); // TODO; Automatically setIsValid true when location is selected. May want to add more explicit validation checking
        console.log(v);
        doUpdateUrl(`/overview/${v.provider}/location/${v.slug}`);
      }}
    >
      <Combobox.Label>{label}</Combobox.Label>
      <Combobox.Input
        // aria-invalid={!isValid}
        className="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
        displayValue={(l) => l && `${l?.code} (${l?.provider?.toUpperCase()})`}
        //placeholder={isRequired ? label : `${label} (optional)`}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(event) => {
          // only show search results if more than 3 characters are typed in input
          if (event.target.value?.length < 3) {
            doSearchClear();
            // reset the selected location to 'null' if the entire field is deleted
            if (event.target.value?.length === 0) {
              setValue(null);
            }
            return;
          }
          doSearchQueryUpdate(event.target.value);
          debouncedSearchFire();
        }}
      />
      {/* Styles below apply to the unordered list (ul) element */}
      <Combobox.Options className="absolute mt-1 max-h-96 w-full overflow-y-auto bg-white p-0">
        {locationSearchItems.map((l) => (
          <Combobox.Option
            autoComplete="off"
            key={l.slug}
            value={l}
            // styles below are for the list item (li) element
            className="mb-2"
          >
            {({ active, selected }) => (
              <div className="bg-white p-2 text-black ui-active:bg-blue-500 ui-active:text-white">
                <LocationItem {...l} />
              </div>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default LocationCombobox;
