import React, { Component } from 'react';
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";
import { Col, Row, Container } from "../../components/Grid";
import {Jumbotron} from "../../components/Jumbotron";
import { List, ListItem, SaveButton } from "../../components/List";

class Search extends Component {
  state = {
    articles: [],
    topic: '',
    startYear: '',
    endYear: '',
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {
      API.getArticles(this.state.topic)
      .then(res => {
        console.log(res.data);
        this.setState({ articles: res.data })
      })
      .catch(err => console.log(err));
    }
  };

  handleSave = articleData => {
    API.saveArticle(articleData)
    .then(res => {
      console.log('Complete');
    })
    .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Jumbotron>
          <h1>Fake News</h1>
          <h4>Find out what conspiracies the liberal media is pushing today by searching the New York Times.</h4>
          <p><i>Disclaimer: The opinions of this app do not reflect the opinons of its creator.</i></p>
        </Jumbotron>
        <Row>
          <Col size="md-12">
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Year"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="End Year"
              />
              <FormBtn
                disabled={!(this.state.topic)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col size="md-12">
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => {
                  return (
                    <div key={article._id}>
                      <hr style={{ backgroundColor: "white" }}/>
                      <ListItem
                        key={article.headline.main}
                        headline={article.headline.main}
                        snippet={article.snippet}
                        url={article.web_url}
                        date={article.pub_date}
                      /> 
                      <SaveButton 
                        key={article._id} 
                        id={article.id}
                        onClick={() => this.handleSave(article._id)}
                      >
                        Save Article
                      </SaveButton>
                    </div>
                  )
                })}
              </List>
            ) : (
              <div>
                <hr />
                <h3>No Results to Display</h3>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;