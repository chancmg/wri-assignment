import axios from "axios";
import { get, map } from "lodash";
import isEmpty from "lodash/isEmpty";
import React, { useReducer, useState } from "react";
import { FileDrop } from "react-file-drop";
import { AiOutlineFileText } from "react-icons/ai";
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import Select from "react-select";
import { toast } from 'react-toastify';

const options = [
  { value: "depot", label: "Depot" },
  { value: "terminal", label: "Terminal" },
];

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState({});
  const [selectedType, setSelectedType] = useState();

  const initialValues = {
    name: "",
    latitude: "",
    longitude: "",
  };

  const [formValues, setFormValues] = useReducer((curr, newVal) => {
    if (typeof newVal === "number" || newVal === 0) {
      // Reset
      return initialValues;
    }
    return { ...curr, ...newVal };
  }, initialValues);
  const { name, latitude, longitude } = formValues;
  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setFormValues({ [name]: value });
  }

  const handle = (files) => {
    const end = files[0].name || "";
    if (end.endsWith("geojson")) {
      const fileReader = new FileReader();
      fileReader.readAsText(files[0], "UTF-8");
      fileReader.onload = (e) => {
        setSelectedFile(JSON.parse(e.target.result));
      };
    }
  };

  const postDepots = (depots) => {
    axios
      .post("https://intense-island-19970.herokuapp.com/api/depot/add/bulk", depots)
      .then((response) => {
        console.log("SUCCESS", response);
        toast("Successfully uploaded");
      })
      .catch((error) => {
        console.log(error);
        toast("Failed to uploaded");
      });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (isEmpty(selectedType)) return;
    if (!isEmpty(selectedFile)) {
      const payload = map(get(selectedFile, "features"), (eachDepot) => ({
        name: get(eachDepot, "properties.Name"),
        latitude:get(eachDepot, "geometry.coordinates.1"),
        longitude:get(eachDepot, "geometry.coordinates.0"),
        type: selectedType
      }));
      postDepots(payload);
    } else {
      if (
        isEmpty(formValues.name) ||
        isEmpty(formValues.latitude) ||
        isEmpty(formValues.longitude)
      )
        return;
      postDepots([
        {
          type: selectedType,
          ...formValues,
        },
      ]);
    }
  };

  return (
    <div
      className="w-screen flex items-center justify-center"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div className="bg-white rounded shadow border p-6 flex flex-col w-4/12">
        <div className="text-xl mb-8">Add/Upload</div>
        <Select
          options={options}
          placeholder="Select Type"
          onChange={(selected) => {
            setSelectedType(selected.value);
          }}
        />

        {isEmpty(selectedFile) ? (
          <FileDrop
            onDrop={(files, event) => {
              event.preventDefault();
              handle(files);
            }}
          >
            <div className="grid justify-center dgap-y-1 py-2 text-center">
              <p>Drag & Drop File here</p>
              <p>or</p>
              <label
                htmlFor="same"
                className="bg-black text-white text-center py-1 w-24 mx-auto cursor-pointer"
              >
                Browse File
                <input
                  id="same"
                  className="hidden"
                  type="file"
                  accept=".geojson"
                  onChange={(e) => {
                    handle(e.target.files);
                  }}
                />
              </label>
            </div>
          </FileDrop>
        ) : (
          <div className="flex justify-center space-x-3 overflow-x-auto pb-2 whitespace-nowrap mt-4">
            <div
              style={{ flexShrink: 0 }}
              className="w-16 h-16 m-1 relative bg-white rounded-lg flex flex-col justify-between"
            >
              <div className="flex flex-col items-center mt-1.5">
                <AiOutlineFileText size={20} color="blue" />
                <div className="select-none" style={{ fontSize: "0.5rem" }}>
                  {selectedFile.name}
                </div>
              </div>
              <div
                className="flex justify-center py-0.5 rounded-b-lg"
                style={{ backgroundColor: "#bee8ea" }}
              >
                <BsCheckCircleFill color="green" />
              </div>
              <BsFillXCircleFill
                onClick={() => setSelectedFile({})}
                className="absolute -top-1 -right-1"
              />
            </div>
          </div>
        )}
        <div className="flex justify-center">or</div>
        <div>Enter Details</div>
        <div className="p-2">
          <label>Name</label>
          <input
            type="text"
            className="relative outline-none rounded py-3 px-3 w-full bg-white shadow text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline"
            placeholder="name"
            value={name}
            onChange={handleChange}
            name="name"
            autoComplete="off"
          />
        </div>
        <div>Coordinates</div>
        <div className="p-2">
          <label>Latitude</label>
          <input
            type="text"
            className="relative outline-none rounded py-3 px-3 w-full bg-white shadow text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline"
            placeholder="latitude"
            value={latitude}
            onChange={handleChange}
            name="latitude"
          />
        </div>
        <div className="p-2">
          <label>Longitude</label>
          <input
            type="text"
            className="relative outline-none rounded py-3 px-3 w-full bg-white shadow text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline"
            placeholder="longitude"
            value={longitude}
            onChange={handleChange}
            name="longitude"
          />
        </div>
        <button
          className="bg-blue-500 px-4 py-2 text-white"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Upload;
