import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Summonerz extends Component {
  state = {
    summoners: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  handleClick=event=>{
    event.preventDefault();
    var name1=document.querySelector("#name1").value
    var name2=document.querySelector("#name2").value

    var sumData={
      name1: name2,
      name2: name2,
     
    }
    console.log(sumData)
     API.saveSums(sumData)
      .then(res=>console.log(res.data))

   // API.getSummoner()

      //.then(res=>console.log(res))

    //console.log("yay")
  }

  loadSums = () => {
    API.getSums()
      .then(res => this.setState({ summoners: res.data }))
      .catch(err => console.log(err));


  
   };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
            <h1>Summoners!</h1>
            </Jumbotron>
            <form>
              <Input id="name1" name="name1" placeholder="Summoner Name 1 (required)" />
              <Input id ="name2" name="name2" placeholder="Summoner Name 2 (required)" />
              <FormBtn onClick={this.handleClick}>Submit Summoners</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron> 
              <h1>Summoners I've Battled</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <FormBtn onClick={this.handleClick}>API</FormBtn>
      </Container>
    );
  }
}

export default Summonerz;