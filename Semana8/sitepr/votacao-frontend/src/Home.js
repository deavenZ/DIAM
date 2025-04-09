import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuestionTable from "./QuestionTable";
import {Container, Row, Col} from "reactstrap";

function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/votacao/api/questions/')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Container style={{marginTop: "20px", maxWidth: "800px"}}>
      <Row>
        <Col>
          <div className="actions">
            <Link to="/create-question" className="button">Criar Nova Questão</Link>
          </div>
          <QuestionTable questions={questions} />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;