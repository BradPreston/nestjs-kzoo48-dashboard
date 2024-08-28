FROM node:18

# our code in our project lives in the docker container
WORKDIR /usr/src/app

# copy the entire project (except for files in dockerignore) into /usr/src/app in the container
COPY . .

RUN npm install

RUN chmod +x /usr/src/app/entrypoint.sh

EXPOSE 3000

# CMD ["npm", "run", "start:dev"]
ENTRYPOINT [ "sh", "/usr/src/app/entrypoint.sh" ]