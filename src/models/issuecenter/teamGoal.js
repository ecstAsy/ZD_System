/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { create, remove, update } from 'services/issuecenter/application'
import * as applicationsService from 'services/issuecenter/application'
import { pageModel } from '../common'

const { query } = applicationsService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'tamGoal',

  state: {
      isEdit:false,
      teamData:[
        {quyuName:'邵武',teamData:[{name:'团队ee',num:100,member:[{name:'周丹:',num:'10'},{name:'周0丹:',num:'10'},
          {name:'周1丹:',num:'10'},{name:'周2丹:',num:'10'},{name:'周3丹:',num:'10'},
          {name:'周4丹:',num:'10'}]},
          {name:'团队sd',num:150,member:[{name:'周丹:',num:'10'},{name:'周0丹:',num:'10'},
            {name:'周1丹:',num:'10'},{name:'周2丹:',num:'10'},{name:'周3丹:',num:'10'},
            {name:'周4丹:',num:'10'}]}]},
        {quyuName:'苏州',teamData:[{name:'团队ffg',num:200,member:[{name:'周丹:',num:'10'},{name:'周0丹:',num:'10'},
          {name:'周1丹:',num:'10'},{name:'周2丹:',num:'10'},{name:'周3丹:',num:'10'},
          {name:'周4丹:',num:'10'}]},
          {name:'周丹丹团队二',num:250,member:[{name:'周丹:',num:'10'},{name:'周0丹:',num:'10'},
            {name:'周1丹:',num:'10'},{name:'周2丹:',num:'10'},{name:'周3丹:',num:'10'},
            {name:'周4丹:',num:'10'}]}]},
        {quyuName:'宿迁HT-谢',teamData:[{name:'团队uu',num:50,member:[{name:'周丹:',num:'10'},{name:'周0丹:',num:'10'},
          {name:'周1丹:',num:'10'},{name:'周2丹:',num:'10'},{name:'周3丹:',num:'10'},
          {name:'周4丹:',num:'10'}]},
          {name:'团队jh',num:80,member:[{name:'周丹:',num:'10'},{name:'周0丹:',num:'10'},
            {name:'周1丹:',num:'10'},{name:'周2丹:',num:'10'},{name:'周3丹:',num:'10'},
            {name:'周4丹:',num:'10'}]}]}
      ],

  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/application') {
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 };
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },
  },

  reducers: {
    isEditFunc (state, { payload }) {
      console.log(1111)
      return { ...state, ...payload, isEdit: !state.isEdit }
    },


  },
})
