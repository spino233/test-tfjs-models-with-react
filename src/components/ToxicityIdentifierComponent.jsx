import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {load} from "@tensorflow-models/toxicity";

const treshold = 0.0;

const ToxicityIdentifierComponent = () => {
    const [text, setText] = useState('');
    const [inputText, setInputText] = useState('');
    const [toxicityPrediction, setToxicityPrediction] = useState(undefined);

    useEffect(() => {
        if(text && text !== ''){
            load(treshold, undefined)
                .then(model => {
                    console.log(text)
                    const sentences = [text];
                    model.classify(sentences).then(predictions => {
                        console.log(predictions);
                        setToxicityPrediction(predictions.filter(p =>
                            p.results.some(r => r.match)));
                    })
                })
        }
    }, [text]);

    const handleSubmitText = () => {
        setText(inputText);
    }
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '30px',
            color: '#242424'}}
             onChange={(e) => setInputText(e.target.value)}>
            <Typography variant="h4" component="div">
                Toxicity Identifier
            </Typography>
            <TextField
                sx={{color: 'white'}}
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                value={inputText}
                rows={4}
            />
            <Button variant="contained" onClick={handleSubmitText}>Contained</Button>
            <Card sx={{minWidth: 275}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Toxicity found in({text}):
                    </Typography>
                    {toxicityPrediction && toxicityPrediction.length > 0 ?
                        toxicityPrediction.map((t, index) => {
                            return (<Typography key={index} variant="h5" component="div">{t.label}</Typography>)
                        }) :
                        null}
                </CardContent>
            </Card>
        </div>
    )
}

export default ToxicityIdentifierComponent;