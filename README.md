# DHIS2 Dashboard Viewer

This is a React application that fetches and displays a list of dashboards available to a DHIS2 user. It allows you to view details of each dashboard and its items, filter dashboard items by type, and star your favorite dashboards.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Folder Structure](#folder-structure)
- [Testing](#testing)

## Features

- Fetch and display a list of dashboards.
- Expand/collapse dashboard cards.
- View dashboard details and dashboard items.
- Filter dashboard items by type (e.g., visualization, map, text).
- Star your favorite dashboards.
- Persist starred dashboard states on reload.

## Demo

A live demo of the DHIS2 Dashboard Viewer is available at [Demo Link](https://6548d5f2f8dab403ac10bfd6--eloquent-mandazi-57f8f2.netlify.app/).

## Getting Started

### Prerequisites

To run the DHIS2 Dashboard Viewer on your local machine, you need to have the following software and tools installed:

- Node.js (version x.x.x)
- npm (version x.x.x)

### Installation

Follow these steps to install and run the DHIS2 Dashboard Viewer:

1. Clone the repository:

   ```bash
   git clone https://github.com/Chisomchima/dhis2-project

   ```

2. Navigate to the project directory:

   ```bash
   cd dhis2-project

   ```

3. Install dependencies:

   ```bash
   npm install

   ```

4. Start the development server:

   ```bash
    npm start
   ```

## Configuration

The DHIS2 Dashboard Viewer can be configured using environment variables or configuration files. You can customize the following:

### Environment Variables

You can define environment variables to configure API endpoints.

    ```bash
    REACT_APP_BASE_URL=https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5

## Folder Structure

The project is organized with the following folder structure:

- `src/`: Contains the main source code for the DHIS2 Dashboard Viewer.
  - `components/`: React components used in the application.
  - `service.ts`: API service for fetching dashboard data.
  - `utils/`: Utility files including interfaces and constants.
  - `test/`: Tests for the application.
- `public/`: Contains public assets and the `index.html` file.
- `node_modules/`: Node.js modules and dependencies.
- `package.json`: Project configuration and dependencies.
- `README.md`: This documentation.

Feel free to explore the source code and make modifications as needed.

## Testing

I have included tests for the components in the src/tests directory. You can run tests using the following command:

```bash
 npm test
```
