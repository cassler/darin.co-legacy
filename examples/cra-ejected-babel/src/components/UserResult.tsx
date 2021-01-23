import { User } from "../types/User";

import * as React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

interface IUserResultProps {
  user: User;
}

const UserResult: React.FC<IUserResultProps> = ({ user }) => {
  const theme = useTheme();
  const UCard = styled.div`
    margin: 12px 0;
    display: grid;
    grid-template-columns: 96px 1fr;
    gap: 24px;
    .avatar {
      width: 96px;
      border-radius: 2px;
      height: 96px;
      background-color: ${theme.color.mid};
    }
    h3,
    .user-name {
      padding: 0;
      margin: 0;
      color: ${theme.color.darkColor};
      font-weight: bold;
      font-size: 16px;
      line-height: 1.5em;
      letter-spacing: -0.025em;
    }
    p,
    .user-desc {
      color: ${theme.color.baseColor};
      font-size: 14px;
      line-height: 150%;
      letter-spacing: -0.015em;
    }
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
      <div
        className="avatar"
        style={{ backgroundImage: resizeAvatar(user.avatar) }}
      >
        <img src={resizeAvatar(user.avatar)} />
      </div>
      <div>
        <h3 className="user-name">{user.name}</h3>
        <p>{user.description}</p>
      </div>
    </UCard>
  );
};

export default UserResult;
