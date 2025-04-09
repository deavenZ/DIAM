import React from "react";
import { Table } from "reactstrap";
import { Link } from 'react-router-dom';

function QuestionTable({ questions }) {
    const centered = { textAlign: "center" };

    return (
        <div className="question-table">
            <Table light="true">
                <thead>
                    <tr>
                        <th>Questão</th>
                        <th style={centered}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => (
                        <tr key={question.pk}>
                            <td>{question.questao_texto}</td>
                            <td style={centered}>
                                <Link to={`/question/${question.pk}`} className="action-link">Detalhes</Link>
                                <Link to={`/question/${question.pk}/vote`} className="action-link">Votar</Link>
                                <Link to={`/question/${question.pk}/create-option`} className="action-link">Adicionar Opção</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default QuestionTable;