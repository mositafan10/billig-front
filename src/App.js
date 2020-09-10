import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { ConfigProvider } from 'antd';
import * as actions from './store/actions/auth';

//components
import Login from './containers/Login';
import Signup from './containers/Signup';

//routes
import BaseRouter from './routes';
import ProfileRoutes from './routers/ProfileRoutes';
import LoginRoutes from './routers/LoginRoutes';

//layout
import CustomLayout from './layout/Layout';
import ProfileLayout from './layout/ProfileLayout';
import LoginLayout from './layout/LoginLayout';

import 'antd/dist/antd.css';


class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  
  render(){
    return(
      <div className="App">
      <Router> 
        <Switch>

        {/* Profile Layout */}
        <Route path='/profile/:path?' exact>
          <ProfileLayout {...this.props}>
            <ConfigProvider direction="rtl">
              <Switch>
                <ProfileRoutes {...this.props} />
            </Switch>
            </ConfigProvider>
          </ProfileLayout>
        </Route>
        
      {/* login & Signup Layout */}
      <Route path={["/login", "/signup"]} exact>
          <LoginLayout {...this.props}>
            <ConfigProvider direction="rtl">
              <Switch>
                  <LoginRoutes {...this.props} />
              </Switch>
            </ConfigProvider>
          </LoginLayout>
        </Route>

      {/* Main Layout */}
        <Route path='/:path?' exact>
          <CustomLayout {...this.props}>
            <ConfigProvider direction="rtl">
              <Switch>
                <BaseRouter {...this.props} />
              </Switch>
            </ConfigProvider>
          </CustomLayout>
        </Route>


        </Switch>
      </Router>
      </div>
    ) 
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
