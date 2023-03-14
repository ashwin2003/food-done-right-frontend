import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Outlet = () => {
  const location = useLocation();
  const state: any = location.state;

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("state => ", state);

  const getOutlets = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://food-done-right-backend.onrender.com/restaurants/${state.properties.address_line1}`
      );
      setSearchResults(response.data);
      console.log("response => ", response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOutlets();
  }, [state]);

  return (
    <div
      className="h-[90vh] w-full bg-color1 flex flex-row items-center justify-start gap-72 "
      style={{ backgroundImage: `url('your-image-url.jpg')` }}
    >
      <img
        src={
          "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        }
        className=" h-[90vh]  "
        alt=""
      />
      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-1 items-end p-4">
          <p className="text-xl font-semibold  ">Outlets at </p>
          <p className="text-lg font-base">{state.properties.address_line2}</p>
        </div>

        <div>
          {searchResults.length > 0 ? (
            searchResults.map((item: any, index): any => (
              <div className="p-4 text-center hover:bg-color2 rounded-md mb-2 ">
                <p>{item.properties.name}</p>
              </div>
            ))
          ) : (
            <p className="text-lg font-base">No Data found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Outlet;
