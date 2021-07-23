import Icon, { PhoneOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import Peer from "simple-peer";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import { db } from "../../firebase/Config";
import { EndCallIcon } from "./IconsSVG";

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
  const [callTime, setCallTime] = useState("00:00");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const {
    user: { uid, displayName },
  } = useContext(AuthContext);

  const { isShowVideoCall, userToCall, setIsShowVideoCall, socket } =
    useContext(AppContext);

  useEffect(() => {
    if (isShowVideoCall) {
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
  }, [isShowVideoCall]);

  useEffect(() => {
    if (userToCall.uid !== undefined) {
      const abc = db
        .collection("callId")
        .doc(userToCall.uid)
        .onSnapshot((snap) => {
          const id = snap.data().uid;
          setIdToCall(id);
        });
      return abc;
    }
  }, [isShowVideoCall, userToCall]);

  const [isConnect, setIsConnect] = useState(false);

  const callUser = (id) => {
    setIsConnect(true);
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
        name: displayName,
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

  const peer = useMemo(()=>(new Peer({
    initiator: false,
    trickle: false,
    stream: stream,
  })))

  const answerCall = () => {
    setCallAccepted(true);
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  useEffect(() => {
    if (receivingCall && !callAccepted) {
      setIsShowVideoCall(true);
    }

    if(callEnded){
      setIsShowVideoCall(false);
    }
  }, [receivingCall, isShowVideoCall]);

  useEffect(() => {
    if (callAccepted) {
      var s = 0;
      const interval = setInterval(() => {
        s++;
        var h = Math.floor(s / 60);
        var ss = s % 60 < 10 ? "0" + (s % 60) : s % 60;
        var hh = h < 10 ? "0" + h : h;
        setCallTime(hh + ":" + ss);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [callAccepted]);

  const leaveCall = () => {
    setCallEnded(true);
    setReceivingCall(false)
    setIsConnect(false)
    connectionRef.current.destroy();
    window.location.reload();
  };

  const destroyCall = () => {
    setCallEnded(true);
    setReceivingCall(false);
    window.location.reload();
  };

  const cancleCall = ()=>{
    setIsConnect(false);
    setReceivingCall(false);
    setCallAccepted(false)
    
  }

  const hadleCancel = () => {
    setIsShowVideoCall(false);
    stream?.getTracks().forEach((track) => {
      track.stop();
    });
    window.location.reload();
  };

  return (
    <Modal
      
      onCancel={hadleCancel}
      width={872}
      title="Gọi video"
      visible={isShowVideoCall}
      closeIcon={<></>}
      okButtonProps={{ style: { display: "none" } }}
      footer={null}
      style={{ padding: "0px", overflow:'auto' }}
    >
      <ReactAudioPlayer src="xedap.mp3" className="audioo" crossOrigin="true" />
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
                style={{ width: "400px" }}
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
                style={{ width: "400px" }}
              />
              <h4>{name}</h4>
            </>
          ) : (
            <>
              <div className="video">
                <video
                  className="videoStream"
                  style={{
                    width: "400px",
                    height: "300px",
                    backgroundColor: "#fff",
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="myId">
        <div className="call-button">
          {callAccepted && !callEnded ? (
            <>
              <p style={{ fontWeight: "500", color:'blue',textShadow: '-1px 1px 15px #000000' }}>{callTime}</p>
              
              <Button
                style={{ color: "red", border: "1px solid red" }}
                icon={<Icon component={EndCallIcon} />}
                onClick={leaveCall}
              >
                Kết thúc
              </Button>
            </>
          ) : (
            <>
              {isConnect ? (
                <>
                  <h4>Đang kết nối . . .</h4>
                  <hr></hr>
                  <Button style={{ marginLeft: "10px" }} onClick={cancleCall}>
                    Hủy bỏ
                  </Button>
                </>
              ) : (
                <Button
                  style={{
                    display: receivingCall && !callAccepted ? "none" : "block",
                  }}
                  onClick={() => callUser(idToCall)}
                  icon={<PhoneOutlined />}
                >
                  Gọi ngay
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      <div>
        {receivingCall && !callAccepted ? (
          <div className="caller">
            <h1 align="center">{name} đang gọi ...</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={answerCall}>Trả lời</Button>
              <Button style={{ marginLeft: "10px" }} onClick={destroyCall}>
                Hủy bỏ
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}

export default VideoCall;
