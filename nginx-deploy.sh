#!/bin/bash

GITHUB_PROJECT_DIR="$(pwd)"
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"
DOMAIN="192.168.1.28"
CERTS_DIR="$GITHUB_PROJECT_DIR/certs"
CONFIG_NAME="Markdown-Viewer"
DEPLOY_DIR="/var/www/Markdown-Viewer"
CREATE_CERTS_SCRIPT="$GITHUB_PROJECT_DIR/Create_Certs.sh"

# Check SSL certs presence and generate if missing
if [[ ! -f "$CERTS_DIR/server.crt" || ! -f "$CERTS_DIR/server.key" ]]; then
  echo "SSL certificate files are missing in $CERTS_DIR."

  if [[ -f "$CREATE_CERTS_SCRIPT" && -x "$CREATE_CERTS_SCRIPT" ]]; then
    echo "Running Create_Certs.sh to generate certificates..."
    bash "$CREATE_CERTS_SCRIPT"

    if [[ ! -f "$CERTS_DIR/server.crt" || ! -f "$CERTS_DIR/server.key" ]]; then
      echo "Failed to generate SSL certificates. Please check Create_Certs.sh for errors."
      exit 1
    fi
  else
    echo "Create_Certs.sh script is missing or not executable. Cannot generate certificates."
    exit 1
  fi
fi

echo "Creating deployment directories if they don't exist..."
mkdir -p "$DEPLOY_DIR" "$DEPLOY_DIR/certs" "$DEPLOY_DIR/assets"

echo "Copying main files to $DEPLOY_DIR..."
cp "$GITHUB_PROJECT_DIR/index.html" "$DEPLOY_DIR/index.html"
cp "$GITHUB_PROJECT_DIR/favicon.ico" "$DEPLOY_DIR/favicon.ico"
cp "$GITHUB_PROJECT_DIR/styles.css" "$DEPLOY_DIR/styles.css"
cp "$GITHUB_PROJECT_DIR/script.js" "$DEPLOY_DIR/script.js"

echo "Copying assets to $DEPLOY_DIR/assets..."
cp -r "$GITHUB_PROJECT_DIR/assets/"* "$DEPLOY_DIR/assets/"

echo "Copying certificates to $DEPLOY_DIR/certs..."
cp "$CERTS_DIR/server.crt" "$DEPLOY_DIR/certs/server.crt"
cp "$CERTS_DIR/server.key" "$DEPLOY_DIR/certs/server.key"

echo "Setting correct permissions for files in $DEPLOY_DIR..."
chmod -R 755 "$DEPLOY_DIR/assets"
chmod -R 755 "$DEPLOY_DIR/certs"
chmod 700 "$DEPLOY_DIR/certs/server.key"
chmod 644 "$DEPLOY_DIR/certs/server.crt"

echo "Enabling the site in Nginx..."
if [[ ! -L "$NGINX_SITES_ENABLED/$CONFIG_NAME" ]]; then
  ln -s "$NGINX_SITES_AVAILABLE/$CONFIG_NAME" "$NGINX_SITES_ENABLED/$CONFIG_NAME"
  echo "Symlink created for $CONFIG_NAME."
else
  echo "Symlink for $CONFIG_NAME already exists."
fi

echo "Testing Nginx configuration..."
if nginx -t; then
  echo "Configuration is valid, reloading Nginx..."
  systemctl reload nginx
else
  echo "There was an error with the Nginx configuration. Please fix and try again."
  exit 1
fi

echo "Testing HTTPS response from https://$DOMAIN/ ..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://localhost/)

if [[ "$HTTP_CODE" == "200" ]]; then
  echo "✅ HTTPS request successful (HTTP 200 OK)"
else
  echo "⚠️ HTTPS request returned status code: $HTTP_CODE"
fi

echo "Deployment complete!"
