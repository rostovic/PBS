const fs = require("fs");

const filePath = "shapes.txt"; // Replace with the path to your text file

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  const lines = data.split("\n");
  const dataArray = lines.map((line) => line.split(","));
  const singleShapeData = dataArray
    .filter((array) => array[0] === "5338")
    .map((array) => {
      return {
        latitude: array[1],
        longitude: array[2],
      };
    });
  console.log(singleShapeData);

  const outputFilePath = "shape.json"; // Replace with the desired output file path

  const outputData = JSON.stringify(singleShapeData, null, 2);

  fs.writeFile(outputFilePath, outputData, (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
      return;
    }
    console.log("Data saved to shape.json");
  });
});
