import { User } from "../types/User";

import * as React from "react";
import styled from "@emotion/styled";

interface IUserResultProps {
  user: User;
}

const UserResult: React.FC<IUserResultProps> = ({ user }) => {
  const UCard = styled.div`
    margin: 12px 0;
    display: grid;
    grid-template-columns: 96px 1fr;
    gap: 0;
    img: {
      padding: 0;
      width: 96px !important;
      border: 1px solid #f00;
      margin: 0;
    }
  `;

  function resizeAvatar(url: string) {
    return `${url.replace("200x200", "96x96")}?gravatar=hashed`;
  }
  return (
    <UCard>
      <img src={resizeAvatar(user.avatar)} />

      <div>
        {user.name} - {user.email}
      </div>
    </UCard>
  );
};

export default UserResult;
