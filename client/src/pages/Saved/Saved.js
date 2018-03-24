import React, { Component } from 'react';
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import {Jumbotron} from "../../components/Jumbotron";
import { List, ListItem } from "../../components/List";

class Saved extends Component {
    state = {
        saved: []
    };
    loadArticles = () => {
        API.getArticles()
        .then(res =>
            this.setState({ articles: res.data })
        )
        .catch(err => console.log(err));
    };
    render() {
        return (
            <Container>
                <Jumbotron>
                    <h1>Fake News</h1>
                    <h4>Save articles to keep handy for the next time you need to troll your friends.</h4>
                    <p><i>Disclaimer: The opinions of this app do not reflect the opinons of its creator.</i></p>
                </Jumbotron>
                <Row>
                    <Col size="md-12">
                        {!this.state.saved.length ? (
                            <h4>No Saved Articles to Display</h4>
                        ) : (
                            <List>
                                {this.state.saved.map(article => {
                                    return (
                                        <ListItem
                                            key={article.title}
                                            title={article.title}
                                            // href={recipe.href}
                                            // ingredients={recipe.ingredients}
                                            // thumbnail={recipe.thumbnail}
                                        />
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