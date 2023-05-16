

import "./Orchestrator-list.css"
import items from './items.json'; // import the local JSON file
import React, { useState, useEffect } from 'react';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import SmartToyIcon from '@mui/icons-material/SmartToy';


function OrchestratorList() {
    const [apiItems, setApiItems] = useState([]);
  
    useEffect(() => {
      
      setApiItems([...items.value].reverse());
    }, []);
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };
    
  
    return (
  <div>

    <div className="rpa-logo">
        <span className="rpa-logo-text">RPA</span>
    </div>

    <div className="rpa-container">
        <h1>Robotic Process Automation</h1>
        <span>Connect with the RPA community  
            
            <span className="icon-container">
            <SmartToyIcon style={{ color: '#303841' }} />
            </span>

        </span>
      <div className="rpa-button-container">
        <a href="https://connext.conti.de/communities/service/html/communitystart?communityUuid=3f240021-84a5-46cc-8542-d40e7f899c1e" target="_blank" rel="noopener noreferrer"> 
        <button className="connext-button">Connext</button>
        </a>
        <a href="https://teams.microsoft.com/l/team/19%3a627007ecba374e07b4f423577e22aed8%40thread.skype/conversations?groupId=1e114a19-f5ce-47a1-b617-bc29b40a265d&tenantId=8d4b558f-7b2e-40ba-ad1f-e04d79e6265a" target="_blank" rel="noopener noreferrer"> 
        <button className="connext-button">Teams</button>
        </a>
      </div>

    </div>

    <h3>5 latest Robotics jobs:</h3>
    <ul>
        {apiItems.map(item => (
          <li key={item.Key}>
            <div className="item-wrapper">
              <div className="item-content">
                <div>{item.ReleaseName}</div>
                <div>{item.State}</div>
                <div>{formatDate(item.EndTime)}</div>
              </div>

              {item.State === 'Running' ? (
                <ScheduleSendIcon className='item-icon' />
              ) : item.State === 'Successful' ? (
                <CheckCircleIcon className='item-icon' style= {{ color: '#99C794', fontSize: '32px' }}/>
              ) : item.State === 'Stopped' ? (
                <CancelScheduleSendIcon className='item-icon' style= {{ color: '#FBB058', fontSize: '32px' }}/>
              ) : item.State === 'Faulted' ? (
                <DisabledByDefaultIcon className='item-icon' style= {{ color: '#ED6167', fontSize: '32px' }} />
              ) : (
                <CancelScheduleSendIcon className='item-icon' color='primary'/>
              )}
            </div>
          </li>
        ))}
      </ul>

      <img src={require("./Footer image.png")} alt="Header" style={{ width: "83%", height: "auto"}}/>

  </div>
    );
  }
  
  export default OrchestratorList;
  