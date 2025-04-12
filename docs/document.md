# Node.js Documentation:
***-------------------------------------------------------------------------------------------------------------------------------***
## Innit package.json:
### Overview:
- Initializes a Node.js project by creating a package.json file, which holds key project metadata and dependencies.
### Usage:
- Basic Command: **npm init** — Runs interactively, asking for project details.
- With **-y**  Flag: **npm init -y** — Auto-generates package.json with defaults, skipping questions.
***-------------------------------------------------------------------------------------------------------------------------------***
## Install node_module:
### Overview:
- Installs the Express.js framework into your Node.js project.
###  Usage:
- Basic Command: **npm i express** (is shorthand for install)
- With **-E, --save-exact**: Installs exact package version without semver range.
- With **@5.1.0**: Specifies the exact version of Express you want to install.
- Used: **npm i --save-exact express@5.1.0**
***-------------------------------------------------------------------------------------------------------------------------------***
## Generate .gitignore:
### Overview:
- A `.gitignore` file specifies which files and directories Git should ignore when tracking changes.
### Common Entries:
- **node_modules/**: Ignores dependency directory
- **.env**: Ignores environment variable files
- **logs/**: Ignores log files
- **.DS_Store**: Ignores macOS system files
### Usage:
- Create file: `touch .gitignore`
- Add patterns to ignore specific files/folders
***-------------------------------------------------------------------------------------------------------------------------------***
## Create server.js:
### Overview:
- Entry point for the Node.js application
- Sets up and starts the Express server
- Configures port and basic server settings
### Key Components:
- **Import app**: `const app = require('./src/app')` - Imports Express application setup
- **Port config**: `const port = 3000` - Defines server port
- **Start server**: `app.listen()` - Starts server on specified port
### Basic Setup:
```javascript
const app = require('./src/app');ßß
const port = 3000;

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
```
### Usage:
- Start server: **node server.js**
- Or using script: **npm start** (if defined in package.json)
***-------------------------------------------------------------------------------------------------------------------------------***
## Create app.js:
### Overview:
- Contains Express application configuration
- Sets up middleware and routes
- Handles core application setup
### Key Components:
- **Express setup**: Creates Express application instance
- **Middleware config**: Body parser, CORS, etc.
- **Route definitions**: API endpoints
- **Error handling**: Global error middleware
### Basic Setup:
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

module.exports = app;
```

### Location:
- Create in: `src/app.js`
- Command: `mkdir src && touch src/app.js`

***-------------------------------------------------------------------------------------------------------------------------------***