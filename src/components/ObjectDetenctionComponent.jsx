import {Button, Card, CardContent, Typography} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {useEffect, useRef, useState} from "react";
import {load} from "@tensorflow-models/coco-ssd";
import {VisuallyHiddenInput} from "../constant/constant.js";

const ObjectDetenctionComponent = () => {
    const [prediction, setPrediction] = useState(undefined);
    const [file, setFile] = useState(undefined);
    const [src, setSrc] = useState(undefined);
    const fileRef = useRef();
    useEffect(() => {
        console.log(file);
        if(file){
            load()
                .then(model => {
                    model.detect(file)
                        .then(prediction => {
                            console.log(prediction);
                            setPrediction(prediction)
                        })
                })
        }
    }, [file]);

    const handleFileSelect = (event) => {
        const file = event?.target?.files?.[0];

        const reader = new FileReader();
        const image = new Image()
        reader.onload = function () {
            image.src = reader.result;
        }
        reader.readAsDataURL(file);
        image.onload = () => {
            setFile(image);
            setSrc(image.src)
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <Typography variant="h4" component="div">
                Object Detection
            </Typography>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon/>}>
                Upload file
                <VisuallyHiddenInput type="file" ref={fileRef} onChange={handleFileSelect}/>
            </Button>
            <img src={src} alt={'uploaded img'} style={{maxWidth: '500px'}}/>
            <Card sx={{minWidth: 275}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Prediction is
                    </Typography>
                    <Typography variant="h5" component="div">
                        {prediction && prediction.length > 0 ? prediction[0].class : null}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default ObjectDetenctionComponent;