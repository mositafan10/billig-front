import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { ConfigProvider } from "antd";
import * as actions from "./store/actions/auth";
import { BreakpointProvider } from "react-socks";

//routes
import BaseRouter from "./routes";
import ProfileRoutes from "./routers/ProfileRoutes";
import LoginRoutes from "./routers/LoginRoutes";

//layout
import CustomLayout from "./layout/Layout";
import ProfileLayout from "./layout/ProfileLayout";
import LoginLayout from "./layout/LoginLayout";

import "antd/dist/antd.css";


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div className="App">
        <Router >
          <Switch>

            {/* Profile Layout */}
            <Route path="/profile/:path?">
              <BreakpointProvider>
                <ProfileLayout {...this.props} >
                  <ConfigProvider direction="rtl">
                    <Switch>
                      <ProfileRoutes {...this.props}/>
                    </Switch>
                  </ConfigProvider>
                </ProfileLayout>
              </BreakpointProvider>
            </Route>
            
            {/* login & Signup Layout */}
            <Route path={["/login", "/signup", "/signup/:path?"]} exact>
              <BreakpointProvider>
                <LoginLayout {...this.props}>
                  <ConfigProvider direction="rtl">
                    <Switch>
                      <LoginRoutes {...this.props} />
                    </Switch>
                  </ConfigProvider>
                </LoginLayout>
              </BreakpointProvider>
            </Route>

            {/* Main Layout */}
            <Route path="/:path?">
              <BreakpointProvider>
                <CustomLayout {...this.props}>
                  <ConfigProvider direction="rtl">
                    <Switch>
                      <BaseRouter {...this.props} />
                    </Switch>
                  </ConfigProvider>
                </CustomLayout>
              </BreakpointProvider>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
