import { createSelector } from 'redux-bundler';

const createSearchableBundle = (opts) => {
  const defaults = {
    searchEntity: 'entity',
    actionPrefix: 'ENTITY',
    searchAction: 'SEARCH_FIRE',
    doSearch: () => () => {
      console.error('doSearch action not provided for this bundle');
    },
  };

  const config = { ...defaults, ...opts };

  // actions
  const actions = {
    SEARCH_CLEAR: 'SEARCH_CLEAR',
    SEARCH_START: `${config.actionPrefix}_SEARCH_START`,
    SEARCH_ERROR: `${config.actionPrefix}_SEARCH_ERROR`,
    SEARCH_FINISH: `${config.actionPrefix}_SEARCH_FINISH`,
  };

  // Bundle Name is combination of searchEntity + "Search"
  // i.e. entity = 'location', bundle name becomes 'locationSearch'
  const name = `${config.searchEntity}Search`;

  // Upper Case First letter; Used in actionCreator, selector, reactor names
  const uCaseName =
    config.searchEntity.charAt(0).toUpperCase() +
    config.searchEntity.slice(1) +
    'Search';

  // actionCreators
  const doFire = `do${uCaseName}Fire`;

  // selectors
  const selectShouldFire = `select${uCaseName}ShouldFire`;
  const selectIsLoading = `select${uCaseName}IsLoading`;
  const selectItems = `select${uCaseName}Items`;

  // reactors
  const reactShouldFire = `react${uCaseName}ShouldFire`;

  return {
    name: name,
    reducer: (
      state = {
        _shouldFire: false,
        _isLoading: false,
        _error: null,
        items: [],
      },
      { type, payload }
    ) => {
      switch (type) {
        case config.searchAction:
          return payload?._entities?.includes(config.searchEntity)
            ? { ...state, _shouldFire: true }
            : { ...state };
        case actions.SEARCH_START:
          return { ...state, _shouldFire: false, _isLoading: true };
        case actions.SEARCH_ERROR:
          return { ...state, _error: payload, _isLoading: false };
        case actions.SEARCH_FINISH:
          return {
            ...state,
            _isLoading: false,
            items: payload
              ? payload.map((t) => ({
                  search_provider: config.searchEntity,
                  ...t,
                }))
              : [],
          };
        case 'SEARCH_CLEAR':
          return {
            ...state,
            items: [],
          };
        default:
          return state;
      }
    },
    [doFire]: config.doSearch,
    [selectShouldFire]: (state) => state[name]._shouldFire,
    [selectIsLoading]: (state) => state[name]._isLoading,
    [selectItems]: (state) => state[name].items,
    [reactShouldFire]: createSelector(
      selectShouldFire,
      selectIsLoading,
      (shouldFire, isLoading) =>
        !isLoading && shouldFire ? { actionCreator: doFire } : null
    ),
  };
};

export default createSearchableBundle;
