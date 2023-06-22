import { useMemo } from 'react';
import { debounce } from 'lodash';
import { Combobox } from '@headlessui/react';
import { useConnect } from 'redux-bundler-hook';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { FcDam } from 'react-icons/fc';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const LocationIcon = ({ kind, size }) => {
  switch (kind?.toLowerCase()) {
    case 'project':
      return <FcDam size={size} />;

    default:
      return <HiOutlineLocationMarker size={size} />;
  }
};

const LocationItem = ({
  kind,
  public_name,
  code,
  provider,
  provider_name,
  slug,
  state,
  state_name,
}) => {
  return (
    <div key={slug} className="flex">
      <div className="flex-none">
        <LocationIcon kind={kind} size={25} />
      </div>
      <div className="flex-auto pl-2">
        <div
          className={`font-bold ${public_name?.length > 15 ? 'text-sm' : null}`}
        >
          {public_name || code}
        </div>
        <div className="text-sm">Office: {provider_name}</div>
        <div className="text-sm">State: {state}</div>
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
  className,
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
    <>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>

      <Combobox
        value={value}
        onChange={(v) => {
          //setValue(v);
          //setIsValid(true); // TODO; Automatically setIsValid true when location is selected. May want to add more explicit validation checking
          console.log(v);
          doUpdateUrl(`/overview/${v.provider}/locations/${v.slug}`);
        }}
      >
        <Combobox.Label>{label}</Combobox.Label>
        <Combobox.Input
          // aria-invalid={!isValid}
          className={`block w-full rounded-md border border-transparent py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm ${className}`}
          displayValue={(l) =>
            l && `${l?.code} (${l?.provider?.toUpperCase()})`
          }
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
        <Combobox.Options className="absolute mt-1 max-h-96 w-full overflow-y-auto bg-white p-0 shadow-xl">
          {locationSearchItems.map((l) => (
            <Combobox.Option
              autoComplete="off"
              key={l.provider + '_' + l.slug}
              value={l}
              // styles below are for the list item (li) element
              className="cursor-pointer border-b-2 border-gray-100"
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
    </>
  );
}

export default LocationCombobox;
