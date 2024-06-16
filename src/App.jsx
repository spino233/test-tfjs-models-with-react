import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-cpu';
import './App.css'
import TesseractOCRReader from "./components/TesseractOCRReader.jsx";

function App() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
            <TesseractOCRReader/>
            {/*
            <ObjectDetenctionWebcam/>
            <QNAComponent/>
            <ObjectDetenctionComponent/>
            <ToxicityIdentifierComponent/>
            */}
        </div>
    )
}

export default App
