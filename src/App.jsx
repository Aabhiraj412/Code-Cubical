import { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'

function App() {

  const webcam = useRef(null);
  
  const [url,setURL] = useState(null);

  const capture = useCallback( async ()=>{
    const imageSRC = webcam.current.getScreenshot();

    setURL(imageSRC);

    console.log(url);
  },[webcam]);

  const recapture = async ()=>{
    setURL(null);
  };
  const onUserMedia = (e) =>{
    console.log(e);
  }

  return (

    <div>
      <div className="navbar bg-primary text-primary-content">
        <button className="btn btn-ghost text-xl">Smart Attendance Mannager</button>
      </div>

      {!url &&
        <div className="flex card bg-base-100 w-full shadow-xl">
          <figure className="mt-10">
            <Webcam
              ref={webcam}
              audio= {false}
              screenshotFormat='image/jpeg'
              onUserMedia={onUserMedia}
            />
          </figure>
          <div className="card-body items-center text-center">
              <h2 className="card-title">Mark Your Attendance</h2>
            <div className="card-actions mt-5">
              <button className="btn btn-primary" onClick={capture}>Start Scanning</button>
            </div>
          </div>
        </div>
      }
      {url &&
        <div className="flex card bg-base-100 w-full shadow-xl">
          <figure className="mt-10">
            <img src={url} alt="captured" />
          </figure>
          <div className="card-body items-center text-center">
              <h2 className="card-title">Processing...</h2>
            <div className="card-actions mt-5">
              <button className="btn btn-primary" onClick={recapture}>Retry</button>
            </div>
          </div>
        </div>
      } 
    </div>
  )
}

export default App
