FROM node:alpine AS build
COPY ./aquila-ui /app
WORKDIR /app
RUN npm install -g @angular/cli
RUN npm install
RUN ng build

FROM nginx
COPY --from=build  /app/dist/aquila-ui/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

