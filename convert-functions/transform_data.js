const fs = require("fs");

const jsonData = require("./sorted_output_data.json");

const transformedData = [];

for (const id in jsonData) {
  if (jsonData.hasOwnProperty(id)) {
    const times = jsonData[id];
    transformedData.push({ id: parseInt(id), times });
  }
}

const outputFilePath = "transformed_data.txt";
const outputData = JSON.stringify(transformedData, null, 2);

fs.writeFile(outputFilePath, outputData, (err) => {
  if (err) {
    console.error("Error writing to the file:", err);
    return;
  }
  console.log("Transformed data saved to transformed_data.txt");
});
