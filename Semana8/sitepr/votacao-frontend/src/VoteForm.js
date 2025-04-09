import { useState } from "react";
import { Button, Form, FormGroup, Table, Label } from "reactstrap";
import axios from "axios";
import moment from "moment";

function VoteForm({ question, onVoteComplete }) {
    const [selectedOption, setSelectedOption] = useState(-1);
    
    const handleVote = (event) => {
        event.preventDefault();
        if (selectedOption >= 0) {
            const option = question.opcoes[selectedOption];
            axios.post(`http://localhost:8000/votacao/api/option/${option.pk}/vote/`)
                .then(() => {
                    if (onVoteComplete) {
                        onVoteComplete();
                    }
                })
                .catch(error => console.error('Error:', error));
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
                    <b>Texto:</b><p>{question.questao_texto}</p>
                    <b>Data de publicação:</b>
                    <p>{moment(question.pub_data).format("YYYY-MM-DD HH:mm")}</p>
                </FormGroup>
                <FormGroup>
                    <Table>
                        <thead>
                            <tr><th align="left">Opção</th></tr>
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
                </FormGroup>
                <Button color="primary">Votar</Button>
            </Form>
        </>
    );
}

export default VoteForm;