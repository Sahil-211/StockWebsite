import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import './App.css';


const UserStockInput= styled.div`
    position:relative;
    top:25px;
    left:250px;
    align-items:center;
    justify-content:center;
    z-index:1;
    height:0px;
    
`;
const InputBox = styled.input`
  position: absolute;
  padding:10px;
  justify-content:center;
  align-items:center;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  background-color:#000000;
  color: #ffffff;
  z-index:1;
`;

const Container = styled.div`
position:relative;
  background: #36393e;
  display: flex;
  flex-direction:row;
  justify-content: center;
  align-items:center;
  flex-flow: row wrap; // 2
  width: 98%;
  height: 95%;
  z-index:0;
  width:730px;
`;

const ScrollingContainer = styled.div`
  max-height: 299px; /* Adjust the maximum height as needed */
  max-width: 699px;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer and Edge */

  &::-webkit-scrollbar {
    width: 0; /* Chrome, Safari, Opera */
  }
`;

const List = styled.div`
  display: flex;
  justify-content: center; // 3
  flex-flow: column wrap; // 4
  
  a {
    color: #ffffff; /* Default link color */
    text-decoration: none; /* Remove underline */
    transition: color 0.3s; /* Smooth transition for color change */
  }

  a:visited {
    color: #ffffff; /* Color for visited links */
  }

  a:hover {
   
    text-decoration: underline; /* Add underline on hover */
    transition: 50ms
  }
`;

const Card = styled.div`
  margin: 20px;
  background: #313131;
  height: 200px;
  width: 450px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-flow: column; // 5 
  justify-content: center;
  align-items: center;

  &:hover{
    background: #000000;
    transition: 300ms;
  }
`;


class Stock extends React.Component{
    constructor(props){
        super(props);
        this.state={
            stockChartXValues:[],
            stockChartYValues:[],
            StockSymbol:"AMZN",
            userInput:"",
            
            
        }
    }
    handleInputChange = (event) => {
        this.setState({ userInput: event.target.value });
        
    };
    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.setState({ StockSymbol: this.state.userInput }, ()=>{
                this.fetchStock();
                localStorage.setItem('StockTicker',this.state.userInput)
            });
        }
    };
    componentDidMount(){
        this.fetchStock();
        
    }

    

    fetchStock(){
        const pointerToThis = this;
        console.log(pointerToThis);
        //let StockSymbol="AMZN";
        const API_KEY="WT5C4LUNLWOXV5KN";
        let API_Call=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.StockSymbol}&apikey=${API_KEY}`;
        let stockChartXValuesFunction=[];
        let stockChartYValuesFunction=[];
        fetch(API_Call)
            .then(
                function(response){
                    return response.json();
                }

            )
            .then(
                function (data){
                    console.log(data);

                    for(var key in data ['Time Series (Daily)']){
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                    }
                    //console.log(stockChartXValuesFunction);
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction

                    });
                }
            )
    }


    render(){
        return(
            <div className='graphss'>       
                <div className='graphing'>
                <UserStockInput>
                    <InputBox 
                        type="text"
                        placeholder="Enter Stock Ticker"
                        value={this.state.userInput}
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                        
                    />
                </UserStockInput>
        
            <Plot
                data={[
                {
                    x: this.state.stockChartXValues,
                    y: this.state.stockChartYValues,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                }
                ]}
                layout={{width: 730,
                height: 300,
                paper_bgcolor: '#36393e',
                plot_bgcolor: '#36393e',
                font:{color:"#FFFFFF"},
                
            }}
            />
        </div>
        
        
        </div>

            
        )
    }
}
export default Stock;