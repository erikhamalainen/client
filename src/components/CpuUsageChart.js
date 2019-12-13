import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import graphql2chartjs from 'graphql2chartjs';
import { Bar, Line } from 'react-chartjs-2';

const CPU_QUERY = gql `
    query CpuDataQuery{
        CpuUsagePercentage:cpuData {
            label: date
            data: cpu_usage
        }
    }
`;

export class CpuUsageChart extends Component {
    render() {
        return (
            <div>
                <h1 className="display-4 my-3">Cpu Usage</h1>
                <Query query={CPU_QUERY}>
                    {
                        ({ data }) => {
                            if (data) {
                                const g2c = new graphql2chartjs(data, (datasetName, dataPoint) => {
                                    return {
                                      chartType: 'line',
                                      backgroundColor: 'yellow'
                                      
                                    };
                                    
                                  });
                                  return (<Line data={g2c.data} 
                                    options={{ scales: {
                                        yAxes: [{
                                            ticks: {
                                                // Include a percentage sign in the ticks
                                                callback: function(value, index, values) {
                                                    return  value + '%';
                                                }
                                            }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                                // Include a dollar sign in the ticks
                                                callback: function(value, index, values) {
                                                    return  value.slice(0,10);
                                                }
                                            }
                                        }]

                                    } }}/>);
                                    
                            }
                            
                            return null;
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default CpuUsageChart;
