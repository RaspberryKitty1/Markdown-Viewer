#!/bin/bash

# ------------------------------------------------------------------
# Markdown Viewer Deployment Script for NGINX
# ------------------------------------------------------------------

# 🔐 Ensure root privileges, escalate if not
if [[ $EUID -ne 0 ]]; then
  echo "🔐 Root privileges required. Re-running with sudo..."
  exec sudo "$0" "$@"
fi

# 📁 Resolve paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DEPLOY_DIR="/var/www/Markdown-Viewer"
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"
CONFIG_NAME="Markdown-Viewer"

echo "📦 Deploying Markdown Viewer..."
echo "🔍 Project root: $PROJECT_ROOT"
echo "📁 Target dir:   $DEPLOY_DIR"

# 🧹 Clean previous deploy
if [[ -d "$DEPLOY_DIR" ]]; then
  echo "🧹 Removing old deployment at $DEPLOY_DIR"
  rm -rf "$DEPLOY_DIR"
fi

# 📂 Create new target
mkdir -p "$DEPLOY_DIR"

# 📄 Copy core files
cp "$PROJECT_ROOT/index.html" "$DEPLOY_DIR/"
cp "$PROJECT_ROOT/favicon.ico" "$DEPLOY_DIR/"

# 📁 Copy directories
cp -r "$PROJECT_ROOT/scripts" "$DEPLOY_DIR/"
cp -r "$PROJECT_ROOT/styles" "$DEPLOY_DIR/"

# 🔒 Permissions
chmod -R 755 "$DEPLOY_DIR"

# 🔗 Link NGINX config
if [[ ! -L "$NGINX_SITES_ENABLED/$CONFIG_NAME" ]]; then
  echo "🔗 Enabling NGINX site '$CONFIG_NAME'..."
  ln -s "$NGINX_SITES_AVAILABLE/$CONFIG_NAME" "$NGINX_SITES_ENABLED/$CONFIG_NAME"
else
  echo "ℹ️ NGINX site '$CONFIG_NAME' already enabled."
fi

# ✅ Test and reload
echo "🧪 Testing NGINX config..."
if nginx -t; then
  echo "✅ Reloading NGINX..."
  systemctl reload nginx
  echo "🚀 Deployment successful!"
else
  echo "❌ NGINX configuration test failed. Please fix and retry."
  exit 1
fi
