import pathToRegexp from 'path-to-regexp'
import { query, create, update, } from '../../services/provider'

export default {

  namespace: 'providerDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/provider/info/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
        } else {
          const match1 = pathToRegexp('/provider/form/:id').exec(pathname)
          if (match1) {
            dispatch({ type: 'query', payload: { id: match1[1] } })
          }
        }
      })
    },
  },

  effects: {
    * query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, payload)
      if (data && data.code === '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data.data && data.data.list && data.data.list.length === 1 && data.data.list[0],
          },
        })
      } else {
        throw data
      }
    },

    * create ({ payload }, { call }) {
      const data = yield call(create, payload)
      if (!data.success) {
        throw data
      }
    },

    * update ({ payload }, { call }) {
      const data = yield call(update, payload)
      if (!data.success) {
        throw data
      }
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
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
