class PomodoroTimer {
    constructor() {
        this.minutes = 25;
        this.seconds = 0;
        this.isRunning = false;
        this.timer = null;
        this.tasks = [];
        
        this.initializeElements();
        this.loadTasks();
        this.setupEventListeners();
    }

    initializeElements() {
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.taskList = document.getElementById('taskList');
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timer = setInterval(() => this.updateTimer(), 1000);
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timer);
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
        }
    }

    reset() {
        this.pause();
        this.minutes = 25;
        this.seconds = 0;
        this.updateDisplay();
    }

    updateTimer() {
        if (this.seconds === 0) {
            if (this.minutes === 0) {
                this.reset();
                this.playNotification();
            } else {
                this.minutes--;
                this.seconds = 59;
            }
        } else {
            this.seconds--;
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.minutesDisplay.textContent = String(this.minutes).padStart(2, '0');
        this.secondsDisplay.textContent = String(this.seconds).padStart(2, '0');
    }

    playNotification() {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play();
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        if (taskText) {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            this.tasks.push(task);
            this.saveTasks();
            this.renderTasks();
            this.taskInput.value = '';
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    renderTasks() {
        this.taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskElement.innerHTML = `
                <span onclick="pomodoro.toggleTask(${task.id})">${task.text}</span>
                <button onclick="pomodoro.deleteTask(${task.id})">Delete</button>
            `;
            this.taskList.appendChild(taskElement);
        });
    }

    saveTasks() {
        chrome.storage.local.set({ tasks: this.tasks });
    }

    loadTasks() {
        chrome.storage.local.get(['tasks'], (result) => {
            this.tasks = result.tasks || [];
            this.renderTasks();
        });
    }
}

const pomodoro = new PomodoroTimer(); 