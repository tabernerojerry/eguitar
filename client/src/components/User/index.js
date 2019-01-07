import React from "react";

import UserLayout from "../../hoc/UserLayout";
import Button from "../utils/Button";
import HistoryBlock from "../utils/User/HistoryBlock";

const UserDashboard = ({ user }) => (
  <UserLayout>
    <div>
      <div className="user_nfo_panel">
        <h1>User Information</h1>
        <div>
          <span>{user.userData && user.userData.firstName}</span>
          <span>{user.userData && user.userData.lastName}</span>
          <span>{user.userData && user.userData.email}</span>
        </div>
        <Button
          type="default"
          title="Edit Account Info"
          linkTo="/user/profile"
        />
      </div>
      {user.userData && user.userData.history ? (
        <div className="user_nfo_panel">
          <h1>History of Purchases</h1>
          <div className="user_product_block_wrapper">
            <HistoryBlock products={user.userData.history} />
          </div>
        </div>
      ) : null}
    </div>
  </UserLayout>
);

export default UserDashboard;
