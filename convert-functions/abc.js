const fs = require("fs");

const inputFilePath = "grouped_and_sorted_data.json";

fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const jsonData = JSON.parse(data);
  const sortedData = {};

  for (const id in jsonData) {
    if (jsonData.hasOwnProperty(id)) {
      const times = jsonData[id];
      sortedData[id] = times.sort();
    }
  }

  const outputFilePath = "sorted_output_data.json";

  const outputData = JSON.stringify(sortedData, null, 2);

  fs.writeFile(outputFilePath, outputData, (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
      return;
    }
    console.log("Data saved to sorted_output_data.json");
  });
});
