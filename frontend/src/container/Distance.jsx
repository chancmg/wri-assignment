import _, { get, groupBy, isEmpty, map, reduce } from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Table from "./Table";

const Distance = () => {
  const [data, setData] = useState({});
  const fetchData = () => {
    axios
      .get("https://intense-island-19970.herokuapp.com/api/depot/distance")
      .then((response) => {
        console.log("SUCCESS", response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast(get(error, "matrix.errorDetails.0", "Failed to fetch"));
      });
  };

  const formatData = () => {
    const result = get(data, "matrix.resourceSets.0.resources.0.results", []);
    const origins = get(data, "origins", []);
    const destinations = get(data, "destinations", []);
    return Object.values(
      reduce(
        result,
        (prev, res) => {
          if (prev[get(origins, `${get(res, "originIndex")}.name`)]) {
            prev[get(origins, `${get(res, "originIndex")}.name`)] = {
              ...prev[get(origins, `${get(res, "originIndex")}.name`)],
              name: get(origins, `${get(res, "originIndex")}.name`),
              [get(destinations, `${get(res, "destinationIndex")}.name`)]: get(
                res,
                "travelDistance"
              ),
            };
          } else {
            prev[get(origins, `${get(res, "originIndex")}.name`)] = {
              name: get(origins, `${get(res, "originIndex")}.name`),
              [get(destinations, `${get(res, "destinationIndex")}.name`)]: get(
                res,
                "travelDistance"
              ),
            };
          }
          return prev;
        },
        {}
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isEmpty(data) && (
        <div
          className="w-screen flex items-center justify-center"
          style={{ height: "calc(100vh - 100px)" }}
        >
          No Records to Show
        </div>
      )}
      {!isEmpty(data) && (
        <div
          className="w-screen flex items-center justify-center"
          style={{ height: "calc(100vh - 100px)" }}
        >
          <Table data={formatData()} />
        </div>
      )}
    </div>
  );
};

export default Distance;
