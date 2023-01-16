import {useEffect, useState} from 'react';
import './CreateBioQuestion.css';

function CreateBioQuestion({question, answer}) {

    useEffect(() => {
        if (question.structure === 'options' && !question.multiple 
            && question.options.length > 0) {
            if (question.type === 'string') {
                answer.setAns(question.options[0])
            } else if (question.type === 'number') {
                answer.setAns('1');
            }
        }
        if (question.structure === 'input') {

        }
    }, [question.param]);

    var [input, setInput] = useState('');

    var addInput = () => {
        answer.setListAns(answer.listAns.concat(input));
        setInput("");
    }
    
    return (
        <>
            <div>QUESTION</div>
            <div>{question.question}</div>
            {question.private ?
                <div>The answer to this question will not be 
                    displayed on your profile</div>
                :
                ""
            }

            {question.structure === 'options' && question.type === 'string' 
                && !question.multiple ?
                <select 
                    onChange = {(e) => answer.setAns(e.target.value)}>
                    {question.options.map((o, key) => <option key = {key}>{o}</option>)}
                </select>:
                ""
            }

            {question.multiple && question.structure === 'input' ?
                <div>
                    <input 
                        onChange = {(e) => {
                            setInput(e.target.value);
                        }}
                        onKeyDown = {(e) => {
                            e.key === "Enter" && addInput();
                        }}
                        value = {input}
                        type = "text"
                        placeholder= 'Enter your major'
                    />
                    <div>
                        {"Majors:  " + answer.listAns.join(", ")}
                    </div>
                </div>:
                ""}

            {question.structure === 'options' && question.type === 'number' ? 
                <input type = "range" min = {1} max = {question.options.length}
                    onChange = {(e) => answer.setAns(e.currentTarget.value)} />:
                ""
            }
        </>
    );

}

export default CreateBioQuestion;