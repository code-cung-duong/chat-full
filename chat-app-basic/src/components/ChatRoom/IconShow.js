import { useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import firebase , { db } from "../../firebase/Config";
import { addDocuments } from "../../firebase/Service";

const DivStyle = styled.div`
  height: 321px;
  overflow-y: auto;
  width: 315px;
  overflow-x: hidden;
  background-color: #fff;
  border-radius: 5px;


  .haha {
    width: 350px;
    overflow: hidden;
    
  }
  .haha ::-webkit-scrollbar {
    display: none;
  }

  .qypqp5cg {
    display: flex;
    user-select: none;

  }

  .aov4n071 {
    color: #8d949e;
    cursor: default;
    font-weight: normal;
    padding: 0 8px 4px;
  }
  .aov4n071:nth-child(1) {
    padding: 10px 0 8px 4px;
  }
  img {
    padding: 4px;
    box-sizing: border-box;
    width: 35px;
    height: 35px;
  }

  img:hover {
    background-color: #eef;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
  }

  ::-webkit-scrollbar {
    width: 5px;
`;

export default function IconShow() {
  const {
    user: { uid, displayName, photoURL },
  } = useContext(AuthContext);
  const { selectedRoomId, members, setIsShowInputIcon, isShowInputIcon } =
    useContext(AppContext);
  const all = document.getElementsByTagName("img");
  useEffect(() => {
    for (var i = 0; i < all.length; i++) {
      all[i].addEventListener("click", (a) => {
        addDocuments('messages', {
            text: "",
            image: a.srcElement.currentSrc,
            uid,
            photoURL,
            displayName,
            roomId: selectedRoomId,
            userSeen: [
                {
                    uid: uid,
                    displayName: displayName,
                    photoURL: photoURL,
                    timeSeen: new Date()
                }
            ]
        });

        members?.filter((u) => u.uid !== uid).forEach((user) => {
            db.collection('notifys')?.doc(user.id).get().then((doc) => {
                db.collection('notifys')?.doc(user.id).update({
                    roomId: [
                        ...doc.data().roomId,
                        selectedRoomId
                    ],
                    createAt: firebase.firestore.FieldValue.serverTimestamp()
                })
            });
        })
        setIsShowInputIcon(false);
      });
    }

  }, []);


  const allData = ()=>(
    <DivStyle
    className="haha"
    aria-label="Chọn biểu tượng cảm xúc"
    role="grid"
  >
    <div>
      <div
        className="haha"
        aria-label="Mặt cười & hình người"
        role="rowgroup"
      >
        <div className="aov4n071">Mặt cười &amp; hình người</div>
        <div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😀"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t5f/1.5/30/1f600.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😃"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te2/1.5/30/1f603.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😄"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t63/1.5/30/1f604.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😁"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te0/1.5/30/1f601.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😆"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t65/1.5/30/1f606.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😅"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te4/1.5/30/1f605.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😂"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t61/1.5/30/1f602.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤣"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te3/1.5/30/1f923.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="☺️"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t4a/1.5/30/263a.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😊"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t10/1.5/30/1f60a.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😇"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te6/1.5/30/1f607.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🙂"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tdd/1.5/30/1f642.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🙃"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t5e/1.5/30/1f643.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😉"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te8/1.5/30/1f609.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😌"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t12/1.5/30/1f60c.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😍"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t93/1.5/30/1f60d.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🥰"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t7b/1.5/30/1f970.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😘"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t6/1.5/30/1f618.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😗"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t85/1.5/30/1f617.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😙"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t87/1.5/30/1f619.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😚"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/taf/1.5/30/1f61a.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😋"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t91/1.5/30/1f60b.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😛"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t30/1.5/30/1f61b.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😝"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t32/1.5/30/1f61d.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😜"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb1/1.5/30/1f61c.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤪"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t11/1.5/30/1f92a.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤨"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t68/1.5/30/1f928.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🧐"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t6e/1.5/30/1f9d0.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤓"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t44/1.5/30/1f913.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😎"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t14/1.5/30/1f60e.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤩"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te9/1.5/30/1f929.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🥳"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tfe/1.5/30/1f973.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😏"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t95/1.5/30/1f60f.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😒"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t0/1.5/30/1f612.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😞"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb3/1.5/30/1f61e.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😔"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t2/1.5/30/1f614.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😟"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t34/1.5/30/1f61f.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😕"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t83/1.5/30/1f615.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🙁"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t5c/1.5/30/1f641.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="☹️"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t22/1.5/30/2639.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😣"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t20/1.5/30/1f623.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😖"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t4/1.5/30/1f616.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😫"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tcf/1.5/30/1f62b.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😩"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t26/1.5/30/1f629.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🥺"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t2c/1.5/30/1f97a.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😢"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t9f/1.5/30/1f622.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😭"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/td1/1.5/30/1f62d.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😤"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/ta1/1.5/30/1f624.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😠"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t9d/1.5/30/1f620.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😡"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t1e/1.5/30/1f621.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤬"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t13/1.5/30/1f92c.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤯"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t96/1.5/30/1f92f.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😳"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tbf/1.5/30/1f633.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🥵"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t0/1.5/30/1f975.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🥶"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t81/1.5/30/1f976.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😱"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tbd/1.5/30/1f631.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😨"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/ta5/1.5/30/1f628.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😰"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t3c/1.5/30/1f630.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😥"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t22/1.5/30/1f625.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😓"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t81/1.5/30/1f613.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤗"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t48/1.5/30/1f917.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤔"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tc5/1.5/30/1f914.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤭"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t94/1.5/30/1f92d.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤫"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t92/1.5/30/1f92b.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤥"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te5/1.5/30/1f925.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😶"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t42/1.5/30/1f636.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😐"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tfe/1.5/30/1f610.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😑"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t7f/1.5/30/1f611.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😬"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1.5/30/1f62c.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🙄"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tdf/1.5/30/1f644.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😯"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/td3/1.5/30/1f62f.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😦"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/ta3/1.5/30/1f626.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😧"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t24/1.5/30/1f627.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😮"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t52/1.5/30/1f62e.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😲"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t3e/1.5/30/1f632.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🥱"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tfc/1.5/30/1f971.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😴"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t40/1.5/30/1f634.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤤"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t64/1.5/30/1f924.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😪"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t4e/1.5/30/1f62a.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😵"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tc1/1.5/30/1f635.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤐"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tc1/1.5/30/1f910.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🥴"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t7f/1.5/30/1f974.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤢"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t62/1.5/30/1f922.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤮"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t15/1.5/30/1f92e.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤧"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te7/1.5/30/1f927.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😷"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tc3/1.5/30/1f637.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤒"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tc3/1.5/30/1f912.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤕"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t46/1.5/30/1f915.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤑"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t42/1.5/30/1f911.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤠"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t60/1.5/30/1f920.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😈"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t67/1.5/30/1f608.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👿"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t6c/1.5/30/1f47f.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👹"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tbf/1.5/30/1f479.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👺"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te7/1.5/30/1f47a.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤡"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te1/1.5/30/1f921.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="💩"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/td5/1.5/30/1f4a9.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👻"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t68/1.5/30/1f47b.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="💀"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/td5/1.5/30/1f480.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="☠️"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tfa/1.5/30/2620.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👽"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t6a/1.5/30/1f47d.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👾"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/teb/1.5/30/1f47e.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤖"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tc7/1.5/30/1f916.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🎃"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t17/1.5/30/1f383.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😺"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/ted/1.5/30/1f63a.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😸"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t44/1.5/30/1f638.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😹"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tc5/1.5/30/1f639.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😻"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t6e/1.5/30/1f63b.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😼"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tef/1.5/30/1f63c.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😽"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t70/1.5/30/1f63d.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🙀"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tdb/1.5/30/1f640.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😿"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t72/1.5/30/1f63f.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="😾"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf1/1.5/30/1f63e.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤲"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t1/1.5/30/1f932.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👐"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf8/1.5/30/1f450.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🙌"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t8e/1.5/30/1f64c.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👏"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t8f/1.5/30/1f44f.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤝"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf5/1.5/30/1f91d.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👍"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t8d/1.5/30/1f44d.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👎"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te/1.5/30/1f44e.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👊"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/ta/1.5/30/1f44a.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="✊"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tae/1.5/30/270a.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤛"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf3/1.5/30/1f91b.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤜"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t74/1.5/30/1f91c.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤞"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t76/1.5/30/1f91e.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="✌️"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb0/1.5/30/270c.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤟"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf7/1.5/30/1f91f.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤘"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tc9/1.5/30/1f918.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👌"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tc/1.5/30/1f44c.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤏"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t58/1.5/30/1f90f.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👈"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t61/1.5/30/1f448.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👉"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te2/1.5/30/1f449.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👆"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t5f/1.5/30/1f446.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👇"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te0/1.5/30/1f447.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="☝️"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t8f/1.5/30/261d.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="✋"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t2f/1.5/30/270b.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤚"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t72/1.5/30/1f91a.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🖐"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb5/1.5/30/1f590.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🖖"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tbb/1.5/30/1f596.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👋"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t8b/1.5/30/1f44b.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🤙"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t4a/1.5/30/1f919.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="💪"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tfd/1.5/30/1f4aa.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🦾"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/te5/1.5/30/1f9be.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🖕"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t3a/1.5/30/1f595.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="✍️"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t31/1.5/30/270d.png"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="qypqp5cg" role="row">
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🙏"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t11/1.5/30/1f64f.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🦶"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t36/1.5/30/1f9b6.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🦵"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb5/1.5/30/1f9b5.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🦿"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t66/1.5/30/1f9bf.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="💄"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/td9/1.5/30/1f484.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="💋"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t7/1.5/30/1f48b.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="👄"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/t5d/1.5/30/1f444.png"
                  />
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "2px", marginRight: "2px" }}>
              <div>
                <span className="pq6dq46d">
                  <img
                    height={30}
                    width={30}
                    alt="🦷"
                    referrerPolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb7/1.5/30/1f9b7.png"
                  />
                </span>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  </DivStyle>
  )

  return (
    <div>
      {allData()}
    </div>
  );
}
