import React from "react";
import SummaryCard from "./SummaryCard";
import LineChartComponent from "./LineChart";
import BubbleChartComponent from "./BubbleChart";
import DataTable from './DataTable';
import { Button } from "@mui/material";
import data from './data.json'
import "./dashboard.css";



class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: data,
        activeSheet: 'Live Processes',
      };
      this.switchSheet = this.switchSheet.bind(this);
    }
  
    switchSheet(sheet) {
      this.setState({ activeSheet: sheet });
    }
  
    render() {
        const { data, activeSheet } = this.state;
      
        const sheetData = data[activeSheet];
      
        return (
          <div>
            <div className="dashboardContainer">
            <div className="headerContainer">
                <h1>Dashboard</h1>
                <div className="sheetsContainer">
                    
                    <Button
                        size="medium"
                        style={{
                            backgroundColor: activeSheet === 'Live Processes' ? '#303841' : '#acafb3',
                            color: '#D9DFE9',
                        }}
                        variant="contained"
                        onClick={() => this.switchSheet('Live Processes')}
                        >
                        Live Processes
                        </Button>

                    <Button
                        size="medium"
                        style={{
                            backgroundColor: activeSheet === 'Development Processes' ? '#303841' : '#acafb3',
                            color: '#D9DFE9',
                        }}
                        variant="contained"
                        onClick={() => this.switchSheet('Development Processes')}
                        >
                        Processes in Dev.
                    </Button>
                    </div>
                </div>

            <hr className="divider" />

            <div className="summaryCardsContainer">
            {/* Render your summary cards, charts, and tables using sheetData */}
            <SummaryCard title="Live Processes" value={sheetData.totalUsers} />
            <SummaryCard title="Time Saved" value={sheetData.activeUsers} />
            <SummaryCard title="Unique Submitters" value={sheetData.totalUsers} />
            <SummaryCard title="Manual Tasks Avoided" value={sheetData.activeUsers} />
            {/* ... */}
            </div>

            <div className="graphsContainer">
            <LineChartComponent />
            <BubbleChartComponent />
            </div>

            <div>
            <h2>Database Table</h2>
              {/* Other components */}
            <DataTable />
            </div>

            </div>
          </div>
        );
      }
    }



export default Dashboard;