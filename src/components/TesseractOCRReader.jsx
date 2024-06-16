import {useRef, useState} from "react";
import {Button, Card, CardContent, Typography} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {VisuallyHiddenInput} from "../constant/constant.js";
import Tesseract from "tesseract.js";
import {langPath} from "@tessdata/ita";

const TesseractOCRReader = () => {
    const [data, setData] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const fileRef = useRef(null);

    const handleReadUpload = async (event) => {
        const file = event?.target?.files?.[0];
        Tesseract.recognize(file, langPath, {
            logger: (m) => {
                if (m.status === "recognizing text") {
                    setProgress(m.progress);
                }
            },
        }).then(({ data: { text } }) => {
            setData(text);
        });
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <Typography variant="h4" component="div">
                OCR Tester
            </Typography>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon/>}>
                Upload file to read with ocr
                <VisuallyHiddenInput type="file" ref={fileRef} onChange={handleReadUpload}/>
            </Button>
            <Card sx={{minWidth: 275}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Progress: {progress} <br/>
                        Data read are:
                    </Typography>
                    <Typography variant="h5" component="div">
                        {data ? data : null}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default TesseractOCRReader;