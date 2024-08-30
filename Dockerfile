# -------- BASE NODE ---------
FROM node:18 AS base
# our code in our project lives in the docker container
WORKDIR /usr/src/app
# copy the package.json into the container
COPY package.json .

# -------- DEPENDENCIES ---------
FROM base AS dependencies
# install prod dependencies only
RUN npm install --only=production
# copy production node modules for release
RUN cp -R node_modules prod_node_modules
# install all the dependencies
RUN npm install

# -------- TEST ---------
FROM dependencies AS test
# copy the entire project (except for files in dockerignore) into /usr/src/app in the container
COPY . .
# make migrate script executable
RUN chmod +x /usr/src/app/migrate.sh
# run the entrypoint
ENTRYPOINT [ "sh", "/usr/src/app/migrate.sh" ]
# run the linter and the tests
# RUN npm run test

# -------- RELEASE ---------
FROM base AS release
# copy production node_modules
COPY --from=dependencies /usr/src/app/prod_node_modules ./node_modules
# copy entire project
COPY . .
# make entrypoint executable
RUN chmod +x /usr/src/app/entrypoint.sh
# expose project port
EXPOSE 3000
# start the project
ENTRYPOINT [ "sh", "/usr/src/app/entrypoint.sh" ]