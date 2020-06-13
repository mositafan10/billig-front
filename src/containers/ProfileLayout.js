import React from 'react'; 
import Menu from '../components/ProfileMenu';
import ProfileCard from '../components/ProflieCard';


class Profile extends React.Component {

  render() {
    return (
      <div>
        {
        this.props.isAuthenticated ?
        <div>
          <div>
              <ProfileCard/>
          </div>
          <div>
              <Menu> </Menu>
          </div>
        </div>
        :
        <div>
          <p style={{fontFamily:"IRANSans", textAlign:"center"}}>  ابتدا<a href={'/login'}> وارد</a>  حساب کاربری خود شوید  </p>
        </div>
       }
      </div>
    );
  }
}

export default Profile;