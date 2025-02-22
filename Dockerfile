# Stage 1: Build the Angular app
FROM node:18-alpine AS build          
WORKDIR /app                   
COPY package*.json ./      
RUN npm install          

COPY . .              
RUN npm run build       

# Stage 2: Serve the app using Nginx
FROM nginx:alpine 
COPY --from=build /app/dist/docker-multi-service-app/browser /usr/share/nginx/html

EXPOSE 80                     
CMD ["nginx", "-g", "daemon off;"] 


