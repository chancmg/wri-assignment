import _,{ get, groupBy, isEmpty, map, reduce } from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Table from "./Table";

const mock = {
  destinations: [
    {
      latitude: "12.91767509",
      longitude: "77.57401765",
      name: "Banashankari Bus Station",
      type: "terminal",
    },
    {
      latitude: "12.7971414",
      longitude: "77.38470465",
      name: "Bidadi",
      type: "terminal",
    },
    {
      latitude: "12.91742686",
      longitude: "77.62413673",
      name: "Central Silk Board (Towards Electronic City)",
      type: "terminal",
    },
    {
      latitude: "13.02974718",
      longitude: "77.54023321",
      name: "Goraguntepalya (Towards Tumkur Road)",
      type: "terminal",
    },
    {
      latitude: "13.04127483",
      longitude: "77.58936524",
      name: "Hebbala (Towards 279E)",
      type: "terminal",
    },
    {
      latitude: "13.07881989",
      longitude: "77.7869153",
      name: "Hoskote Bus Stand",
      type: "terminal",
    },
    {
      latitude: "13.00029654",
      longitude: "77.6761213",
      name: "KR Puram Bus Stand",
      type: "terminal",
    },
    {
      latitude: "12.91361449",
      longitude: "77.48744936",
      name: "Kengeri TTMC",
      type: "terminal",
    },
    {
      latitude: "13.10068796",
      longitude: "77.59434879",
      name: "Yelahanka Old Town",
      type: "terminal",
    },
    {
      latitude: "13.01696175",
      longitude: "77.55651892",
      name: "Yeshwanthapura TTMC",
      type: "terminal",
    },
  ],
  matrix: {
    authenticationResultCode: "ValidCredentials",
    brandLogoUri: "http://dev.virtualearth.net/Branding/logo_powered_by.png",
    copyright:
      "Copyright \u00a9 2022 Microsoft and its suppliers. All rights reserved. This API cannot be accessed and the content and any results may not be used, reproduced or transmitted in any manner without express written permission from Microsoft Corporation.",
    resourceSets: [
      {
        estimatedTotal: 1,
        resources: [
          {
            __type:
              "DistanceMatrix:http://schemas.microsoft.com/search/local/ws/rest/v1",
            destinations: [
              {
                latitude: 12.91767509,
                longitude: 77.57401765,
              },
              {
                latitude: 12.7971414,
                longitude: 77.38470465,
              },
              {
                latitude: 12.91742686,
                longitude: 77.62413673,
              },
              {
                latitude: 13.02974718,
                longitude: 77.54023321,
              },
              {
                latitude: 13.04127483,
                longitude: 77.58936524,
              },
              {
                latitude: 13.07881989,
                longitude: 77.7869153,
              },
              {
                latitude: 13.00029654,
                longitude: 77.6761213,
              },
              {
                latitude: 12.91361449,
                longitude: 77.48744936,
              },
              {
                latitude: 13.10068796,
                longitude: 77.59434879,
              },
              {
                latitude: 13.01696175,
                longitude: 77.55651892,
              },
            ],
            origins: [
              {
                latitude: 12.9247615985763,
                longitude: 77.59258638039,
              },
              {
                latitude: 12.9135275952874,
                longitude: 77.4874607488594,
              },
              {
                latitude: 12.9038833348821,
                longitude: 77.4733702731167,
              },
              {
                latitude: 12.955630571984,
                longitude: 77.5958496288577,
              },
              {
                latitude: 12.9545508004686,
                longitude: 77.595341990866,
              },
              {
                latitude: 12.9203321983344,
                longitude: 77.6443059307887,
              },
              {
                latitude: 12.9412236864562,
                longitude: 77.6252187064832,
              },
              {
                latitude: 12.9771795117191,
                longitude: 77.7264533122497,
              },
              {
                latitude: 13.0198261380114,
                longitude: 77.5006369019243,
              },
              {
                latitude: 12.8471304741531,
                longitude: 77.6724658836357,
              },
            ],
            results: [
              {
                destinationIndex: 0,
                originIndex: 0,
                totalWalkDuration: 0,
                travelDistance: 2.909,
                travelDuration: 9.5833,
              },
              {
                destinationIndex: 1,
                originIndex: 0,
                totalWalkDuration: 0,
                travelDistance: 37.576,
                travelDuration: 59.6833,
              },
              {
                destinationIndex: 2,
                originIndex: 0,
                totalWalkDuration: 0,
                travelDistance: 5.992,
                travelDuration: 16.15,
              },
              {
                destinationIndex: 3,
                originIndex: 0,
                totalWalkDuration: 0,
                travelDistance: 22.844,
                travelDuration: 46.9333,
              },
              {
                destinationIndex: 4,
                originIndex: 0,
                totalWalkDuration: 0,
                travelDistance: 15.853,
                travelDuration: 35.7833,
              },
              {
                destinationIndex: 5,
                originIndex: 0,
                totalWalkDuration: 0,
                travelDistance: 30.544,
                travelDuration: 59.9833,
              },
              {
                destinationIndex: 6,
                originIndex: 0,
                totalWalkDuration: 0,
                travelDistance: 15.138,
                travelDuration: 37.8,
              },
              {
                destinationIndex: 7,
                originIndex: 0,
                totalWalkDuration: 0,
                travelDistance: 15.808,
                travelDuration: 37.5833,
              },
              {
                destinationIndex: 8,
                originIndex: 0,
                totalWalkDuration: 0,
                travelDistance: 22.873,
                travelDuration: 45.2667,
              },
              {
                destinationIndex: 9,
                originIndex: 0,
                totalWalkDuration: 0,
                travelDistance: 16.624,
                travelDuration: 39.9167,
              },
              {
                destinationIndex: 0,
                originIndex: 1,
                totalWalkDuration: 0,
                travelDistance: 13.122,
                travelDuration: 30.7167,
              },
              {
                destinationIndex: 1,
                originIndex: 1,
                totalWalkDuration: 0,
                travelDistance: 18.195,
                travelDuration: 26.4833,
              },
              {
                destinationIndex: 2,
                originIndex: 1,
                totalWalkDuration: 0,
                travelDistance: 35.752,
                travelDuration: 46.75,
              },
              {
                destinationIndex: 3,
                originIndex: 1,
                totalWalkDuration: 0,
                travelDistance: 19.31,
                travelDuration: 35.6167,
              },
              {
                destinationIndex: 4,
                originIndex: 1,
                totalWalkDuration: 0,
                travelDistance: 21.107,
                travelDuration: 43.05,
              },
              {
                destinationIndex: 5,
                originIndex: 1,
                totalWalkDuration: 0,
                travelDistance: 40.034,
                travelDuration: 74.2167,
              },
              {
                destinationIndex: 6,
                originIndex: 1,
                totalWalkDuration: 0,
                travelDistance: 24.628,
                travelDuration: 52.0333,
              },
              {
                destinationIndex: 7,
                originIndex: 1,
                totalWalkDuration: 0,
                travelDistance: 1.182,
                travelDuration: 4.0667,
              },
              {
                destinationIndex: 8,
                originIndex: 1,
                totalWalkDuration: 0,
                travelDistance: 31.233,
                travelDuration: 53.9,
              },
              {
                destinationIndex: 9,
                originIndex: 1,
                totalWalkDuration: 0,
                travelDistance: 17.141,
                travelDuration: 35.05,
              },
              {
                destinationIndex: 0,
                originIndex: 2,
                totalWalkDuration: 0,
                travelDistance: 19.115,
                travelDuration: 30.5667,
              },
              {
                destinationIndex: 1,
                originIndex: 2,
                totalWalkDuration: 0,
                travelDistance: 16.387,
                travelDuration: 24.55,
              },
              {
                destinationIndex: 2,
                originIndex: 2,
                totalWalkDuration: 0,
                travelDistance: 33.944,
                travelDuration: 44.8,
              },
              {
                destinationIndex: 3,
                originIndex: 2,
                totalWalkDuration: 0,
                travelDistance: 28.077,
                travelDuration: 34.6167,
              },
              {
                destinationIndex: 4,
                originIndex: 2,
                totalWalkDuration: 0,
                travelDistance: 37.014,
                travelDuration: 49.65,
              },
              {
                destinationIndex: 5,
                originIndex: 2,
                totalWalkDuration: 0,
                travelDistance: 47.296,
                travelDuration: 80.7333,
              },
              {
                destinationIndex: 6,
                originIndex: 2,
                totalWalkDuration: 0,
                travelDistance: 31.89,
                travelDuration: 58.55,
              },
              {
                destinationIndex: 7,
                originIndex: 2,
                totalWalkDuration: 0,
                travelDistance: 4.348,
                travelDuration: 11.5333,
              },
              {
                destinationIndex: 8,
                originIndex: 2,
                totalWalkDuration: 0,
                travelDistance: 40,
                travelDuration: 52.9,
              },
              {
                destinationIndex: 9,
                originIndex: 2,
                totalWalkDuration: 0,
                travelDistance: 29.007,
                travelDuration: 36.2667,
              },
              {
                destinationIndex: 0,
                originIndex: 3,
                totalWalkDuration: 0,
                travelDistance: 6.824,
                travelDuration: 19.2167,
              },
              {
                destinationIndex: 1,
                originIndex: 3,
                totalWalkDuration: 0,
                travelDistance: 33.739,
                travelDuration: 58.2667,
              },
              {
                destinationIndex: 2,
                originIndex: 3,
                totalWalkDuration: 0,
                travelDistance: 8.692,
                travelDuration: 22.95,
              },
              {
                destinationIndex: 3,
                originIndex: 3,
                totalWalkDuration: 0,
                travelDistance: 15.41,
                travelDuration: 36.05,
              },
              {
                destinationIndex: 4,
                originIndex: 3,
                totalWalkDuration: 0,
                travelDistance: 12.179,
                travelDuration: 25.6667,
              },
              {
                destinationIndex: 5,
                originIndex: 3,
                totalWalkDuration: 0,
                travelDistance: 26.628,
                travelDuration: 49.65,
              },
              {
                destinationIndex: 6,
                originIndex: 3,
                totalWalkDuration: 0,
                travelDistance: 11.222,
                travelDuration: 27.4667,
              },
              {
                destinationIndex: 7,
                originIndex: 3,
                totalWalkDuration: 0,
                travelDistance: 15.699,
                travelDuration: 32.3167,
              },
              {
                destinationIndex: 8,
                originIndex: 3,
                totalWalkDuration: 0,
                travelDistance: 19.199,
                travelDuration: 35.15,
              },
              {
                destinationIndex: 9,
                originIndex: 3,
                totalWalkDuration: 0,
                travelDistance: 12.95,
                travelDuration: 29.8,
              },
              {
                destinationIndex: 0,
                originIndex: 4,
                totalWalkDuration: 0,
                travelDistance: 6.093,
                travelDuration: 17.45,
              },
              {
                destinationIndex: 1,
                originIndex: 4,
                totalWalkDuration: 0,
                travelDistance: 33.941,
                travelDuration: 58.4,
              },
              {
                destinationIndex: 2,
                originIndex: 4,
                totalWalkDuration: 0,
                travelDistance: 7.534,
                travelDuration: 21.1833,
              },
              {
                destinationIndex: 3,
                originIndex: 4,
                totalWalkDuration: 0,
                travelDistance: 15.612,
                travelDuration: 36.1833,
              },
              {
                destinationIndex: 4,
                originIndex: 4,
                totalWalkDuration: 0,
                travelDistance: 12.381,
                travelDuration: 25.8,
              },
              {
                destinationIndex: 5,
                originIndex: 4,
                totalWalkDuration: 0,
                travelDistance: 26.83,
                travelDuration: 49.7833,
              },
              {
                destinationIndex: 6,
                originIndex: 4,
                totalWalkDuration: 0,
                travelDistance: 11.424,
                travelDuration: 27.6,
              },
              {
                destinationIndex: 7,
                originIndex: 4,
                totalWalkDuration: 0,
                travelDistance: 15.901,
                travelDuration: 32.45,
              },
              {
                destinationIndex: 8,
                originIndex: 4,
                totalWalkDuration: 0,
                travelDistance: 19.401,
                travelDuration: 35.2833,
              },
              {
                destinationIndex: 9,
                originIndex: 4,
                totalWalkDuration: 0,
                travelDistance: 13.152,
                travelDuration: 29.9333,
              },
              {
                destinationIndex: 0,
                originIndex: 5,
                totalWalkDuration: 0,
                travelDistance: 8.112,
                travelDuration: 22.7,
              },
              {
                destinationIndex: 1,
                originIndex: 5,
                totalWalkDuration: 0,
                travelDistance: 50.438,
                travelDuration: 63.05,
              },
              {
                destinationIndex: 2,
                originIndex: 5,
                totalWalkDuration: 0,
                travelDistance: 2.413,
                travelDuration: 4.85,
              },
              {
                destinationIndex: 3,
                originIndex: 5,
                totalWalkDuration: 0,
                travelDistance: 21.795,
                travelDuration: 50.5333,
              },
              {
                destinationIndex: 4,
                originIndex: 5,
                totalWalkDuration: 0,
                travelDistance: 18.564,
                travelDuration: 40.15,
              },
              {
                destinationIndex: 5,
                originIndex: 5,
                totalWalkDuration: 0,
                travelDistance: 32.66,
                travelDuration: 50.35,
              },
              {
                destinationIndex: 6,
                originIndex: 5,
                totalWalkDuration: 0,
                travelDistance: 17.254,
                travelDuration: 28.1667,
              },
              {
                destinationIndex: 7,
                originIndex: 5,
                totalWalkDuration: 0,
                travelDistance: 21.864,
                travelDuration: 50.4833,
              },
              {
                destinationIndex: 8,
                originIndex: 5,
                totalWalkDuration: 0,
                travelDistance: 25.584,
                travelDuration: 49.6333,
              },
              {
                destinationIndex: 9,
                originIndex: 5,
                totalWalkDuration: 0,
                travelDistance: 19.335,
                travelDuration: 44.2833,
              },
              {
                destinationIndex: 0,
                originIndex: 6,
                totalWalkDuration: 0,
                travelDistance: 8.198,
                travelDuration: 28.3667,
              },
              {
                destinationIndex: 1,
                originIndex: 6,
                totalWalkDuration: 0,
                travelDistance: 51.21,
                travelDuration: 68.5,
              },
              {
                destinationIndex: 2,
                originIndex: 6,
                totalWalkDuration: 0,
                travelDistance: 5.159,
                travelDuration: 16.6,
              },
              {
                destinationIndex: 3,
                originIndex: 6,
                totalWalkDuration: 0,
                travelDistance: 18.461,
                travelDuration: 44.0333,
              },
              {
                destinationIndex: 4,
                originIndex: 6,
                totalWalkDuration: 0,
                travelDistance: 15.23,
                travelDuration: 33.65,
              },
              {
                destinationIndex: 5,
                originIndex: 6,
                totalWalkDuration: 0,
                travelDistance: 26.431,
                travelDuration: 46.9167,
              },
              {
                destinationIndex: 6,
                originIndex: 6,
                totalWalkDuration: 0,
                travelDistance: 11.025,
                travelDuration: 24.7333,
              },
              {
                destinationIndex: 7,
                originIndex: 6,
                totalWalkDuration: 0,
                travelDistance: 20.271,
                travelDuration: 44,
              },
              {
                destinationIndex: 8,
                originIndex: 6,
                totalWalkDuration: 0,
                travelDistance: 22.25,
                travelDuration: 43.1333,
              },
              {
                destinationIndex: 9,
                originIndex: 6,
                totalWalkDuration: 0,
                travelDistance: 16.001,
                travelDuration: 37.7833,
              },
              {
                destinationIndex: 0,
                originIndex: 7,
                totalWalkDuration: 0,
                travelDistance: 23.359,
                travelDuration: 48.4667,
              },
              {
                destinationIndex: 1,
                originIndex: 7,
                totalWalkDuration: 0,
                travelDistance: 65.685,
                travelDuration: 88.8,
              },
              {
                destinationIndex: 2,
                originIndex: 7,
                totalWalkDuration: 0,
                travelDistance: 17.66,
                travelDuration: 30.6167,
              },
              {
                destinationIndex: 3,
                originIndex: 7,
                totalWalkDuration: 0,
                travelDistance: 27.123,
                travelDuration: 47,
              },
              {
                destinationIndex: 4,
                originIndex: 7,
                totalWalkDuration: 0,
                travelDistance: 21.611,
                travelDuration: 38.8333,
              },
              {
                destinationIndex: 5,
                originIndex: 7,
                totalWalkDuration: 0,
                travelDistance: 16.322,
                travelDuration: 32.9667,
              },
              {
                destinationIndex: 6,
                originIndex: 7,
                totalWalkDuration: 0,
                travelDistance: 10.326,
                travelDuration: 23.5,
              },
              {
                destinationIndex: 7,
                originIndex: 7,
                totalWalkDuration: 0,
                travelDistance: 31.971,
                travelDuration: 68.0167,
              },
              {
                destinationIndex: 8,
                originIndex: 7,
                totalWalkDuration: 0,
                travelDistance: 27.377,
                travelDuration: 46.2833,
              },
              {
                destinationIndex: 9,
                originIndex: 7,
                totalWalkDuration: 0,
                travelDistance: 28.883,
                travelDuration: 50.2,
              },
              {
                destinationIndex: 0,
                originIndex: 8,
                totalWalkDuration: 0,
                travelDistance: 21.296,
                travelDuration: 42.7333,
              },
              {
                destinationIndex: 1,
                originIndex: 8,
                totalWalkDuration: 0,
                travelDistance: 34.653,
                travelDuration: 55.9,
              },
              {
                destinationIndex: 2,
                originIndex: 8,
                totalWalkDuration: 0,
                travelDistance: 26.175,
                travelDuration: 61.6833,
              },
              {
                destinationIndex: 3,
                originIndex: 8,
                totalWalkDuration: 0,
                travelDistance: 7.71,
                travelDuration: 20.8667,
              },
              {
                destinationIndex: 4,
                originIndex: 8,
                totalWalkDuration: 0,
                travelDistance: 16.647,
                travelDuration: 35.9,
              },
              {
                destinationIndex: 5,
                originIndex: 8,
                totalWalkDuration: 0,
                travelDistance: 40.823,
                travelDuration: 70.3667,
              },
              {
                destinationIndex: 6,
                originIndex: 8,
                totalWalkDuration: 0,
                travelDistance: 25.417,
                travelDuration: 48.1833,
              },
              {
                destinationIndex: 7,
                originIndex: 8,
                totalWalkDuration: 0,
                travelDistance: 22.029,
                travelDuration: 41.2333,
              },
              {
                destinationIndex: 8,
                originIndex: 8,
                totalWalkDuration: 0,
                travelDistance: 19.633,
                travelDuration: 39.15,
              },
              {
                destinationIndex: 9,
                originIndex: 8,
                totalWalkDuration: 0,
                travelDistance: 8.64,
                travelDuration: 22.5333,
              },
              {
                destinationIndex: 0,
                originIndex: 9,
                totalWalkDuration: 0,
                travelDistance: 17.578,
                travelDuration: 35.5833,
              },
              {
                destinationIndex: 1,
                originIndex: 9,
                totalWalkDuration: 0,
                travelDistance: 42.633,
                travelDuration: 51.7333,
              },
              {
                destinationIndex: 2,
                originIndex: 9,
                totalWalkDuration: 0,
                travelDistance: 14.027,
                travelDuration: 24.15,
              },
              {
                destinationIndex: 3,
                originIndex: 9,
                totalWalkDuration: 0,
                travelDistance: 45.87,
                travelDuration: 57.5333,
              },
              {
                destinationIndex: 4,
                originIndex: 9,
                totalWalkDuration: 0,
                travelDistance: 28.059,
                travelDuration: 51.45,
              },
              {
                destinationIndex: 5,
                originIndex: 9,
                totalWalkDuration: 0,
                travelDistance: 40.772,
                travelDuration: 69.5667,
              },
              {
                destinationIndex: 6,
                originIndex: 9,
                totalWalkDuration: 0,
                travelDistance: 25.366,
                travelDuration: 47.3833,
              },
              {
                destinationIndex: 7,
                originIndex: 9,
                totalWalkDuration: 0,
                travelDistance: 30.594,
                travelDuration: 38.7333,
              },
              {
                destinationIndex: 8,
                originIndex: 9,
                totalWalkDuration: 0,
                travelDistance: 35.079,
                travelDuration: 60.9333,
              },
              {
                destinationIndex: 9,
                originIndex: 9,
                totalWalkDuration: 0,
                travelDistance: 28.83,
                travelDuration: 55.5833,
              },
            ],
          },
        ],
      },
    ],
    statusCode: 200,
    statusDescription: "OK",
    traceId: "b8b815dd8e6246f7b27bfc1c1a346bbb|PUS0004C56|0.0.0.0|PUS0005C77",
  },
  origins: [
    {
      latitude: "12.9247615985763",
      longitude: "77.59258638039",
      name: "Jayanagara_Bus_Depot",
      type: "depot",
    },
    {
      latitude: "12.9135275952874",
      longitude: "77.4874607488594",
      name: "Kengeri_TTMC_&_Depot_37",
      type: "depot",
    },
    {
      latitude: "12.9038833348821",
      longitude: "77.4733702731167",
      name: "Kengeri_Depot_12",
      type: "depot",
    },
    {
      latitude: "12.955630571984",
      longitude: "77.5958496288577",
      name: "Shantinagara_Depot_3",
      type: "depot",
    },
    {
      latitude: "12.9545508004686",
      longitude: "77.595341990866",
      name: "Shantinagara_Depot_2",
      type: "depot",
    },
    {
      latitude: "12.9203321983344",
      longitude: "77.6443059307887",
      name: "HSR_Layout_Depot_25",
      type: "depot",
    },
    {
      latitude: "12.9412236864562",
      longitude: "77.6252187064832",
      name: "Koramangala_Depot_15_&_TTMC",
      type: "depot",
    },
    {
      latitude: "12.9771795117191",
      longitude: "77.7264533122497",
      name: "Whitefield_(ITPL_Depot_18_&_TTMC)",
      type: "depot",
    },
    {
      latitude: "13.0198261380114",
      longitude: "77.5006369019243",
      name: "Peenya_4th_Phase_Depot_9_&_22",
      type: "depot",
    },
    {
      latitude: "12.8471304741531",
      longitude: "77.6724658836357",
      name: "Electronic_City_Depot_19",
      type: "depot",
    },
  ],
};

const Distance = () => {
  const [data, setData] = useState(mock);
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
    return Object.values(reduce(result, (prev, res) => {
      if(prev[get(origins, `${get(res, 'originIndex')}.name`)]) {
      prev[get(origins, `${get(res, 'originIndex')}.name`)] =  {
        ...prev[get(origins, `${get(res, 'originIndex')}.name`)],
        name: get(origins, `${get(res, 'originIndex')}.name`),
        [get(destinations,`${get(res, 'destinationIndex')}.name` )]: get(res, 'travelDistance'),
      }
    }
      else  {
        prev[get(origins, `${get(res, 'originIndex')}.name`)]={
        name: get(origins, `${get(res, 'originIndex')}.name`),
        [get(destinations,`${get(res, 'destinationIndex')}.name` )]: get(res, 'travelDistance')
        }
      }
       return prev; 
    }, {}))
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
          <Table data = {formatData()}/>
        </div>
      )}
    </div>
  );
};

export default Distance;
