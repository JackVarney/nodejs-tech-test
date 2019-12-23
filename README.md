# To run project

- Ensure you have node installed
- npm install
- npm run build
- node dist

# To run tests

- Ensure you have node installed
- npm install
- npm test - to run tests once
- npm test:watch - to leave test runner open

# Architecture decisions

All new edges live in the API folder e.g api/edge (one could argue this is premature)

Routing and requests are handled in edge.controller.ts files

- all requests with a body validated with the validation middleware

Business logic would be handled in a edge.service.ts files

Data storage in edge.store.ts file, extending on the base store in core.
Alternatively if stores end up shared between services, might make sense to move them into something like a 'repositories' folder.

- Stores should be injected/drilled down into controllers and services, so they can be easily tested (Not necessary right now, but a good practice to start with)

Shared types live in the types folder.

Shared code lives in the core folder.

# How this could be deployed at scale?

Build docker container
Create an App Service on Azure
Deploy container to app service
Azure App Services' supports multiple options to scale out:

- manually (you set number of containers running)
- based on metrics (e.g. scale when CPU usage hits a certain %)

# How the data could be stored in a SQL database

Create an instance of a SQL server of your favourite flavour
Create a database with a things table
Install your favourite nodejs sql package
Refactor store.ts to now use your database as its data storage
