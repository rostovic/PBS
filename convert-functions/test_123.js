const fs = require("fs");

const jsonData = require("./sortirani_json.json");

const transformedData = [];

for (const id in jsonData) {
  if (jsonData.hasOwnProperty(id)) {
    const times = jsonData[id];
    transformedData.push({ id: parseInt(id), times });
  }
}

const outputFilePath = "transformed_data.txt"; // Replace with the desired output file path

const outputData = JSON.stringify(transformedData, null, 2);

// Write the data to the output file
fs.writeFile(outputFilePath, outputData, (err) => {
  if (err) {
    console.error("Error writing to the file:", err);
    return;
  }
  console.log("Transformed data saved to transformed_data.txt");
});
