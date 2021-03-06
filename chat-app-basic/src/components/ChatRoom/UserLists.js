import Icon from "@ant-design/icons";
import { Avatar, Collapse, Dropdown, Menu, Tooltip, Typography } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import { formatDistance } from "date-fns";
import { vi } from "date-fns/locale";
import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import UseFirestore from "../../hooks/UseFirestore";
import { OfflineSVG, OnlineSVG } from "./IconsSVG";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header {
      color: blue;
      font-weight: 500;
      user-select: none;
    }
    p {
      font-weight: 500;
      color: gray;
    }

    .ant-collapse-content-box {
      padding: 0 30px;
      max-height: 290px;
      overflow-y: auto;
    }

    .add-room {
      color: #123;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: blue;
`;

const DivStyled = styled.div`
  display: flex;
  margin: 15px 10px 10px 0px;
  position: relative;
  .user {
    color: #123;
    margin-left: 10px;
  }
  .status {
    color: blue;
    position: absolute;
    right: 8%;
  }

  .tb {
    position: absolute;
    top: 2px;
    left: 105%;
  }
  .tb2 {
    float: right;
    position: absolute;
    right: -10%;
    user-select: none;
  }
`;

const CollapseStyled = styled(Collapse)`
  border-bottom: 1px solid #ccc;
  box-shadow: 0px 9px 7px -9px #ccc;
`;

function UserLists() {
  const {
    user: { uid },
  } = useContext(AuthContext);

  const users = UseFirestore("users", "");
  const { 
    setIsShowVideoCall,
    setUserToCall, setIsShowMembersVisible } =
    useContext(AppContext);

  function formatDate(seconds) {
    let formattedDate = "";
    if (seconds) {
      formattedDate = formatDistance(new Date(seconds * 1000), new Date(), {
        addSuffix: true,
        locale: vi,
      });
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      formattedDate = formattedDate.replace("minutes", "ph??t");
      formattedDate = formattedDate.replace("hours", "gi???");
      formattedDate = formattedDate.replace("ago", "tr?????c");
      formattedDate = formattedDate.replace("tr?????c", "");
      formattedDate = formattedDate.replace("day", "ng??y");
      formattedDate = formattedDate.replace("hour", "gi???");
      formattedDate = formattedDate.replace("Kho???ng", "");
      formattedDate = formattedDate.replace("D?????i", "");
    }
    return formattedDate;
  }

  const handleCall = (user) => {
    setIsShowVideoCall(true);
    setUserToCall(user);
    setIsShowMembersVisible(false);
  };

  const menu = (user) => (
    <Menu>
      <MenuItem onClick={() => handleCall(user)}>G???i video</MenuItem>
    </Menu>
  );

  return (
    <CollapseStyled defaultActiveKey="1" ghost>
      <PanelStyled header="Danh s??ch b???n b??" key="1">
        {Array.from(users)
          .filter((user) => user.uid !== uid)
          .map((user) => {
            return (
              <DivStyled key={user.uid}>
                <Avatar size="small" src={user.photoURL}>
                  {user.photoURL ? "" : user.displayName.charAt(0)}
                </Avatar>
                <Dropdown overlay={menu(user)} placement="bottomCenter" arrow>
                  <LinkStyled className="user">{user.displayName}</LinkStyled>
                </Dropdown>
                {user.status === "a" ? (
                  <Tooltip title="Online" placement="right">
                    <Icon className="tb" component={OnlineSVG} />
                  </Tooltip>
                ) : (
                  <></>
                )}
                {user.status === "c" ? (
                  <Tooltip
                    placement="right"
                    title={
                      "Ho???t ?????ng " +
                      formatDate(user.last_changed.seconds) +
                      " tr?????c"
                    }
                  >
                    <p className="tb2">
                      {formatDate(user.last_changed.seconds)}
                    </p>
                  </Tooltip>
                ) : (
                  <></>
                )}
                {user.status === "b" ? (
                  <Tooltip title="Sleep" placement="right">
                    <Icon className="tb" component={OfflineSVG} />
                  </Tooltip>
                ) : (
                  <></>
                )}{" "}
              </DivStyled>
            );
          })}{" "}
      </PanelStyled>
    </CollapseStyled>
  );
}

export default UserLists;
