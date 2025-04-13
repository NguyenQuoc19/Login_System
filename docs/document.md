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
## Configure dotenv:
### Overview:
- **dotenv** loads environment variables from `.env` file into `process.env`
- Keeps sensitive data like API keys and passwords secure
- Should never commit `.env` file to version control
###  Usage:
- Basic Command: **npm i dotenv** (is shorthand for install)
- With **-E, --save-exact**: Installs exact package version without semver range.
- With **@16.5.0**: Specifies the exact version of Express you want to install.
- Used: **npm i --save-exact dotenv@16.5.0**
***-------------------------------------------------------------------------------------------------------------------------------***
## Install Helmet Security:
### Overview:
- **Helmet** helps secure Express apps by setting various HTTP headers
- Protects against common web vulnerabilities
- Recommended for all Express applications
###  Usage:
- Basic Command: `npm i helmet` (is shorthand for install)
- With `-D`, `--save-dev`:
    - Installs packages as devDependencies in your package.json.
    - Used for packages needed only during development, not in production
- With `@8.1.0`: Specifies the exact version of Express you want to install.
- Used: `npm i helmet@8.1.0 --save-dev`

### Basic Setup:
```javascript
// filepath: /Users/nguyenquoc/Desktop/NodeJS/login/src/app.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const app = express();

// Add Helmet middleware early in your middleware stack
app.use(helmet());

// ...existing code...
```
### Security Headers Added:
- **Content-Security-Policy**: Controls allowed content sources
- **X-Frame-Options**: Prevents clickjacking
- **X-XSS-Protection**: Stops cross-site scripting attacks
- **X-Content-Type-Options**: Prevents MIME-type sniffing
- **Referrer-Policy**: Controls referrer information
### Custom Configuration:
```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"]
    }
  }
}));
```
***-------------------------------------------------------------------------------------------------------------------------------***
## Install nodemon:
### Overview:
- **nodemon** monitors source code changes and automatically restarts Node.js applications
- Improves development workflow by eliminating manual server restarts
- Used as a development dependency only
###  Usage:
- Basic Command: `npm i nodemon` (is shorthand for install)
- With `-D`, `--save-dev`:
    - Installs packages as devDependencies in your package.json.
    - Used for packages needed only during development, not in production
- With `@3.1.9`: Specifies the exact version of Express you want to install.
- Used: `sudo npm i nodemon@3.1.9 --save-dev`
### Basic Setup:
```javascript
// Setup in package.json:
{
  scripts: {
    start: "nodemon server.js"
  }
}
// ...existing code...
```
***-------------------------------------------------------------------------------------------------------------------------------***
## Install Morgan Logger:
### Overview:
- HTTP request logger middleware for Node.js
- Logs requests, responses, and other HTTP details
- Useful for debugging and monitoring
###  Usage:
- Basic Command: `npm i morgan` (is shorthand for install)
- With `-D`, `--save-dev`:
    - Installs packages as devDependencies in your package.json.
    - Used for packages needed only during development, not in production
- With `@1.10.0`: Specifies the exact version of Express you want to install.
- Used: `sudo npm i morgan@1.10.0 --save-dev`
### Basic Setup:
```javascript
// Setup in package.json:
const morgan = require('morgan');
app.use(morgan('dev'));
// ...existing code...
```
***-------------------------------------------------------------------------------------------------------------------------------***
## Install Compression:
### Overview:
- Compresses response bodies for all requests
- Reduces payload size and bandwidth usage
- Improves application performance
###  Usage:
- Basic Command: `npm i compression` (is shorthand for install)
- With `-D`, `--save-dev`:
    - Installs packages as devDependencies in your package.json.
    - Used for packages needed only during development, not in production
- With `@1.8.0`: Specifies the exact version of Express you want to install.
- Used: `sudo npm i compression@1.8.0 --save-dev`
### Basic Setup:
```javascript
// Setup in package.json:
const compression = require('compression');
app.use(compression());
// ...existing code...
```
***-------------------------------------------------------------------------------------------------------------------------------***
