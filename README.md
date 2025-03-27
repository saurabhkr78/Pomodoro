# Floating Pomodoro Timer Chrome Extension

A Chrome extension that provides a floating Pomodoro timer that stays visible across all browser tabs, helping you maintain focus and productivity while browsing.

## Features

- **Floating Timer**: The timer remains visible and functional across all browser tabs
- **Task Management**: Add, edit, and delete tasks with a clean interface
- **Persistent Storage**: Tasks are saved and persist between browser sessions
- **Audio Notifications**: Get notified when your Pomodoro session ends
- **Modern UI**: Clean and intuitive interface design
- **Cross-Tab Synchronization**: Timer state is synchronized across all tabs

## Installation

### From Source
1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

### Timer Controls
- **Start**: Begin the Pomodoro timer (25 minutes)
- **Pause**: Pause the current session
- **Reset**: Reset the timer to 25:00

### Task Management
- **Add Task**: Enter a task in the input field and click "Add" or press Enter
- **Complete Task**: Click on a task to mark it as complete
- **Delete Task**: Click the "Delete" button next to a task to remove it

### Features
- The timer continues running even when you switch tabs
- Tasks are automatically saved and persist between sessions
- Audio notification plays when the timer completes
- The extension icon shows the current timer state

## Technical Details

### Files Structure
```
pomodoro/
├── manifest.json      # Extension configuration
├── popup.html        # Main UI interface
├── popup.css         # Styling for the interface
├── popup.js          # Timer and task management logic
├── background.js     # Background script for cross-tab functionality
└── icons/            # Extension icons
    ├── icon16.png    # 16x16 icon
    ├── icon48.png    # 48x48 icon
    └── icon128.png   # 128x128 icon
```

### Dependencies
- Chrome Extension APIs
- HTML5 Canvas (for icon generation)

## Development

### Building Icons
To generate the extension icons:
1. Install Node.js dependencies:
   ```bash
   npm install
   ```
2. Run the icon generation script:
   ```bash
   node generate_icons.js
   ```

### Modifying the Extension
1. Make your changes to the source files
2. Reload the extension in Chrome:
   - Go to `chrome://extensions/`
   - Click the refresh icon on the extension card

## Contributing
Feel free to submit issues and enhancement requests!

## License
This project is licensed under the MIT License - see the LICENSE file for details.
