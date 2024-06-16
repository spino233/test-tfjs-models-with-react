import {createElement, useEffect, useRef, useState} from "react";
import {load} from "@tensorflow-models/coco-ssd";

const ObjectDetenctionWebcam = () => {
    const [model, setModel] = useState(undefined);
    const [removed, setRemoved] = useState(false);
    const [children, setChildren] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const videoRef = useRef(null);
    const liveViewRef = useRef(null);


    useEffect(() => {
        load().then(model => setModel(model));
    }, []);

    useEffect(() => {
        if(loaded) {
            handlePredictStream();
        }
    });
    
    const getUserMediaSupported = () => {
        return !!(navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia);
    }

    const onClickEnableWebcam = () => {
        if (!model) {
            return;
        }

        setRemoved(true);

        const constraints = {
            video: true
        };
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            videoRef.current.srcObject = stream;
        });
    }

    const handleOnLoadedData =  () => {
        setLoaded(true);
    }

    const handlePredictStream = () => {
        if (model) {
            model.detect(videoRef.current).then(predictions => {
                setChildren(children.splice(0))
                predictions.forEach(p => {
                    if (p.score > 0.66) {
                        const paragraph = createElement(
                            'p',
                            {
                                key: 1,
                                style: {
                                    marginLeft: p.bbox[0] + 'px',
                                    marginTop: p.bbox[1] - 10 + 'px',
                                    width: p.bbox[2] - 10 + 'px',
                                    top: 0,
                                    left: 0,
                                }
                            },
                            p.class + '- with ' + Math.round(parseFloat(p.score) * 100) + '% confidence.');
                        const highlighter = createElement(
                            'div',
                            {
                                key: 2,
                                className: 'highlighter',
                                style: {
                                    left: p.bbox[0] + 'px',
                                    top: p.bbox[1] - 10 + 'px',
                                    width: p.bbox[2] - 10 + 'px',
                                    height: p.bbox[3] - 10 + 'px'
                                }
                            }
                        )
                        setChildren([paragraph, highlighter]);
                    }
                });
            })
        }
    }

    return (
        <>
            <h1>Multiple object detection using pre trained model in TensorFlow.js</h1>

            <p>Wait for the model to load before clicking the button to enable the webcam - at which point it will
                become visible to use.</p>

            <section id="demos" className={!model ? 'invisible flex-style' : 'flex-style'}>

                <p>Hold some objects up close to your webcam to get a real-time classification! When ready click
                    &quot; enable webcam &quot; below and accept access to the webcam when the browser asks (check the
                    top left of your
                    window)
                </p>

                <div id="liveView" className="camView" ref={liveViewRef}>
                    <button className={removed ? 'removed' : ''}
                            id="webcamButton"
                            disabled={!getUserMediaSupported()}
                            onClick={onClickEnableWebcam}>Enable Webcam
                    </button>
                    <video id="webcam"
                           autoPlay
                           muted
                           width="640"
                           height="480"
                           ref={videoRef}
                           onLoadedData={handleOnLoadedData}></video>
                    {children}
                </div>
            </section>
        </>
    )
}

export default ObjectDetenctionWebcam;