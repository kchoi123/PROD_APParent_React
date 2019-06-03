// import dependencies
import React, { useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import "./style.css";

// component to get the picture in the post bigger when clicked on
function animatedPicture (props) {
    const [biggerPicture, setbiggerPicture] = useState(false);
    const togglebiggerPicture = () => setbiggerPicture(prevState => !prevState);

    return (
      <Flipper flipKey={biggerPicture}>
        <Flipped flipId="original-pic">
          <img className={biggerPicture ? "bigger-pic" : "original-pic"} src={props.postPhoto} onClick={togglebiggerPicture}/>
        </Flipped>
      </Flipper>
    );
}

// export it 
export default animatedPicture;