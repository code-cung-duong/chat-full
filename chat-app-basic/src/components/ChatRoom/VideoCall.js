import { PhoneOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import { db } from "../../firebase/Config";

const socket = io.connect("https://huongmin23.herokuapp.com/");
function VideoCall() {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const {
    user: { uid, displayName},
  } = useContext(AuthContext);

  const { isVideoCall, callUserId, setIsVideoCall } =
    useContext(AppContext);

  useEffect(() => {
    if (isVideoCall) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          if (myVideo.current !== undefined) {
            myVideo.current.srcObject = stream;
          }
        });
    }
    socket.on("me", (id) => {
      setMe(id);
      db.collection("callId").doc(uid).set({ uid: id });
    });
    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, [isVideoCall, me]);

  useEffect(()=>{
    if(callUserId !== ''){
        const abc = db.collection('callId').doc(callUserId).onSnapshot((snap)=>{
        const id = snap.data().uid;
        setIdToCall(id);
    })
    return abc;
    }
    
  },[isVideoCall])

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  const hadleCancel = () => {
    setIsVideoCall(false);
    stream?.getTracks().forEach((track) => {
      track.stop();
    });
  };

  return (
    <Modal
      onCancel={hadleCancel}
      width={700}
      title="Gọi video"
      visible={isVideoCall}
      closeIcon={<></>}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className="video-container">
        <div className="video">
          {stream && (
            <>
              <video
                className="videoStream"
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "300px" }}
              />
              <h4>Bạn</h4>
            </>
          )}
        </div>
        <div className="video">
          {callAccepted && !callEnded ? (
            <>
              <video
                className="videoStream"
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "300px" }}
              />
              <h4>Bạn</h4>
            </>
          ) : (
            <>
              <div className="video">
                <video
                  className="videoStream"
                  style={{
                    width: "300px",
                    height: "225px",
                    backgroundColor: "#000",
                  }}
                />
                <h4>Bạn</h4>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="myId">
        <div className="call-button">
          {callAccepted && !callEnded ? (
            <Button onClick={leaveCall}>End Call</Button>
          ) : (
            <Button style={{display: receivingCall && !callAccepted ? 'none' : 'block'}} onClick={() => callUser(idToCall)} icon={<PhoneOutlined />}>
              Gọi ngay
            </Button>
          )}
        </div>
      </div>
      <div>
        {receivingCall && !callAccepted ? (
          <div className="caller">
            <h1 align='center'>{displayName} is calling...</h1>
            <div style={{display:'flex',justifyContent:'center'}} >
            <Button onClick={answerCall}>Answer</Button>
                
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}

export default VideoCall;
