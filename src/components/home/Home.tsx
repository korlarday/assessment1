import React from "react";
import "./Home.scss";
import Fade from 'react-reveal/Fade';
function Home() {
    const image = 'sample_hotel2.jpg';
    const title = 'Hotel Ranking';
    const description = 'Hotel Chain'
  return (
    <div className="container">
        <div className="wrapper">
      <Fade bottom>
        <div className="itemText">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </Fade>
      <div>
        <Fade bottom>
          <div className="buttonGroup">
            <div className="button">Hotel Ranking</div>
            <div className="button rightButton">Hotel Chain</div>
          </div>
        </Fade>
      </div>
    </div>



      {/* <Section
        title="Model S"
        description="Order Online for Touchless Delivery"
        leftBtnText="Custom order"
        rightBtnText="Existing inventory"
        backgroundImg="model-s.jpg"
      /> */}
      
    </div>
  );
}

export default Home;
