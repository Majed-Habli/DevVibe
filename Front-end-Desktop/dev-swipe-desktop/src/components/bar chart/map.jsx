import React, {useState, useEffect} from 'react';
import { VectorMap } from "react-jvectormap";


  const handleClick = (e, countryCode) => {
    console.log(countryCode);
  };

  const Map = ({mapData}) => {

    return (
      <div>
        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent" 
          zoomOnScroll={true}
          containerStyle={{
            width: "100%",
            height: "416px",
          }}
          onRegionClick={handleClick}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#1E282C",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "pointer"
            },
            selected: {
              fill: "#2938bc"
            },
            selectedHover: {}
          }}
          regionsSelectable={true}
          series={{
            regions: [
              {
                values: mapData, 
                scale: ["#42FF00", "#FFF500"],
                normalizeFunction: "polynomial"
              }
            ]
          }}
        />
      </div>
    );
  };
  export default Map;