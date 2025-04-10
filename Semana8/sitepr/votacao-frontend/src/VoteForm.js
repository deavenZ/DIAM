import { useState } from "react";
import { Form, FormGroup, Table, Label } from "reactstrap";
import axios from "axios";
import moment from "moment";

function VoteForm({ question, onVoteComplete }) {
    const [selectedOption, setSelectedOption] = useState(-1);
    
    const handleVote = (event) => {
        event.preventDefault();
        if (selectedOption >= 0) {
            const option = question.opcoes[selectedOption];
            console.log('Votando na opção:', option);
            
            axios.post(`http://localhost:8000/votacao/api/opcao/${option.pk}/votar/`)
                .then(response => {
                    console.log('Voto registrado com sucesso:', response.data);
                    if (onVoteComplete) {
                        onVoteComplete();
                    }
                })
                .catch(error => {
                    console.error('Erro ao votar:', error);
                    alert('Ocorreu um erro ao registrar seu voto. Por favor, tente novamente.');
                });
        } else {
            alert('Por favor, selecione uma opção para votar.');
        }
    }
    
    const optionChangeHandler = (event) => {
        const optionId = parseInt(event.target.value);
        setSelectedOption(optionId);
    }
    
    return (
        <>
            <Form onSubmit={handleVote}>
                <FormGroup>
                    <Table>
                        <thead>
                            <tr><th align="left">Opções:</th></tr>
                        </thead>
                        <tbody>
                            {question.opcoes && question.opcoes.map((o, index) => (
                                <tr key={o.pk}>
                                    <td align="left">
                                        <FormGroup check>
                                            <Label>
                                                <input 
                                                    type="radio" 
                                                    name="react-radio"
                                                    checked={selectedOption === index}
                                                    value={index}
                                                    className="form-check-input"
                                                    onChange={optionChangeHandler}
                                                />
                                                {o.opcao_texto}
                                            </Label>
                                        </FormGroup>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <FormGroup>
                        <b>Data de publicação:</b>
                        <p>{moment(question.pub_data).format("YYYY-MM-DD HH:mm")}</p>
                    </FormGroup>
                </FormGroup>
                <button type="submit" className="button vote-button">Votar</button>
            </Form>
        </>
    );
}

export default VoteForm;