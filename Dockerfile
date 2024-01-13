FROM caddy:latest

ADD build /var/www/html/registration-web/

ADD caddy.conf /etc/caddy/Caddyfile
