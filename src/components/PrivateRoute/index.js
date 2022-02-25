/**
 * 判断是否登录过
 */
import React from 'react'
import { Route, Redirect, } from 'react-router-dom'
import { getStorage } from '@/utils/storage'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !!getStorage()
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
)

export default PrivateRoute