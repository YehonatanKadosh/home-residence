# use node based image with alpine distribution
FROM node:14.16.0-alpine3.13 AS development
# set working directory to /usr/src/app
WORKDIR /usr/src/app
# copy needed 3rd party dependancies to workdir
COPY package*.json ./
# copy needed 3rd party dependancies to workdir
RUN npm install glob rimraf
RUN npm install --only=development
# copy the rest of the code
COPY . .
# build the app
RUN npm run build


# use node based image with alpine distribution
FROM node:14.16.0-alpine3.13 as production
# set env to production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# create a user 'app' and group for security reasons
RUN addgroup app && adduser -S -G app app
# set working directory to /app
WORKDIR /app
# copy needed 3rd party dependancies to workdir
COPY ./package*.json .
# install them in node_modules
RUN npm install --only=prod
# copy the rest of the code
COPY . .
# get the build folder
COPY --from=development /usr/src/app/dist ./dist
# give app premissions 
RUN chown -R app:app /app
# enter as app user
USER app
# document the exposed port
EXPOSE 3000
# start the react app using npm start
CMD ["node", "dist/main"]