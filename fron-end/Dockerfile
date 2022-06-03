# Stage 1
FROM node:14 as build-stage
WORKDIR /react_full
COPY package.json .
RUN npm install
COPY . .
# ARG REACT_APP_API_BASE_URL
# ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
CMD [ "npm", "start" ]
# RUN npm run build
# # Stage 2
# FROM nginx:1.17.0-alpine
# COPY --from=build-stage /react_full/build /usr/share/nginx/html
EXPOSE 80
# CMD nginx -g 'daemon off;'