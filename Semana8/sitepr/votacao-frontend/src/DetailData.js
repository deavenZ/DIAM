import React from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';

function DetailData({ question }) {
    return (
        <div className="detail-data">
            <h2>{question.questao_texto}</h2>
            
            <h3>Opções:</h3>
            <Table>
                <thead>
                    <tr>
                        <th>Opção:</th>
                        <th>Votos</th>
                    </tr>
                </thead>
                <tbody>
                    {question.opcoes && question.opcoes.map(opcao => (
                        <tr key={opcao.pk}>
                            <td>{opcao.opcao_texto}</td>
                            <td>{opcao.votos}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default DetailData;