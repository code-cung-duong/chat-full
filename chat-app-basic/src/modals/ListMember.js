import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Popconfirm, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import MenuItem from "antd/lib/menu/MenuItem";
import Modal from "antd/lib/modal/Modal";
import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppProvider";
import { AuthContext } from "../context/AuthProvider";
import { db } from "../firebase/Config";

const LinkStyled = styled(Typography.Text)`
  display: block;
  margin-bottom: 5px;
  color: blue;
`;

const DivStyled = styled.div`
  display: flex;
  margin: 15px 10px 10px 0px;
  align-item: center;
  .user {
    color: #123;
    margin: 7px 15px 9px 15px;
    font-weight: 500;
  }
  .status {
    color: #123;
    position: absolute;
    right: 8%;
  }
  p {
    margin-top: 6px;
  }

  .baChamIcon {
    font-size: "15pt";
    margin-top: "3px";
  }
`;

export default function ListMember() {
  const {
    members,
    selectedRoom,
    selectedRoomId,
    setIsShowMembersVisible,
    isShowMembersVisible,
  } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const handleOk = () => {
    setIsShowMembersVisible(false);
  };

  const chagePermission = useCallback(
    (uid) => {
      db.collection("rooms")
        .doc(selectedRoomId)
        .update({
          ...selectedRoom,
          admin: uid,
        });
    },
    [isShowMembersVisible]
  );

  const kick = useCallback(
    (uid) => {
      db.collection("rooms")
        .doc(selectedRoomId)
        .update({
          ...selectedRoom,
          members: selectedRoom.members?.filter((d) => d !== uid),
        });
    },
    [isShowMembersVisible]
  );

  const menuEnable = (user) => (
    <Menu>
      <Popconfirm
        arrowContent={<></>}
        title={user.displayName + " sẽ là quản trị viên mới ?"}
        placement="topRight"
        onConfirm={() => chagePermission(user.uid)}
        okText="Đúng"
        cancelText="Không"
      >
        <MenuItem>Chuyển quản trị viên</MenuItem>
      </Popconfirm>
      <Popconfirm
        arrowContent={<></>}
        title={"Bạn muốn loại " + user.displayName + " khỏi nhóm ?"}
        placement="topRight"
        onConfirm={() => kick(user.uid)}
        okText="Đúng"
        cancelText="Không"
      >
        <MenuItem>Loại thành viên</MenuItem>
      </Popconfirm>
    </Menu>
  );

  const menuDisable = () => (
    <Menu>
      <MenuItem disabled>Chuyển quản trị viên</MenuItem>
      <MenuItem disabled>Loại thành viên</MenuItem>
    </Menu>
  );

  return (
    <Modal
      closeIcon={<></>}
      closable={false}
      title={"Danh sách thành viên (" + Array.from(members).length + ")"}
      visible={isShowMembersVisible}
      onCancel={handleOk}
      onOk={handleOk}
      okButtonProps={{ style: { display: "none" } }}
    >
      {Array.from(members).map((user) => (
        <DivStyled key={user.uid}>
          <Avatar size="large" src={user.photoURL}>
            {user.photoURL ? "" : user.displayName.charAt(0)}
          </Avatar>
          <LinkStyled className="user">
            {uid === user.uid ? "Bạn" : user.displayName}
            {user.uid === selectedRoom.admin ? (
              <span color="blue"> ( Quản trị viên )</span>
            ) : (
              <></>
            )}
          </LinkStyled>
          {
            <Dropdown
              overlay={
                uid === selectedRoom.admin ? menuEnable(user) : menuDisable()
              }
              placement="bottomRight"
            >
              <Button
                style={{
                  borderRadius: "50%",
                  float: "right",
                  position: "absolute",
                  left: "85%",
                  marginTop: "2px",
                }}
                icon={
                  user.uid !== uid ? (
                    <EllipsisOutlined size={40} className="baChamIcon" />
                  ) : (
                    <></>
                  )
                }
              ></Button>
            </Dropdown>
          }
          {}{" "}
        </DivStyled>
      ))}{" "}
    </Modal>
  );
}
