# ======== BASE ========
FROM node:18 AS base
# our code in our project lives in the docker container
WORKDIR /usr/src/app
# copy the package json into the base step
COPY package*.json ./
# install the dependencies
RUN npm install
# copy the entire project (except for files in dockerignore) into /usr/src/app in the container
COPY . .

# ======== LINT ========
FROM base AS linter
# set the work directory
WORKDIR /usr/src/app
# run the lint script
RUN npm run lint

# ======== BUILD ========
FROM linter AS build
# set the work directory
WORKDIR /usr/src/app
# run the build script
RUN npm run build

# ======== DEV ========
FROM base AS dev
# expose the port to access the app
EXPOSE 3000
# run the start dev command
CMD [ "npm", "run", "start:dev" ]

# ======== PRODUCTION========
FROM node:18 AS production
# set the workdirectory
WORKDIR /usr/src/app
# copy the package json into container
COPY package*.json ./
# install production only dependencies (non devDependencies)
RUN npm install --only=production
# copy the builder dist into the production dist
COPY --from=builder /usr/src/app/dist ./
# expose the port to access the app
EXPOSE 3000
# make the entrypoint script executable
RUN chmod +x /usr/src/app/entrypoint.sh
# execute the entrypoint script
ENTRYPOINT [ "sh", "/usr/src/app/entrypoint.sh" ]