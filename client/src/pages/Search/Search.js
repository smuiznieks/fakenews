import React, { Component } from 'react';
import API from "../../utils/API";
import { Link } from 'react-router-dom';
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
    message: null
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    this.setState({message: null});
    event.preventDefault();
    if (this.state.topic) {
      API.getArticles(this.state.topic)
      .then(res => {
        this.setState({ articles: res.data })
      })
      .catch(err => console.log(err));
    }
  };

  handleSave = articleData => {
    API.saveArticle(articleData)
    .then(res => {
      this.setState({message: 'Your article has been saved.'});
    })
    .catch(err => {
      this.setState({message: 'This article has already been saved.'})
    });
  };

  render() {
    return (
      <Container>
        <Jumbotron>
          <h1>Fake News</h1>
          <h4>Find out what conspiracies the liberal media is pushing today by searching the New York Times.</h4>
          <p><i>Disclaimer: The opinions of this app do not reflect the opinons of its creator.</i></p>
          <Link className="link btn btn-danger" to='/saved' style={{ float: "right", marginBottom: 10 }}>View Saved Articles</Link>
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
            {this.state.message && <p className="text-center">
              {this.state.message}
            </p>}
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
                        onClick={() => this.handleSave({headline: article.headline.main, link: article.web_url, date: article.pub_date})}
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