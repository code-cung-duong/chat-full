import Icon, {
  FileGifOutlined,
  FormOutlined,
  HomeOutlined,
  Loading3QuartersOutlined,
  SendOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Form, Input, Menu, message, Popover } from "antd";
import { useForm } from "antd/lib/form/Form";
import { delay } from "lodash";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import firebase, { db } from "../../firebase/Config";
import { addDocuments } from "../../firebase/Service";
import UseFirestore from "../../hooks/UseFirestore";
import IImage from "./GifAndIcon/IImage";
import IImageBottom from "./GifAndIcon/IImageBottom";
import IImageCenter from "./GifAndIcon/IImageCenter";
import IImageTop from "./GifAndIcon/IImageTop";
import Image from "./GifAndIcon/Image";
import ImageBottom from "./GifAndIcon/ImageBottom";
import ImageCenter from "./GifAndIcon/ImageCenter";
import ImageTop from "./GifAndIcon/ImageTop";
import IconShow from "./IconShow";
import { InputIcon } from "./IconsSVG";
import ISeen from "./ISeen";
import ISeen2 from "./ISeen2";
import OnTyping from "./OnTyping";
import OutRoom from "./OutRoom";
import Seen from "./Seen";
import SeenCenter from "./SeenCenter";
import IMessageCenter from "./Text//IMessageCenter";
import IMessageTop from "./Text//IMessageTop ";
import Message from "./Text//Message";
import MessageBottom from "./Text//MessageBottom";
import MessageCenter from "./Text//MessageCenter";
import MessageTop from "./Text//MessageTop";
import IMessage from "./Text/IMessage";
import IMessageBottom from "./Text/IMessageBottom";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  box-shadow: -3px 13px 6px -10px rgb(230 230 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }

  .load{
    fontSize: '56px',
    color: '#08c',
    position: 'absolute',
    top: '50%',
    left: '50%'
  }

  .settingIcon{
      font-size: '15px';
  }

  .icon{
    position: absolute;
    bottom: 59px;
    right: 56px;
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px 3px 11px 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  margin-top: 10px;
  width: 96%;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

function ChatWindow() {
  const [form1] = useForm();
  const {
    selectedRoom,
    selectedRoomId,
    setSelectedRoomId,
    setIsInviteMemberVisible,
    setIsShowMembersVisible,
    setIsEditRoomVisible,
    members,
    setIsShowGif,
    setIsShowInputIcon,
    isShowInputIcon,rooms
  } = useContext(AppContext);



  const time = 30;

  const {
    user: { uid, displayName, photoURL },
  } = useContext(AuthContext);

  const inputRef = useRef(null);
  const [isLoadingMes, setIsLoadingMes] = useState(true);
  const messageListRef = useRef(null);
  const [tab, setTab] = useState("");

  const messagesCondition = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoomId,
    };
  }, [selectedRoomId]);

  const messages = UseFirestore("messages", messagesCondition);
  const [isPopup, setIsPopup] = useState('');

  // useEffect(()=>{
  //   const a = db.collection('users').doc(uid).onSnapshot((snap)=>{
  //     const b = snap.data().isPopup;
  //     setIsPopup(b);
  //   })

  //   return a;
  // },[])


  useEffect(() => {
    setIsLoadingMes(true);
    const un = db
      .collection("messages")
      .where("roomId", "==", selectedRoomId)
      .get()
      .then((snap) => {
        snap.docs.map((doc) => {
          const data = doc.data().userSeen.map((m) => m.uid);
          if (!data.includes(uid)) {
            db.collection("messages")
              .doc(doc.id)
              .update({
                userSeen: [
                  ...doc.data().userSeen,
                  {
                    uid: uid,
                    displayName: displayName,
                    photoURL: photoURL,
                    timeSeen: new Date(),
                  },
                ],
              });
          }
        });
      });
    inputRef.current?.focus();
    return un;
  }, [selectedRoomId]);

  const userRef = firebase.firestore().doc("/users/" + uid);

  var isOfflineForFirestore = useMemo(
    () => ({
      status: "c",
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    }),
    []
  );

  var isOnlineForFirestore = useMemo(
    () => ({
      status: "a",
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    }),
    []
  );

  var isAwayForFirestore = useMemo(
    () => ({
      status: "b",
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    }),
    []
  );

  useEffect(() => {
    const abc = firebase
      .database()
      .ref(".info/connected")
      .on("value", function (snapshot) {
        if (snapshot?.val() === false && uid !== undefined) {
          userRef?.update(isOfflineForFirestore);
          return;
        }

        if (uid === undefined && tab === "visible") {
          userRef?.update(isOfflineForFirestore);
        } else if (uid !== undefined && tab !== "hidden") {
          firebase
            .database()
            .ref("/status/" + uid)
            ?.onDisconnect()
            .update(isOfflineForFirestore)
            .then(function () {
              userRef?.update(isOnlineForFirestore);
            });
        }
      });
    return abc;
  }, []);

  window.addEventListener("unload", () => {
    userRef?.update(isOfflineForFirestore);
  });

  const abc = useCallback(() => {
    if (uid === undefined) {
      userRef?.update(isOfflineForFirestore);
    } else if (
      document.visibilityState === "hidden" &&
      tab !== "hidden" &&
      uid !== undefined
    ) {
      userRef?.update(isAwayForFirestore);
      setTab("hidden");
    } else if (
      document.visibilityState === "visible" &&
      tab !== "visible" &&
      uid !== undefined
    ) {
      setTab("visible");
      userRef?.update(isOnlineForFirestore);
    }
  }, [tab]);

  useEffect(() => {
    const un = db
      .collection("messages")
      .where("roomId", "==", selectedRoomId)
      .get()
      .then((snap) => {
        snap.docs.map((doc) => {
          const data = doc.data().userSeen.map((m) => m.uid);
          if (!data.includes(uid) && document.visibilityState === "visible") {
            db.collection("messages")
              .doc(doc.id)
              .update({
                userSeen: [
                  ...doc.data().userSeen,
                  {
                    uid: uid,
                    displayName: displayName,
                    photoURL: photoURL,
                    timeSeen: new Date(),
                  },
                ],
              });
          }
        });
      });
    return un;
  }, [tab]);

  useEffect(() => {
    document.addEventListener("visibilitychange", abc, false);
  }, [abc]);

  useEffect(() => {
    delay(
      () => {
        setIsLoadingMes(false);
      },
      10,
      ""
    );
  }, [messages]);

  useEffect(() => {
    const abc = db
      .collection("notifys")
      .doc(uid)
      .onSnapshot((snap) => {
        const oldData = snap?.data()?.roomId;
        if (selectedRoomId && oldData !== undefined && tab === "visible") {
          db.collection("notifys")
            ?.doc(uid)
            .update({
              roomId: [
                ...Array.from(oldData).filter((u) => u !== selectedRoomId),
              ],
            });
        }
        return abc;
      });
    return abc;
  }, [selectedRoomId, tab]);

  useEffect(() => {
    const abc = db
      .collection("notifys")
      .doc(uid)
      .onSnapshot((snap) => {
        const oldData = snap?.data()?.roomId;
        if (document.visibilityState === "visible") {
          db.collection("notifys")
            ?.doc(uid)
            .update({
              roomId: [
                ...Array.from(oldData).filter((u) => u !== selectedRoomId),
              ],
            });
        }
        return abc;
      });
    return abc;
  }, [selectedRoomId]);

  useLayoutEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  });

  const loadMessage = () => {
    const load = messages.map((ms) => {
      return ms?.uid === uid ? (
        <div key={ms.id}>
          {messages.length === 1 ||
          (messages[ms.index - 1]?.uid !== uid &&
            messages[ms.index + 1]?.uid !== uid) ||
          (messages[ms.index - 1]?.uid !== uid &&
            messages[ms.index + 1]?.createAt?.seconds - ms?.createAt?.seconds >
              time) ||
          (ms.index === 0 &&
            messages[ms.index + 1]?.createAt?.seconds - ms?.createAt?.seconds >
              time) ||
          (ms?.createAt?.seconds - messages[ms.index - 1]?.createAt?.seconds >
            time &&
            messages[ms.index + 1]?.createAt?.seconds - ms?.createAt?.seconds >
              time) ||
          (ms.index === messages.length - 1 &&
            ms?.createAt?.seconds - messages[ms.index - 1]?.createAt?.seconds >
              time) ? (
            <>
              {" "}
              {ms.text.length === 0 && ms?.image.length > 0 ? (
                <IImage
                  photoURL={ms.photoURL}
                  displayName={ms.displayName}
                  createdAt={ms?.createAt}
                  url={ms.image}
                />
              ) : (
                <IMessage
                  text={ms.text}
                  photoURL={ms.photoURL}
                  displayName={ms.displayName}
                  createdAt={ms?.createAt}
                />
              )}
              {ms.userSeen.length === 1 ? (
                <ISeen />
              ) : (
                <>
                  {" "}
                  {ms.id === messages[messages.length - 1].id ? (
                    <Seen
                      users={ms?.userSeen.filter((item) => item.uid !== uid)}
                    />
                  ) : (
                    <>
                      {" "}
                      {ms?.userSeen !== undefined &&
                      messages[ms.index + 1]?.userSeen !== undefined ? (
                        <>
                          {ms.userSeen.length === members.length &&
                          messages[ms.index + 1].userSeen.length <
                            members.length ? (
                            <Seen
                              users={members
                                .filter((d) => d.uid !== uid)
                                .filter(
                                  (e) =>
                                    messages[ms.index + 1]?.userSeen
                                      .map((f) => f.uid)
                                      .includes(e.uid) === false
                                )}
                            />
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}{" "}
                    </>
                  )}{" "}
                </>
              )}{" "}
            </>
          ) : (
            <>
              {" "}
              {(ms.index === 0 &&
                messages[ms.index + 1]?.createAt?.seconds -
                  ms?.createAt?.seconds <
                  time) ||
              (ms.index > 0 &&
                messages[ms.index + 1]?.uid === uid &&
                messages[ms.index + 1]?.createAt?.seconds -
                  ms?.createAt?.seconds <
                  time &&
                ms?.createAt?.seconds -
                  messages[ms.index - 1]?.createAt?.seconds >=
                  time) ||
              (uid !== messages[ms.index - 1]?.uid &&
                messages[ms.index + 1]?.createAt?.seconds -
                  ms?.createAt?.seconds <
                  time) ? (
                <>
                  {" "}
                  {ms.text.length === 0 && ms?.image.length > 0 ? (
                    <IImageTop
                      photoURL={ms.photoURL}
                      displayName={ms.displayName}
                      createdAt={ms?.createAt}
                      url={ms.image}
                    />
                  ) : (
                    <IMessageTop
                      text={ms.text}
                      photoURL={ms.photoURL}
                      displayName={ms.displayName}
                      createdAt={ms?.createAt}
                    />
                  )}
                  {ms.userSeen.length === 1 ? (
                    <ISeen2 />
                  ) : (
                    <>
                      {" "}
                      {ms.id === messages[messages.length - 1].id ? (
                        <SeenCenter
                          users={ms?.userSeen.filter(
                            (item) => item.uid !== uid
                          )}
                        />
                      ) : (
                        <>
                          {" "}
                          {ms?.userSeen !== undefined &&
                          messages[ms.index + 1]?.userSeen !== undefined ? (
                            <>
                              {ms.userSeen.length === members.length &&
                              messages[ms.index + 1].userSeen.length <
                                members.length ? (
                                <SeenCenter
                                  users={members
                                    .filter((d) => d.uid !== uid)
                                    .filter(
                                      (e) =>
                                        messages[ms.index + 1]?.userSeen
                                          .map((f) => f.uid)
                                          .includes(e.uid) === false
                                    )}
                                />
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            <></>
                          )}{" "}
                        </>
                      )}{" "}
                    </>
                  )}{" "}
                </>
              ) : (
                <>
                  {" "}
                  {ms.index >= 1 &&
                  messages[ms.index - 1]?.uid === uid &&
                  messages[ms.index + 1]?.uid === uid &&
                  ms?.id !== messages[message.length - 1]?.id &&
                  messages[ms.index + 1]?.createAt?.seconds -
                    ms?.createAt?.seconds <
                    time &&
                  ms?.createAt?.seconds -
                    messages[ms.index - 1]?.createAt?.seconds <
                    time ? (
                    <>
                      {ms.text.length === 0 && ms?.image.length > 0 ? (
                        <IImageCenter
                          photoURL={ms.photoURL}
                          displayName={ms.displayName}
                          createdAt={ms?.createAt}
                          url={ms.image}
                        />
                      ) : (
                        <IMessageCenter
                          text={ms.text}
                          photoURL={ms.photoURL}
                          displayName={ms.displayName}
                          createdAt={ms?.createAt}
                        />
                      )}
                      {ms.userSeen.length === 1 ? (
                        <ISeen2 />
                      ) : (
                        <>
                          {" "}
                          {ms.id === messages[messages.length - 1].id ? (
                            <SeenCenter
                              users={ms?.userSeen.filter(
                                (item) => item.uid !== uid
                              )}
                            />
                          ) : (
                            <>
                              {" "}
                              {ms?.userSeen !== undefined &&
                              messages[ms.index + 1]?.userSeen !== undefined ? (
                                <>
                                  {ms.userSeen.length === members.length &&
                                  messages[ms.index + 1].userSeen.length <
                                    members.length ? (
                                    <SeenCenter
                                      users={members
                                        .filter((d) => d.uid !== uid)
                                        .filter(
                                          (e) =>
                                            messages[ms.index + 1]?.userSeen
                                              .map((f) => f.uid)
                                              .includes(e.uid) === false
                                        )}
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </>
                              ) : (
                                <></>
                              )}{" "}
                            </>
                          )}{" "}
                        </>
                      )}{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      {ms.text.length === 0 && ms?.image.length > 0 ? (
                        <IImageBottom
                          photoURL={ms.photoURL}
                          displayName={ms.displayName}
                          createdAt={ms?.createAt}
                          url={ms.image}
                        />
                      ) : (
                        <IMessageBottom
                          text={ms.text}
                          photoURL={ms.photoURL}
                          displayName={ms.displayName}
                          createdAt={ms?.createAt}
                        />
                      )}
                      {ms.userSeen.length === 1 ? (
                        <ISeen />
                      ) : (
                        <>
                          {" "}
                          {ms.id === messages[messages.length - 1].id ? (
                            <Seen
                              users={ms?.userSeen.filter(
                                (item) => item.uid !== uid
                              )}
                            />
                          ) : (
                            <>
                              {" "}
                              {ms?.userSeen !== undefined &&
                              messages[ms.index + 1]?.userSeen !== undefined ? (
                                <>
                                  {ms.userSeen.length === members.length &&
                                  messages[ms.index + 1].userSeen.length <
                                    members.length ? (
                                    <Seen
                                      users={members
                                        .filter((d) => d.uid !== uid)
                                        .filter(
                                          (e) =>
                                            messages[ms.index + 1]?.userSeen
                                              .map((f) => f.uid)
                                              .includes(e.uid) === false
                                        )}
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </>
                              ) : (
                                <></>
                              )}{" "}
                            </>
                          )}{" "}
                        </>
                      )}{" "}
                    </>
                  )}{" "}
                </>
              )}{" "}
            </>
          )}{" "}
        </div>
      ) : (
        <div key={ms.id}>
          {messages.length === 1 ||
          (messages[ms.index - 1]?.uid === uid &&
            messages[ms.index + 1]?.uid === uid) ||
          (ms.index === 0 &&
            messages[ms.index + 1]?.createAt?.seconds - ms?.createAt?.seconds >
              time) ||
          (ms?.createAt?.seconds - messages[ms.index - 1]?.createAt?.seconds >
            time &&
            messages[ms.index + 1]?.createAt?.seconds - ms?.createAt?.seconds >
              time) ||
          (ms.index === messages.length - 1 &&
            ms?.createAt?.seconds - messages[ms.index - 1]?.createAt?.seconds >
              time) ||
          (messages[ms.index - 1]?.uid === uid &&
            (messages[ms.index + 1]?.createAt?.seconds - ms?.createAt?.seconds >
              time || ms.index === messages.length - 1 ))  ? (
            <>
              {" "}
              {ms.text.length === 0 && ms?.image.length > 0 ? (
                <Image
                  url={ms.image}
                  photoURL={ms.photoURL}
                  displayName={ms.displayName}
                  createdAt={ms?.createAt}
                />
              ) : (
                <Message
                  text={ms.text}
                  photoURL={ms.photoURL}
                  displayName={ms.displayName}
                  createdAt={ms?.createAt}
                />
              )}
              {ms.id === messages[messages.length - 1].id ? (
                <Seen users={ms?.userSeen.filter((item) => item.uid !== uid)} />
              ) : (
                <>
                  {" "}
                  {ms?.userSeen !== undefined &&
                  messages[ms.index + 1]?.userSeen !== undefined ? (
                    <>
                      {ms.userSeen.length === members.length &&
                      messages[ms.index + 1].userSeen.length <
                        members.length ? (
                        <Seen
                          users={members
                            .filter((d) => d.uid !== uid)
                            .filter(
                              (e) =>
                                messages[ms.index + 1]?.userSeen
                                  .map((f) => f.uid)
                                  .includes(e.uid) === false
                            )}
                        />
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}{" "}
                </>
              )}{" "}
            </>
          ) : (
            <>
              {" "}
              {(ms.index === 0 &&
                messages[ms.index + 1]?.createAt?.seconds -
                  ms?.createAt?.seconds <
                  time) ||
              (ms.index > 0 &&
                messages[ms.index + 1]?.uid !== uid &&
                messages[ms.index + 1]?.createAt?.seconds -
                  ms?.createAt?.seconds <
                  time &&
                ms?.createAt?.seconds -
                  messages[ms.index - 1]?.createAt?.seconds >=
                  time) ||
              (uid === messages[ms.index - 1]?.uid &&
                messages[ms.index + 1]?.createAt?.seconds -
                  ms?.createAt?.seconds <
                  time) ? (
                <>
                  {" "}
                  {ms.text.length === 0 && ms?.image.length > 0 ? (
                    <ImageTop
                      url={ms.image}
                      photoURL={ms.photoURL}
                      displayName={ms.displayName}
                      createdAt={ms?.createAt}
                    />
                  ) : (
                    <MessageTop
                      text={ms.text}
                      photoURL={ms.photoURL}
                      displayName={ms.displayName}
                      createdAt={ms?.createAt}
                    />
                  )}
                  {ms.id === messages[messages.length - 1].id ? (
                    <SeenCenter
                      users={ms?.userSeen.filter((item) => item.uid !== uid)}
                    />
                  ) : (
                    <>
                      {" "}
                      {ms?.userSeen !== undefined &&
                      messages[ms.index + 1]?.userSeen !== undefined ? (
                        <>
                          {ms.userSeen.length === members.length &&
                          messages[ms.index + 1].userSeen.length <
                            members.length ? (
                            <SeenCenter
                              users={members
                                .filter((d) => d.uid !== uid)
                                .filter(
                                  (e) =>
                                    messages[ms.index + 1]?.userSeen
                                      .map((f) => f.uid)
                                      .includes(e.uid) === false
                                )}
                            />
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}{" "}
                    </>
                  )}{" "}
                </>
              ) : (
                <>
                  {" "}
                  {ms.index >= 1 &&
                  messages[ms.index - 1]?.uid !== uid &&
                  messages[ms.index + 1]?.uid !== uid &&
                  ms?.id !== messages[message.length - 1]?.id &&
                  messages[ms.index + 1]?.createAt?.seconds -
                    ms?.createAt?.seconds <
                    time &&
                  ms?.createAt?.seconds -
                    messages[ms.index - 1]?.createAt?.seconds <
                    time ? (
                    <>
                      {" "}
                      {ms.text.length === 0 && ms?.image.length > 0 ? (
                        <ImageCenter
                          url={ms.image}
                          photoURL={ms.photoURL}
                          displayName={ms.displayName}
                          createdAt={ms?.createAt}
                        />
                      ) : (
                        <MessageCenter
                          text={ms.text}
                          photoURL={ms.photoURL}
                          displayName={ms.displayName}
                          createdAt={ms?.createAt}
                        />
                      )}
                      {ms.id === messages[messages.length - 1].id ? (
                        <SeenCenter
                          users={ms?.userSeen.filter(
                            (item) => item.uid !== uid
                          )}
                        />
                      ) : (
                        <>
                          {" "}
                          {ms?.userSeen !== undefined &&
                          messages[ms.index + 1]?.userSeen !== undefined ? (
                            <>
                              {ms.userSeen.length === members.length &&
                              messages[ms.index + 1].userSeen.length <
                                members.length ? (
                                <SeenCenter
                                  users={members
                                    .filter((d) => d.uid !== uid)
                                    .filter(
                                      (e) =>
                                        messages[ms.index + 1]?.userSeen
                                          .map((f) => f.uid)
                                          .includes(e.uid) === false
                                    )}
                                />
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            <></>
                          )}{" "}
                        </>
                      )}{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      {ms.text.length === 0 && ms?.image.length > 0 ? (
                        <ImageBottom
                          url={ms.image}
                          photoURL={ms.photoURL}
                          displayName={ms.displayName}
                          createdAt={ms?.createAt}
                        />
                      ) : (
                        <MessageBottom
                          text={ms.text}
                          photoURL={ms.photoURL}
                          displayName={ms.displayName}
                          createdAt={ms?.createAt}
                        />
                      )}
                      {ms.id === messages[messages.length - 1].id ? (
                        <Seen
                          users={ms?.userSeen.filter(
                            (item) => item.uid !== uid
                          )}
                        />
                      ) : (
                        <>
                          {" "}
                          {ms?.userSeen !== undefined &&
                          messages[ms.index + 1]?.userSeen !== undefined ? (
                            <>
                              {ms.userSeen.length === members.length &&
                              messages[ms.index + 1].userSeen.length <
                                members.length ? (
                                <Seen
                                  users={members
                                    .filter((d) => d.uid !== uid)
                                    .filter(
                                      (e) =>
                                        messages[ms.index + 1]?.userSeen
                                          .map((f) => f.uid)
                                          .includes(e.uid) === false
                                    )}
                                />
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            <></>
                          )}{" "}
                        </>
                      )}{" "}
                    </>
                  )}{" "}
                </>
              )}{" "}
            </>
          )}{" "}
        </div>
      );
    });
    return load;
  };

  useEffect(() => {
    const abc = db
      .collection("notifys")
      .doc(uid)
      .onSnapshot((snap) => {
        const oldData = snap?.data()?.roomId;
        const bb = document.getElementsByClassName("audio")[0];
        if (document.visibilityState !== "visible") {
          bb.play();
          document.title =
            oldData.length === 0
              ? "Fake Messenger"
              : "(" + oldData.length + ") Fake Messenger";
        }

        if (oldData !== undefined) {
          document.title =
            oldData.length === 0
              ? "Fake Messenger"
              : "(" + oldData.length + ") Fake Messenger";
               
          if (true) {
            const last = messages[messages.length - 1];
            const mm = db
              .collection("messages")
              .orderBy("createAt")
              .get()
              .then((snap) => {
                const all = snap.docs.map((doc) => doc.data());
                const last = all[all.length - 1];
                var test = true;
                if (
                  last !== undefined &&
                  last.uid !== uid &&
                  tab !== "visible" &&
                  test
                ) {
                  test = false;
                  var ad = new Notification(
                    last?.text
                      ? last?.displayName + " đã gõ phím"
                      : last?.displayName + " đã thích bạn",
                    {
                      badge:
                        "https://static.xx.fbcdn.net/rsrc.php/ym/r/YQbyhl59TWY.ico",
                      icon: last?.text === "" ? "li.png" : "noty.png",
                      tag:'p',
                      renotify: true,
                      body: last?.text,
                    }
                  );
                  ad.onshow = () => {
                    setTimeout(() => {
                      ad.close();
                    }, 5000);
                  };
                }
              });

            return mm;
          }
        }
        return abc;
      });
    return abc;
  }, []);

  useEffect(()=>{
    if(rooms.find((item)=> item.id === selectedRoomId) === undefined){
      setSelectedRoomId('')
    }
  },[rooms])


  const loadingListMessage = () =>
    isLoadingMes === true ? (
      <Loading3QuartersOutlined
        spin
        style={{
          fontSize: "56px",
          color: "#08c",
          position: "absolute",
          top: "45%",
          left: "50%",
        }}
      />
    ) : (
      <MessageListStyled className="listMessage" ref={messageListRef}>
        {loadMessage()}{" "}
      </MessageListStyled>
    );

  const handleOnSubmit = () => {
    if (form1.getFieldsValue().message?.trim().length) {
      addDocuments("messages", {
        text: form1.getFieldsValue().message,
        image: "",
        uid,
        photoURL,
        displayName,
        roomId: selectedRoomId,
        userSeen: [
          {
            uid: uid,
            displayName: displayName,
            photoURL: photoURL,
            timeSeen: new Date(),
          },
        ],
      });

      members
        ?.filter((u) => u.uid !== uid)
        .forEach((user) => {
          db.collection("notifys")
            ?.doc(user.id)
            .get()
            .then((doc) => {
              db.collection("notifys")
                ?.doc(user.id)
                .update({
                  roomId: [...doc.data().roomId, selectedRoomId],
                  createAt: firebase.firestore.FieldValue.serverTimestamp(),
                });
            });
        });

      db.collection("rooms")
        .doc(selectedRoomId)
        .update({
          isTyping: [...selectedRoom.isTyping.filter((d) => d.uid !== uid)],
        });

      form1.setFieldsValue({ message: "" });
      inputRef.current.focus();
    }
  };
  const sendTym = (e) => {
    addDocuments("messages", {
      text: "",
      image: e.target.currentSrc,
      uid,
      photoURL,
      displayName,
      roomId: selectedRoomId,
      userSeen: [
        {
          uid: uid,
          displayName: displayName,
          photoURL: photoURL,
          timeSeen: new Date(),
        },
      ],
    });

    members
      ?.filter((u) => u.uid !== uid)
      .forEach((user) => {
        db.collection("notifys")
          ?.doc(user.id)
          .get()
          .then((doc) => {
            db.collection("notifys")
              ?.doc(user.id)
              .update({
                roomId: [...doc.data().roomId, selectedRoomId],
                createAt: firebase.firestore.FieldValue.serverTimestamp(),
              });
          });
      });

    db.collection("rooms")
      .doc(selectedRoomId)
      .update({
        isTyping: [...selectedRoom.isTyping.filter((d) => d.uid !== uid)],
      });

    inputRef.current.focus();
  };

  var timer;

  const handleOnChange = useCallback(
    (e) => {
      if (e.target.value !== "") {
        db.collection("rooms")
          .doc(selectedRoomId)
          .get()
          .then((snap) => {
            const old = snap.data().isTyping;

            db.collection("rooms")
              .doc(selectedRoomId)
              .update({
                isTyping: [
                  ...old.filter((d) => d.uid !== uid),
                  {
                    uid: uid,
                    displayName: displayName,
                    photoURL: photoURL,
                  },
                ],
              });
          });
      }

      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        db.collection("rooms")
          .doc(selectedRoomId)
          .update({
            isTyping: [...selectedRoom.isTyping.filter((d) => d.uid === uid)],
          });
      }, 1000);
    },
    [selectedRoomId]
  );

  useEffect(() => {
    const un = db
      .collection("messages")
      .where("roomId", "==", selectedRoomId)
      .get()
      .then((snap) => {
        snap.docs.map((doc) => {
          const data = doc.data().userSeen.map((m) => m.uid);
          if (!data.includes(uid) && document.visibilityState === "visible") {
            db.collection("messages")
              .doc(doc.id)
              .update({
                userSeen: [
                  ...doc.data().userSeen,
                  {
                    uid: uid,
                    displayName: displayName,
                    photoURL: photoURL,
                    timeSeen: new Date(),
                  },
                ],
              });
          }
        });
      });
    return un;
  }, [messages]);

  const menu = useMemo(
    () => (
      <Menu>
        <Menu.Item
          onClick={() => setSelectedRoomId("")}
          icon={<HomeOutlined />}
          key="3"
        >
          Trang chủ
        </Menu.Item>
        <Menu.Item
          onClick={() => setIsEditRoomVisible(true)}
          icon={<FormOutlined />}
          key="1"
        >
          Đổi thông tin nhóm
        </Menu.Item>
        <Menu.Item
          onClick={() => setIsShowMembersVisible(true)}
          icon={<UserOutlined />}
          key="4"
        >
          Xem thành viên
        </Menu.Item>
        <Menu.Item
          onClick={() => setIsInviteMemberVisible(true)}
          icon={<UsergroupAddOutlined />}
          key="2"
        >
          Thêm bạn bè
        </Menu.Item>

        <OutRoom />
      </Menu>
    ),
    [setIsShowMembersVisible, setIsInviteMemberVisible, setSelectedRoomId]
  );

  const noSelectRoom = () => (
    // <iframe style={
    //     {
    //         width: '100%',
    //         height: '100%',
    //         bordered: 'none',
    //         border: '0'

    //     }
    // }
    //     src="https://code-cung-duong.github.io/2048g/"
    //     title="Chào bạn Hương Min nhé 🥰🥰🥰"></iframe>
    // <IconShow />
    <div></div>
  );

  const sendForm = () => (
    <span style={{ display: "flex" }}>
      <Button
        style={{
          width: "40px",
          color: "blue",
          border: "none",
          marginTop: "13px",
        }}
        icon={<FileGifOutlined style={{ fontSize: "15pt" }} />}
        onClick={() => setIsShowGif(true)}
      ></Button>
      <FormStyled width="500px" form={form1}>
        <Form.Item name="message">
          <Input
            ref={inputRef}
            onChange={handleOnChange}
            onPressEnter={handleOnSubmit}
            placeholder="Aa..."
            bordered={false}
            autoComplete="off"
            name="message"
          />
        </Form.Item>

        <Button
          ghost
          style={{
            width: "40px",
            color: "blue",
            border: "none",
            outline: "none",
            padding: "4px",
          }}
          icon={<Icon component={InputIcon} />}
          onClick={() => setIsShowInputIcon(true)}
        ></Button>

        <Popover
          placement="topRight"
          title={null}
          content={<IconShow />}
          style={{
            backgroundColor: "#8d949e",
            position: "absolute",
            top: "20px",
          }}
          trigger="click"
          visible={isShowInputIcon}
          onVisibleChange={() => setIsShowInputIcon(false)}
        ></Popover>
      </FormStyled>
      {form1.getFieldsValue().message !== "" ||
      form1.getFieldsValue() === "" ? (
        <Button
          ghost
          style={{
            marginTop: "13px",
            width: "40px",
            color: "blue",
          }}
          icon={<SendOutlined style={{ fontSize: "15pt" }} />}
          onClick={handleOnSubmit}
        ></Button>
      ) : (
        <img
          className="tim"
          style={{
            width: "30px",
            height: "30px",
            marginTop: "13px",
            marginLeft: "10px",
          }}
          onClick={(e) => sendTym(e)}
          src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf2/1.5/28/2764.png"
          alt=""
        />
      )}
    </span>
  );

  const [uTyping, setUTyping] = useState([]);

  useEffect(() => {
    var a = null;
    if (selectedRoomId) {
      a = db
        .collection("rooms")
        .doc(selectedRoomId)
        .onSnapshot((snap) => {
          const data = snap.data().isTyping;
          setUTyping(data);
        });
    }
    return a;
  }, [selectedRoomId]);

  const allTyping = () => (
    <>
      {" "}
      {uTyping
        ?.filter((d) => d.uid !== uid)
        .map((m) => (
          <OnTyping
            key={m.uid}
            photoURL={m.photoURL}
            displayName={m.displayName}
          />
        ))}{" "}
    </>
  );

  const mainLayout = () => (
    <WrapperStyled>
      <HeaderStyled>
        <div className="header__info">
          <p className="header__title">
            {!selectedRoom ? "" : selectedRoom.name}
          </p>
          <span className="header__description">
            {!selectedRoom ? "" : selectedRoom.description}
          </span>
        </div>
        <ButtonGroupStyled>
          <Dropdown.Button
            style={{ bordered: "none" }}
            icon={<SettingOutlined />}
            overlay={menu}
          ></Dropdown.Button>
        </ButtonGroupStyled>
      </HeaderStyled>

      <ContentStyled>
        {" "}
        {loadingListMessage()}
        {allTyping()}
        {sendForm()}
      </ContentStyled>
    </WrapperStyled>
  );

  return (
    <>
      <ReactAudioPlayer
        src="mess.mp3"
        className="audio"
        crossOrigin="true"
      />{" "}
      {selectedRoomId ? <>{mainLayout()}</> : <>{noSelectRoom()}</>}
    </>
  );
}
export default ChatWindow;
