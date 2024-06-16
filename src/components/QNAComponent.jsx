import {useEffect, useState} from "react";
import {load} from "@tensorflow-models/qna";
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";

const QNAComponent = () => {
    const [qnaPrediction, setQnaPrediction] = useState(undefined);
    const [question, setQuestion] = useState('');
    const [passage, setPassage] = useState('');
    const [textToAnswer, setTextToAnswer] = useState('');
    const [questionText, setQuestionText] = useState('');

    useEffect(() => {
        if(question && passage){
            setTextToAnswer('');
            setQuestionText('');
            load()
                .then(model => {
                    console.log("model charged");
                    model.findAnswers(question, passage)
                        .then(r => {
                            console.log(r);
                            setQnaPrediction(r.map(r => r.text))
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }
    }, [question, passage]);

    const handleAskClick =  () => {
        setPassage(textToAnswer);
        setQuestion(questionText);
    }

    const handleTextToAnswerChange = (event) => {
        const {value} = event.target;
        setTextToAnswer(value);
    }

    const handleQuestionTextChange = (event) => {
        const {value} = event.target;
        setQuestionText(value);
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '30px',
            color: '#242424'}}>
            <Typography variant="h4" component="div">
                Bert Q&A
            </Typography>
            <TextField
                sx={{color: 'white'}}
                id="text-from-where-to-answer"
                label="Multiline"
                multiline
                value={textToAnswer}
                onChange={handleTextToAnswerChange}
                defaultValue={'Insert the text from where gain the answer'}
                rows={4}
            />
            <TextField
                sx={{color: 'white'}}
                id="question"
                label="Multiline"
                multiline
                defaultValue={'Ask a question about the text above'}
                value={questionText}
                onChange={handleQuestionTextChange}
                rows={4}
            />
            <Button variant="contained" onClick={handleAskClick} disabled={!questionText || !textToAnswer}>Contained</Button>
            <Card sx={{minWidth: 275}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Question asked: ({question}):
                    </Typography>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Answer found:
                    </Typography>
                    {qnaPrediction && qnaPrediction.length > 0 ?
                        qnaPrediction.map((t, index) => {
                            return (<Typography key={index} variant="h5" component="div">{t}</Typography>)
                        }) :
                        null}
                </CardContent>
            </Card>
        </div>
    )
}

export default QNAComponent;