const readline = require('readline');
const {
    addTask,
    listTasks,
    completeTask,
    setPreference
} = require('./taskManager');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("📘 Welcome to TaskCLI (L2 Edition)");
console.log("Type `help` to see available commands.");

function prompt() {
    rl.question('\n> ', (input) => {
        const command = input.trim();

        switch (command) {
            case 'add-task':
                rl.question('Title: ', title => {
                    rl.question('Due Date (YYYY-MM-DD): ', due => {
                        addTask(title, due);
                        prompt();
                    });
                });
                break;

            case 'list-tasks':
                listTasks();
                prompt();
                break;

            case 'complete-task':
                rl.question('Task ID or Title: ', id => {
                    completeTask(id);
                    prompt();
                });
                break;

            case 'set-preference':
                rl.question('Set filter (all, completed, pending): ', filter => {
                    setPreference(filter.toLowerCase());
                    prompt();
                });
                break;

            case 'help':
                console.log(`
Available Commands:
  add-task            → Add a new task
  list-tasks          → List tasks (filtered by preference)
  complete-task       → Mark task as completed
  set-preference      → Set task list filter (all, completed, pending)
  help                → Show this menu
  exit                → Exit the application
                `);
                prompt();
                break;

            case 'exit':
                console.log("👋 Goodbye!");
                rl.close();
                break;

            default:
                console.log("❌ Unknown command. Type `help` for options.");
                prompt();
        }
    });
}

prompt();
