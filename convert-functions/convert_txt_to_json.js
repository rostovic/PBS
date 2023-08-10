const fs = require("fs");

const filePath = "stop_times.txt"; // Replace with the path to your text file

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const lines = data.split("\n");
  const extractedData = [];

  lines.forEach((line) => {
    const params = line.split(",");
    if (params.length >= 4) {
      const time = params[1];
      const id = params[3];
      extractedData.push({ time, id });
    }
  });

  const outputFilePath = "extracted_data.txt"; // Replace with the desired output file path

  // Create a string representation of the extracted data
  const outputData = extractedData
    .map((entry) => `${entry.time},${entry.id}`)
    .join("\n");

  // Write the data to the output file
  fs.writeFile(outputFilePath, outputData, (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
      return;
    }
    console.log("Data saved to extracted_data.txt");
  });
});
