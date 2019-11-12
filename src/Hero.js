import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Hero.css";

function Hero() {
  return (
    <>
      <div class="mainContent area1">
        <div class="bgVid-container">
          <video class="bgVid" autoPlay muted loop>
            <source
              src="https://storage.googleapis.com/coverr-main/mp4%2Fcoverr-a-beautiful-vermont-road-1572327401402.mp4?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=coverr-183014%40appspot.gserviceaccount.com%2F20191112%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20191112T192841Z&X-Goog-Expires=301&X-Goog-SignedHeaders=host&X-Goog-Signature=4780836bdab09a6a2420c2758e91a1c0ab4c0746f2fce0b4d8de69f4dc129885cca55857f7245d8add81cd822173818201cb6b3768587f66565b4919e3fd8647783f5422bd12a753caf4d77e3a613e204fd24579134c0c4f6642eefad2ec64a61fd49c19fe752a83dbbdcc45464ebd47175a89795329d2afdc92bf41e48a162a8f77422324c28502b39e2d68e8629eedc444815a463b2b8b95f1e0b4a0f70f578fabe81544f2c0b2050ed04af49ddd5bdc0ccd2411d642031ba409d6c990e7ca322db1d1c36f1ad53eaf7e7dd85a65cc4d7786868d83b3aae089ca65487948cf86f84fe21f439f9af455c0b6339a60769700613e3f662c0161bafccb8a717b3f"
              type="video/mp4"
            />
          </video>
        </div>
        <h2>Get to know trees around in Vancouver</h2>
        <p>Get started now.</p>
      </div>
    </>
  );
}

export default Hero;
