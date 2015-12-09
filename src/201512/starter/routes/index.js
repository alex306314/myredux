import React                 from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout            from 'layouts/CoreLayout';
import HomeView              from 'views/HomeView';
import AboutView             from 'views/AboutView';
import r                     from '../../../../config/route_config';

export default (
  <Route        component={CoreLayout} path={r.baseRoute}>
    <IndexRoute component={HomeView} />
    <Route      component={AboutView}  path='about' />
  </Route>
);
