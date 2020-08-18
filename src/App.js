  import React, { Component } from 'react';
import CustomLayout from './containers/Layout';
import { BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import 'antd/dist/antd.css';
import * as actions from './store/actions/auth';
import { ConfigProvider } from 'antd';

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  
  render(){
    return(
      <div className="App">
      <Router> 
          <CustomLayout {...this.props}>
            <ConfigProvider direction="rtl">
              <BaseRouter {...this.props}/>
            </ConfigProvider>
          </CustomLayout>
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
