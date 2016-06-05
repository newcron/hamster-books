FROM php:5.6.16-apache

# RUN apt-get update && apt-get install -y php5-mysql pdo-mysql && docker-php-ext-install pdo pdo-mysql
RUN docker-php-ext-install pdo pdo_mysql
# RUN cd /etc/apache2/mods-enabled/ && ln -s ../mods-available/rewrite.load rewrite.load
RUN a2enmod headers
RUN a2enmod rewrite

COPY 100-timezones.ini /usr/local/etc/php/conf.d/
COPY 100-hamstersbooks.conf /etc/apache2/sites-enabled/