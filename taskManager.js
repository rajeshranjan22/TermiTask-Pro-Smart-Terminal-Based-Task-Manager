const fs = require('fs');
const path = require('path');
const { isValidDate, loadPreferences, savePreferences } = require('./utils');

const tasksPath = path.join(__dirname, 'tasks.json');

function loadTasks() {
    if (!fs.existsSync(tasksPath)) return [];
    return JSON.parse(fs.readFileSync(tasksPath, 'utf8'));
}

function saveTasks(tasks) {
    fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
}

function addTask(title, dueDate) {
    if (!title.trim()) return console.log("❌ Title cannot be empty.");
    if (!isValidDate(dueDate)) return console.log("❌ Invalid due date format (YYYY-MM-DD).");

    const tasks = loadTasks();
    const newTask = {
        id: tasks.length + 1,
        title,
        dueDate,
        status: 'pending',
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`✅ Task "${title}" added.`);
}

function listTasks() {
    const tasks = loadTasks();
    const prefs = loadPreferences();

    const filtered = tasks.filter(t => {
        if (prefs.filter === 'all') return true;
        return t.status === prefs.filter;
    });

    if (filtered.length === 0) return console.log("📭 No tasks to show.");

    filtered.forEach((t, i) => {
        console.log(`${i + 1}. ${t.title} | Due: ${t.dueDate} | Status: ${t.status}`);
    });
}

function completeTask(idOrTitle) {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id == idOrTitle || t.title.toLowerCase() === idOrTitle.toLowerCase());
    if (!task) return console.log("❌ Task not found.");
    if (task.status === 'completed') return console.log("⚠️ Already completed.");
    task.status = 'completed';
    saveTasks(tasks);
    console.log(`✅ "${task.title}" marked as completed.`);
}

function setPreference(filter) {
    const allowed = ['all', 'completed', 'pending'];
    if (!allowed.includes(filter)) {
        console.log("❌ Invalid filter. Use one of: all, completed, pending");
        return;
    }
    savePreferences({ filter });
    console.log(`✅ Preference set to "${filter}"`);
}

module.exports = {
    addTask,
    listTasks,
    completeTask,
    setPreference
};
