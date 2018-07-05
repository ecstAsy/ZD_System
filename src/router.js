import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from 'routes/app';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

const { ConnectedRouter } = routerRedux;

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/dashboard',//今日汇总
      models: () => [import('./models/yewuyuan/dashboard')],
      component: () => import('./routes/yewuyuan/dashboard/'),
    },
  {
    path: '/application',//名单申请
      models: () => [import('./models/yewuyuan/application')],
    component: () => import('./routes/yewuyuan/application/'),
  },{
      path: '/user',//名单查询
      models: () => [import('./models/yewuyuan/user')],
      component: () => import('./routes/yewuyuan/user/'),
    },{
      path: '/user/add',//新增名单
      models: () => [import('./models/yewuyuan/user/add')],
      component: () => import('./routes/yewuyuan/user/add/'),
    },{
      path: '/user/quote',//报价
      models: () => [import('./models/yewuyuan/user/quote')],
      component: () => import('./routes/yewuyuan/user/quote/'),
    } ,{
      path: '/login',//登陆
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    },{
    path: '/successPolicy',//成功提交保单
      models: () => [import('./models/teamLeader/successPolicy')],
    component: () => import('./routes/teamLeader/successPolicy/'),
  },{
      path: '/complaint',//客户投诉
      models: () => [import('./models/teamLeader/complaint')],
      component: () => import('./routes/teamLeader/complaint/'),
    },{
    path: '/parameter',//团队参数
      models: () => [import('./models/teamLeader/parameter')],
    component: () => import('./routes/teamLeader/parameter/'),
  },{
    path: '/record',//通话记录
      models: () => [import('./models/yewuyuan/record')],
    component: () => import('./routes/yewuyuan/record/'),
  },{
      path: '/allocate',//名单分配
      models: () => [import('./models/teamLeader/allocateList')],
      component: () => import('./routes/teamLeader/allocateList/'),
    },{
      path: '/rebateapply',//返利申请
      models: () => [import('./models/teamLeader/rebateapply')],
      component: () => import('./routes/teamLeader/rebateapply/'),
    },{
      path: '/listrecovery',//名单回收
      models: () => [import('./models/teamLeader/listrecovery')],
      component: () => import('./routes/teamLeader/listrecovery/'),
    }
  ]

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zh_CN}>
        <App>
          <Switch>
            {/*<Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />*/}
            {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
            <Route component={error} />
          </Switch>
        </App>
      </LocaleProvider>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
