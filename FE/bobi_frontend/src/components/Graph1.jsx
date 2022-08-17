import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

function Graph1() {
  // const [results, setResults] = useState([]);
  const [humidities, setHumidities] = useState([]);

  const series = [
    {
      name: "습도",
      data: humidities,
    },
  ];

  const options = {
    colors: ["#99CCFF"],
    chart: {
      height: 100,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 7, 5],
      curve: "straight",
      dashArray: [0, 8, 5],
    },
    // title: {
    //   text: "",
    //   align: "left",
    // },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - " +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          ""
        );
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: [
        "10분 전",
        "9분 전",
        "8분 전",
        "7분 전",
        "6분 전",
        "5분 전",
        "4분 전",
        "3분 전",
        "2분 전",
        "1분 전",
      ],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  useEffect(() => {
    fetch("https://i7a208.p.ssafy.io/api/v1/sensors/")
      .then((response) => response.json())
      .then((resultsList) => {
        // console.log(resultsList)
        const start = resultsList.length - 10;
        const end = resultsList.length;
        // console.log(start, end)
        const newList = resultsList.slice(start, end);
        const humidity = newList.map((list) => list.humidity);
        setHumidities(humidity);
        // console.log(temperatures)
        // console.log(newList[0].temperature)
        // setResults(newList);
      });
    // setSensors()
  });

  return (
    <>
      <ApexCharts
        options={options}
        series={series}
        type="line"
        height={180}
        width="90%"
      />
      {/* <ul>
        {this.state.results.map((result) => (
          <li key={result.sensor_id}>{result.humidity}</li>
        ))}
      </ul> */}
    </>
  );
}

export default Graph1;
