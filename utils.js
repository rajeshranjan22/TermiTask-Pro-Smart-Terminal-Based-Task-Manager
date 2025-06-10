const fs = require('fs');
const path = require('path');
const prefPath = path.join(__dirname, 'preferences.json');

function isValidDate(dateStr) {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !isNaN(Date.parse(dateStr));
}

function loadPreferences() {
    if (!fs.existsSync(prefPath)) return { filter: "all" };
    return JSON.parse(fs.readFileSync(prefPath, 'utf8'));
}

function savePreferences(prefs) {
    fs.writeFileSync(prefPath, JSON.stringify(prefs, null, 2));
}

module.exports = { isValidDate, loadPreferences, savePreferences };
