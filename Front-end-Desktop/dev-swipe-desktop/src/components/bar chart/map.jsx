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
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "520px"
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
              fill: "#2938bc" //color for the clicked country
            },
            selectedHover: {}
          }}
          regionsSelectable={true}
          series={{
            regions: [
              {
                values: mapData, 
                scale: ["#ff0000","#146804", "#ADD8E6"],
                normalizeFunction: "polynomial"
              }
            ]
          }}
        />
      </div>
    );
  };
  export default Map;