import React from 'react';
import { Link } from 'react-router-dom';

function QuestionTable({ questions }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Questão</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {questions.map(question => (
                    <tr key={question.pk}>
                        <td>{question.questao_texto}</td>
                        <td>
                            <Link to={`/question/${question.pk}`} className="button">Detalhes</Link>
                            <Link to={`/vote/${question.pk}`} className="button">Votar</Link>
                            <Link to={`/question/${question.pk}/add-option`} className="button add">Adicionar Opção</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default QuestionTable;