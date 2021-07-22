import { Tooltip } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { formatRelative } from 'date-fns';
import { vi } from 'date-fns/locale';
import React from 'react';
import styled from 'styled-components';


const Div1Styled = styled.div`
  margin-bottom: 17px;
  margin-left: 5px;
  display: flex;
  width: 900px;
  justify-content:flex-start;
  align-items: flex-end;

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {  
    overflow-y: visible;
    color: #123;
    max-width: 400px;
    min-width: 20px;
    word-wrap:break-word;
    font-size: 15px;
    text-align: justify;
  }

  .img{
    border-radius: 20px;
    border: 1px solid #ddd;
  }
`;

const Div2Styled = styled.div`
  magrin: 5px;
  padding-right: 15px;
`;

const Div3Styled = styled.div`
    max-width: 800px;
    
    min-width: 40px;
    text-align: justify;
`;

function formatDate(seconds) {
    let formattedDate = '';
    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date(), {locale: vi});
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
}


function Image({ url, photoURL, displayName, createdAt }) {

    return (
        <Div1Styled>
            <Div2Styled>
                <Tooltip title={displayName}
                    placement="left">
                    <Avatar size='default'
                        src={photoURL}>
                        {
                            photoURL ? '' : displayName.charAt(0)
                        } </Avatar>
                </Tooltip>
            </Div2Styled>
            <Div3Styled>
                <Tooltip placement="left" style={{marginLeft: '10px'}}
                    title={
                        formatDate(createdAt?.seconds)
                    }>
                    <img style={url?.startsWith('https://static.xx.fbcdn.net/images/emoji.php') ? {border:'0px', borderRadius:'0px'}: {}} className="img" src={url} alt="GIF"/>
                </Tooltip>
            </Div3Styled>
        </Div1Styled>
    );
}

export default Image;
