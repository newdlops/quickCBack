FROM node:18
LABEL authors="ki-younglee"

#App Dir
WORKDIR /usr/src/app

#Package Dependency
COPY ./package.json .
ADD ./build .

RUN npm install
#RUN npm install -g nodemon

EXPOSE 3000

# ENTRYPOINT ["nodemon","-w" ,"./","./app.js"]
#ENTRYPOINT ["sh"]
ENTRYPOINT ["node", "./src/app.js"]
