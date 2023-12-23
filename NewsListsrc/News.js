import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  background: #36393e;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-flow: row wrap; // 2
  width: 98%;
  height: 95%;
  z-index:0;
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
class News extends React.Component{
    constructor(props){
        super(props);
        this.state={
            newsTitleValues:[],
            newsURLValues:[],
            StockSymbol:"",
            
        }
    }
    

    componentDidMount(){
      localStorage.setItem('StockTicker',"AMZN");
      this.fetchNews();
      
     
       this.interval=setInterval(this.checkLocalStorage,1000);
        //this.setState({StockSymbol:localStorage.getItem('StockTicker')});
        window.addEventListener('storage',this.handleStorageChange);
    }
    componentWillUnmount() {
      // Remove the event listener when the component unmounts
     // window.removeEventListener('storage', this.handleStorageChange);
    }
    handleStorageChange = (event) => {
     
        this.fetchNews();
     
    };
    checkLocalStorage = () => {
      const newStockSymbol = localStorage.getItem("StockTicker");
      if (newStockSymbol !== this.state.StockSymbol) {
        // Only fetch news if the key's value has changed
        this.setState({ StockSymbol: newStockSymbol }, () => {
          this.fetchNews();
        });
      }
    };

    
  

    fetchNews(){
        const pointerToThis = this;
        console.log(pointerToThis);
        
        console.log("StockTicker",localStorage.getItem("StockTicker"));
        const API_KEY="c_MbuFgOf3GO9Yu_MjEC_gvClrZP50pO";
        let API_Call=`https://api.polygon.io/v2/reference/news?ticker=${localStorage.getItem('StockTicker').toUpperCase()}&apiKey=${API_KEY}`;
        let newsTitleValuesFunction=[];
        let newsURLValuesFunction=[];
        fetch(API_Call)
            .then(
                function(response){
                    return response.json();
                }

            )
            .then(
                function (data){
                    console.log(data);

                    for(var key in data ['results']){
                        
                        newsTitleValuesFunction.push(data['results'][key]['title']);
                        newsURLValuesFunction.push(data['results'][key]['article_url']);
                    }
                    //console.log(stockChartXValuesFunction);
                    pointerToThis.setState({
                        newsTitleValues: newsTitleValuesFunction,
                        newsURLValues: newsURLValuesFunction                       

                    });
                }
            )
    }
    


    render(){
        return(
          
            <div>                        
           
            <Container>
                <ScrollingContainer>
                <List>
                    {this.state.newsTitleValues.map((item,index) =>(
                        <a href={this.state.newsURLValues[index]} target="_blank" rel="noopener noreferrer">                        
                         <Card>{item}</Card>
                         </a>
                    ))}
                </List>
                </ScrollingContainer>  
            </Container>
            
            </div>
        )
        
    }
}
export default News;