import React from 'react'; 
import Menu from '../components/ProfileMenu';
import ProfileCard from '../components/ProflieCard';


class Profile extends React.Component {

  render() {
    return (
      <div>
        <div>
          <ProfileCard/>
        </div>
        <div>
          <Menu> </Menu>
        </div>
      </div>
    );
  }
}

export default Profile;