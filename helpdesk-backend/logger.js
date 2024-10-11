const fs = require("fs");
const path = require("path");

// Log file path
const logFilePath = path.join(__dirname, "log.txt");

// Function to write directly to the log file
function writeLog(message) {
	const logLine = `${new Date().toISOString()} - ${message}\n`;

	// Write the logLine to the file (appends if file exists)
	fs.appendFile(logFilePath, logLine, (err) => {
		if (err) {
			console.error("Failed to write to log file:", err);
		}
	});
}

module.exports = writeLog;
