import React from 'react';
import "./SummaryCard.css";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import TagIcon from '@mui/icons-material/Tag';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import FmdBadIcon from '@mui/icons-material/FmdBad';
 
const SummaryCard = ({ title, value }) => {
    let icon;
 
    if (title === "Live Processes") {
      icon = <TagIcon fontSize='large' style={{ 
        color: "#D9DFE9",
        paddingLeft: 10,
      }} />;
    } else if (title === "Time Saved") {
      icon = <ManageHistoryIcon fontSize='large' style={{ 
        color: "#D9DFE9",
        paddingLeft: 10,
      }} />;
    } else if (title === "Unique Submitters") {
      icon = <PersonAddAlt1Icon fontSize='large' style={{ 
        color: "#D9DFE9",
        paddingLeft: 10,
      }} />;
    } else if (title === "Manual Tasks Avoided") {
      icon = <FmdBadIcon fontSize='large' style={{ 
        color: "#D9DFE9",
        paddingLeft: 10,
      }} />;
    }
 
  return (
    <div className="summaryCardContainer">
      <div className="summaryCardContent">
        <div className="summaryCardTitle">{title}</div>
        <div className="summaryCardValue">{value}</div>
      </div>
 
 
      <div className="summaryCardIconAndDivider">
        <div className="summaryCardDivider">
 
        {icon}
 
        </div>
      </div>
    </div>
  );
};
 
export default SummaryCard;