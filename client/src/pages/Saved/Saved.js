import React, { Component } from 'react';
import API from "../../utils/API";
import { Link } from 'react-router-dom';
import { Col, Row, Container } from "../../components/Grid";
import {Jumbotron} from "../../components/Jumbotron";
import { List, ListItem, SaveButton } from "../../components/List";

class Saved extends Component {
    state = {
        saved: []
    };

    loadArticles = () => {
        API.getSaved()
        .then(res =>
            this.setState({ saved: res.data })
        )
        .catch(err => console.log(err));
    }

    componentDidMount() {
        this.loadArticles();
    }

    handleDelete = (articleData) => {
        API.deleteArticle(articleData)
        .then(res => {
            this.loadArticles()
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h1>Fake News</h1>
                    <h4>Save articles to keep handy for the next time you need to troll your friends.</h4>
                    <p><i>Disclaimer: The opinions of this app do not reflect the opinons of its creator.</i></p>
                    <Link className="link btn btn-danger" to='/' style={{ float: "right", marginBottom: 10 }}>Home</Link>
                </Jumbotron>
                <Row>
                    <Col size="md-12">
                        {!this.state.saved.length ? (
                            <h4>No Saved Articles to Display</h4>
                        ) : (
                            <List>
                                {this.state.saved.map(article => {
                                    return (
                                        <div key={article._id}>
                                            <hr style={{ backgroundColor: "white" }}/>
                                            <ListItem
                                                key={article._id}
                                                headline={article.headline}
                                                date={article.date}
                                                url={article.url}
                                            />
                                            <SaveButton 
                                                key={article._id} 
                                                id={article.id}
                                                onClick={() => this.handleDelete(article._id)}
                                                >
                                                Delete Article
                                            </SaveButton>
                                        </div>
                                    );
                                })}
                            </List>
                        )}
                    </Col>
                </Row>
            </Container>
        )
    };
};

export default Saved;