import React, { useContext, useMemo, useState } from "react";
import { io } from "socket.io-client";
import UseFirestore from "../hooks/UseFirestore";
import { AuthContext } from "./AuthProvider";
export const AppContext = React.createContext();

function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isShowMembersVisible, setIsShowMembersVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [isEditRoomVisible, setIsEditRoomVisible] = useState(false);
  const [isShowGif, setIsShowGif] = useState(false);
  const [isShowInputIcon, setIsShowInputIcon] = useState(false);
  const [isShowVideoCall, setIsShowVideoCall] = useState(false);
  const [userToCall, setUserToCall] = useState({});
  const socket = io.connect("https://huongmin23.herokuapp.com/");

  const {
    user: { uid },
  } = useContext(AuthContext);

  const roomCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = UseFirestore("rooms", roomCondition);

  const selectedRoom = useMemo(
    () => Array.from(rooms).find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const memberCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = UseFirestore("users", memberCondition);

  const clearState = () => {
    setSelectedRoomId("");
    setIsAddRoomVisible(false);
    setIsInviteMemberVisible(false);
    setInterval(() => {
      window.location.reload();
    }, 50);
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        members,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        clearState,
        isShowMembersVisible,
        setIsShowMembersVisible,
        isEditRoomVisible,
        setIsEditRoomVisible,
        isShowGif,
        setIsShowGif,
        isShowInputIcon,
        setIsShowInputIcon,
        socket,
        isShowVideoCall,
        setIsShowVideoCall,
        userToCall,
        setUserToCall,
      }}
    >
      {children}{" "}
    </AppContext.Provider>
  );
}
export default AppProvider;
