#!/bin/bash

# Check for root privileges
if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root. Please use sudo or switch to root user."
  exit 1
fi

# Paths
DEPLOY_DIR="/var/www/Markdown-Viewer"
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"
CONFIG_NAME="Markdown-Viewer"

# Assuming script lives in NGINX folder, project root is parent dir
PROJECT_ROOT="$(dirname "$(pwd)")"

echo "Removing existing deployment directory: $DEPLOY_DIR"
rm -rf "$DEPLOY_DIR"

echo "Creating deployment directory..."
mkdir -p "$DEPLOY_DIR"

echo "Copying index.html and favicon.ico..."
cp "$PROJECT_ROOT/index.html" "$DEPLOY_DIR/"
cp "$PROJECT_ROOT/favicon.ico" "$DEPLOY_DIR/"

echo "Copying scripts/ directory..."
cp -r "$PROJECT_ROOT/scripts" "$DEPLOY_DIR/"

echo "Copying styles/ directory..."
cp -r "$PROJECT_ROOT/styles" "$DEPLOY_DIR/"

echo "Setting permissions..."
chmod -R 755 "$DEPLOY_DIR"

echo "Enabling site in Nginx..."
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
  echo "Error in Nginx configuration, please fix and try again."
  exit 1
fi

echo "Deployment complete!"
