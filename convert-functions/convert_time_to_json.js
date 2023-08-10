const fs = require("fs");

const filePath = "extracted_data.txt"; // Replace with the path to your text file

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const lines = data.split("\n");
  const groupedData = {};

  lines.forEach((line) => {
    const [time, id] = line.split(",");
    if (!groupedData[id]) {
      groupedData[id] = [];
    }
    groupedData[id].push(time);
  });

  const sortedIds = Object.keys(groupedData).sort((a, b) => b - a); // Sort in descending order
  const sortedGroupedData = {};

  sortedIds.forEach((id) => {
    sortedGroupedData[id] = groupedData[id];
  });

  const outputFilePath = "grouped_and_sorted_data.json"; // Replace with the desired output file path

  const outputData = JSON.stringify(sortedGroupedData, null, 2);

  // Write the data to the output file
  fs.writeFile(outputFilePath, outputData, (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
      return;
    }
    console.log("Data saved to grouped_and_sorted_data.json");
  });
});
