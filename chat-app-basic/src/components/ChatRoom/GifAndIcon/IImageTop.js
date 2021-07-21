import { Tooltip } from 'antd';
import { formatRelative } from 'date-fns';
import { vi } from 'date-fns/locale';
import React from 'react';
import styled from 'styled-components';


const Div1Styled = styled.div`
  margin-bottom: 3px;
  margin-left: 9px;
  display: flex;
  width: 99%;
  justify-content:flex-end;
  position: relative;
  align-items: center;

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    overflow-y: visible;
    color: #fff;
    max-width: 400px;
    min-width: 20px;
    word-wrap:break-word;
    font-size: 15px;
    text-align: justify;
  }

  .ant-tooltip-inner{
      magrin-left: -20px;
  }

  .ant-avatar{
      margin: 1px;
  }

  .img{
    border-radius: 20px 20px 10px 20px;
    border: 1px solid #ddd;
  }
`;


const Div3Styled = styled.div`
max-width: 800px;

min-width: 40px;
text-align: justify;
margin-right: 15px;
`;

function formatDate(seconds) {
    let formattedDate = '';
    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date(), { locale: vi });
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
}


function IImageTop({ url, createdAt }) {
    return (
        <Div1Styled>
            <Div3Styled>
                <Tooltip placement="left"
                    title={
                        formatDate(createdAt?.seconds)
                    }>
                    <img style={url?.startsWith('https://static.xx.fbcdn.net/images/emoji.php') ? {border:'0px', borderRadius:'0px'}: {}} className="img" src={url} alt="GIF"/>
                </Tooltip>
            </Div3Styled>

        </Div1Styled>

    );
}

export default IImageTop;
