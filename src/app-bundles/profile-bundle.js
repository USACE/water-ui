import { createSelector } from 'redux-bundler';

const profileBundle = {
  name: 'profile',
  getReducer: () => {
    const initialState = {
      _shouldFetch: false,
      _lastFetch: null,
      myProfile: null,
    };

    return (state = initialState, { type, payload }) => {
      switch (type) {
        case 'PROFILE_FETCH_START':
          return Object.assign({}, state, { _shouldFetch: false });
        case 'PROFILE_FETCH_FINISH':
          return Object.assign({}, state, { myProfile: payload });
        case 'AUTH_LOGGED_OUT':
          return { ...state, myProfile: null };
        case 'PROFILE_TOKEN_CREATE_FINISH':
        case 'PROFILE_TOKEN_DELETE_FINISH':
        case 'AUTH_LOGGED_IN':
        case 'AUTH_VERIFY_TOKEN':
        case 'PROFILE_SAVED':
          return Object.assign({}, state, { _shouldFetch: true });
        case 'PROFILE_TOKEN_CREATE_START':
        case 'PROFILE_TOKEN_DELETE_START':
          return state;
        default:
          return state;
      }
    };
  },
  doProfileFetch:
    () =>
    ({ store, dispatch }) => {
      dispatch({ type: 'PROFILE_FETCH_START' });

      const token = store.selectAuthTokenRaw();

      fetch(`${process.env.REACT_APP_WATER_API_URL}/my_profile`, {
        headers: { Authorization: 'Bearer ' + token },
      })
        .then((resp) => {
          if (resp.status === 404) {
            return null;
          }
          return resp.json();
        })
        .then((j) => {
          console.log(j);
          dispatch({ type: 'PROFILE_FETCH_FINISH', payload: j });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  doProfileSave:
    (payload) =>
    ({ store, dispatch }) => {
      const authToken = store.selectAuthTokenRaw();

      fetch(`${process.env.REACT_APP_WATER_API_URL}/my_profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authToken,
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            console.error(`Request returned a ${response.status}`);
          }
          response.json();
        })
        .then((j) => {
          dispatch({ type: 'PROFILE_SAVED' });
        });
    },
  doProfileTokenCreate:
    (item) =>
    ({ dispatch, store }) => {
      const authToken = store.selectAuthTokenRaw();

      dispatch({ type: 'PROFILE_TOKEN_CREATE_START' });
      fetch(`${process.env.REACT_APP_WATER_API_URL}/my_tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            console.error(
              `Create Token: Request returned a ${response.status}`
            );
          }
          return response.json();
        })
        .then((j) => {
          dispatch({ type: 'PROFILE_TOKEN_CREATE_FINISH' });
          return { secretTokenInfo: j };
        });
    },
  doProfileTokenDelete:
    (item) =>
    ({ store, dispatch }) => {
      dispatch({ type: 'PROFILE_TOKEN_DELETE_START' });

      const authToken = store.selectAuthTokenRaw();

      fetch(
        `${process.env.REACT_APP_WATER_API_URL}/my_tokens/${item.token_id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authToken,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            console.error(`Request returned a ${response.status}`);
          }
          response.json();
        })
        .then((j) => {
          dispatch({ type: 'PROFILE_TOKEN_DELETE_FINISH' });
        });
    },
  selectProfileRaw: (state) => state.profile,
  selectProfileShouldFetch: (state) => state.profile._shouldFetch,
  selectProfileMyProfile: (state) => state.profile.myProfile,
  selectProfileTokens: createSelector('selectProfileMyProfile', (profile) =>
    profile && profile.tokens && profile.tokens.length ? profile.tokens : []
  ),
  reactProfileShouldFetch: createSelector(
    'selectProfileShouldFetch',
    (shouldFetch) => {
      if (!shouldFetch) {
        return null;
      }
      return { actionCreator: 'doProfileFetch' };
    }
  ),
};

export default profileBundle;
