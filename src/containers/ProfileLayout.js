// import React from 'react'; 
import Menu from '../components/ProfileMenu';
// import ProfileCard from '../components/ProfileCard';


// class Profile extends React.Component {

//   render() {
//     return (
//       <div>
//         {
//         this.props.isAuthenticated ?
//         <div>
//           <div>
//               <ProfileCard/>
//           </div>
//           <hr style={{borderColor:"white"}}/><br/>
//           <div>
              // <Menu> </Menu>
//           </div>
//         </div>
//         :
//         <div>
//           <p style={{fontFamily:"IRANSans", textAlign:"center"}}>  ابتدا<a href={'/login'}> وارد</a>  حساب کاربری خود شوید  </p>
//         </div>
//        }
//       </div>
//     );
//   }
// }

// export default Profile;

import React from 'react'; 
import { Layout, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Profile extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
       <Menu></Menu>
      </Layout>
    );
  }
}

export default Profile;