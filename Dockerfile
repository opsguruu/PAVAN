# write a base image i can use: nginx, httpd, php-apache..etc
FROM nginx:latest

#copy all the files/code into the image on a particular directory.
COPY . /usr/share/nginx/html

#COPY <file path> /var/www/html

EXPOSE 80

#RUN sed -i 's/listen 80;/listen 8080' /etc/nginx/conf.d/default.conf
