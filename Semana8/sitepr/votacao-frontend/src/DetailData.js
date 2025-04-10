import React from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';

function DetailData({ question, onDeleteQuestion, onDeleteOption }) {
    return (
        <div className="detail-data">
            <div className="question-header">
                <h2>{question.questao_texto}</h2>
                <button 
                    onClick={() => onDeleteQuestion(question.pk)} 
                    className="button delete-button"
                >
                    Apagar Questão
                </button>
            </div>
            
            <h3>Opções:</h3>
            <Table>
                <thead>
                    <tr>
                        <th>Opção:</th>
                        <th>Votos</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {question.opcoes && question.opcoes.map(opcao => (
                        <tr key={opcao.pk}>
                            <td>{opcao.opcao_texto}</td>
                            <td>{opcao.votos}</td>
                            <td>
                                <button 
                                    onClick={() => onDeleteOption(opcao.pk)} 
                                    className="action-link delete-link"
                                >
                                    Apagar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default DetailData;