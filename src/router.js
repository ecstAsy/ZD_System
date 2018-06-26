import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/dashboard',
      models: () => [import('./models/yewuyuan/dashboard')],
      component: () => import('./routes/yewuyuan/dashboard/'),
    },
  {
    path: '/application',
      models: () => [import('./models/yewuyuan/application')],
    component: () => import('./routes/yewuyuan/application/'),
  },  {
      path: '/user',
      models: () => [import('./models/yewuyuan/user')],
      component: () => import('./routes/yewuyuan/user/'),
    }, {
      path: '/user/:id',
      models: () => [import('./models/yewuyuan/user/detail')],
      component: () => import('./routes/yewuyuan/user/detail/'),
    }, {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    }, {
    path: '/successPolicy',
      models: () => [import('./models/teamLeader/successPolicy')],
    component: () => import('./routes/teamLeader/successPolicy/'),
  },{
    path: '/record',
      models: () => [import('./models/yewuyuan/record')],
    component: () => import('./routes/yewuyuan/record/'),
  }
  ]

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zh_CN}>
        <App>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
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
