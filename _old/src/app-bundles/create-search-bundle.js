import { createSelector } from 'redux-bundler';

// Helper Function; Uppercase first letter of camel case
const camelHelper = (name) => `${name[0].toUpperCase().concat(name.slice(1))}`;
// Action Name Patterns for Search Bundles
const searchFireAction = (name) => `do${camelHelper(name)}Fire`;
const selectItems = (name) => `select${camelHelper(name)}Items`;

const register = (m) => {
  const requiredFunctionNames = [searchFireAction(m.name), selectItems(m.name)];

  // If bundle does not contain a required action OR required action is not a function
  if (requiredFunctionNames.some((f) => !m[f] || typeof m[f] !== 'function')) {
    console.error(
      `\n\n\nFailed to Register with Search Bundle: ${
        m.name
      }\nMissing implementation of at least one of the following required functions: ${JSON.stringify(
        requiredFunctionNames
      )}\n\n\n`
    );
    // Registration failed
    return false;
  }
  // Registration passed
  console.log(`Register with Search Bundle Success: ${m.name}`);
  return true;
};

const createSearchBundle = (opts) => {
  const defaults = {
    name: 'search',
    searchableBundles: [],
  };
  const config = { ...defaults, ...opts };

  return {
    name: config.name,
    getReducer: () => {
      const initialState = {
        _entities: [], // which entities were searched in last call to doSearchFire(...entities)
        _isOpen: false,
        _shouldFire: false,
        _query: '',
        _initializing: false,
        _initialized: false,
        _registeredBundles: [],
      };

      return (state = initialState, { type, payload }) => {
        switch (type) {
          case 'SEARCH_CLEAR':
          case 'SEARCH_FIRE':
          case 'SEARCH_FOCUS':
          case 'SEARCH_INITIALIZE_START':
          case 'SEARCH_INITIALIZE_FINISH':
          case 'SEARCH_OPEN':
          case 'SEARCH_CLOSE':
          case 'SEARCH_QUERY_UPDATE':
          case 'SEARCH_QUERY_CLEAR':
            return { ...state, ...payload };
          default:
            return state;
        }
      };
    },
    doSearchInitialize:
      () =>
      ({ dispatch, store }) => {
        dispatch({
          type: 'SEARCH_INITIALIZE_START',
          payload: { _initiaizing: true },
        });
        console.log(
          `\n===================\nINITIALIZE SEARCH\n===================\nRegister Bundles: ${JSON.stringify(
            config.searchableBundles.map((b) => b.name)
          )}`
        );
        // Initialize Each Searchable Module
        // Record successful registrations to store in state
        const registered = [];
        config.searchableBundles.forEach((b) => {
          if (register(b)) {
            store.integrateBundles(b);
            registered.push(b);
          }
        });
        dispatch({
          type: 'SEARCH_INITIALIZE_FINISH',
          payload: {
            _initializing: false,
            _initialized: true,
            _registeredBundles: registered,
          },
        });
      },
    doSearchOpen:
      () =>
      ({ dispatch }) => {
        dispatch({
          type: 'SEARCH_OPEN',
          payload: {
            _isOpen: true,
          },
        });
      },
    doSearchClose:
      () =>
      ({ dispatch }) => {
        dispatch({
          type: 'SEARCH_CLOSE',
          payload: {
            _isOpen: false,
          },
        });
      },
    doSearchFocus:
      () =>
      ({ dispatch }) => {
        dispatch({ type: 'SEARCH_FOCUS' });
      },
    // doSearchFire accepts zero or more strings, corresponding to the
    // searchable bundles that should respond to action SEARCH_FIRE
    doSearchFire:
      (...entities) =>
      ({ dispatch }) => {
        dispatch({
          type: 'SEARCH_FIRE',
          payload: entities?.length ? { _entities: entities } : {},
        });
      },

    doSearchQueryUpdate:
      (str) =>
      ({ dispatch }) => {
        dispatch({
          type: 'SEARCH_QUERY_UPDATE',
          payload: { _query: str },
        });
      },
    doSearchClear:
      () =>
      ({ dispatch }) => {
        dispatch({
          type: 'SEARCH_CLEAR',
          payload: { _query: '' },
        });
      },
    selectSearchInitialized: (state) => state.search._initialized,
    selectSearchIsInitializing: (state) => state.search._initializing,
    selectSearchQuery: (state) => state.search._query,
    selectSearchIsOpen: (state) => state.search._isOpen,
    selectSearchItems: (state) => {
      const items = state.search._registeredBundles
        .map((b) => state[b.name].items)
        .flat();
      return items;
    },
    reactSearchInitialize: createSelector(
      'selectSearchInitialized',
      'selectSearchIsInitializing',
      (initialized, isInitializing) =>
        !initialized && !isInitializing
          ? { actionCreator: 'doSearchInitialize' }
          : null
    ),
  };
};

export default createSearchBundle;
