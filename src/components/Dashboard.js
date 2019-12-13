import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider} from 'react-apollo';
import CpuTemperatureChart from './CpuTemperatureChart';
import CpuUsageChart from './CpuUsageChart';
import '../App.css';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql'
})

class Dashboard extends Component {
  render (){
    return (
      <ApolloProvider client={client}>
        
        <div className="container">
        <CpuUsageChart/>
        <CpuTemperatureChart/>
        
        </div>
      </ApolloProvider>
    );
  }
}
export default Dashboard;
