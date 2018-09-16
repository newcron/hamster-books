FROM php:7.2-apache

RUN apt-get update && apt-get install -y libxml2 libxml2-dev
RUN docker-php-ext-install pdo pdo_mysql soap
# RUN cd /etc/apache2/mods-enabled/ && ln -s ../mods-available/rewrite.load rewrite.load
RUN a2enmod headers
RUN a2enmod rewrite

RUN rm /etc/apache2/sites-enabled/000-default.conf
COPY 100-timezones.ini /usr/local/etc/php/conf.d/
COPY 100-hamstersbooks.conf /etc/apache2/sites-enabled/
