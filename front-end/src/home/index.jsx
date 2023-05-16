import "./home.css";
import React, { useState } from 'react';

import NewsFeed from "./News-feed";
import OrchestratorList from "./Orchestrator-list";




const StartPage = () => {

    return(
        <div className="main-home-container">

            <NewsFeed/>
        
            <div className="sticky-div">
                
                <OrchestratorList />
                
            </div>


        </div>
    )
};

export default StartPage;