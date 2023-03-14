/* eslint-disable react/style-prop-object */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
// import { resolveImage } from "ts-asset-resolver";
// import myImage from "../assets/bg.jpg";

const Delivery = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleSearch = debounce(async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&apiKey=c4cc00c84fee47babf620eb532c768ab`
        );
        setSearchResults(response.data.features);
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    if (searchText) {
      handleSearch();
    } else {
      setSearchResults([]);
    }

    return handleSearch.cancel;
  }, [searchText]);

  function handleChange(event: { target: { value: any } }) {
    const { value } = event.target;
    setSearchText(value);
  }

  const onSelectHandler = (place: any) => {
    navigate("/outlet", { state: place });
  };

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

      <div className="flex flex-col gap-4 items-center">
        <p className=" text-4xl font-bold text-center ">Enter location</p>
        <div className="m-[10px]">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu"></IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Enter Location ex:- Stumpergasse 51, 1060 Vienna"
              inputProps={{ "aria-label": "search google maps" }}
              value={searchText}
              onChange={handleChange}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={() => handleChange}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        {isLoading ? (
          <p className="p-4 text-base font-normal">Loading...</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {searchResults.map((place: any, index: number) => (
              <li
                key={index}
                className="p-4 hover:bg-color2 rounded-sm text-center "
              >
                <button onClick={() => onSelectHandler(place)}>
                  <p>
                    {place?.properties?.address_line1}{" "}
                    {place?.properties?.address_line2}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Delivery;
