import pathToRegexp from 'path-to-regexp'
import { query } from '../../services/purchase'

export default {

  namespace: 'purchaseDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/purchase/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {

    * query ({
      payload,
    }, { call, put }) {
      let data = yield call(query, payload)
      data = data && data.data

      yield put({
        type: 'querySuccess',
        payload: {
          data: data.data[0],
        },
      })
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
