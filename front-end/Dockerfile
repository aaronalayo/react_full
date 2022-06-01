# get the base node image
FROM node:17

# set the working dir for container
WORKDIR /front-end

# copy the json file first
COPY /package.json /front-end
# install npm dependencies
RUN npm install

# copy other project files
COPY . .

# build the folder
CMD [ "npm", "run", "start" ]