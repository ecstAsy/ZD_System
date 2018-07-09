/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { create, remove, update } from 'services/yewuyuan/application'
import * as applicationsService from 'services/yewuyuan/applications'
import { pageModel } from '../common'

const { query } = applicationsService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'application',

  state: {

  },

  subscriptions: {

  },

  effects: {



  },

  reducers: {



  },
})
