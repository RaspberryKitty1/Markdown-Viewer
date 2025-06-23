#!/bin/bash

CERT_DIR="./certs"
DOMAIN="192.168.1.28"
VPN_DOMAIN="10.0.0.1"
DAYS_VALID=3652
CUSTOM_DOMAIN="raspberry.lan"

mkdir -p "$CERT_DIR"

echo "Generating Root CA..."
openssl req -x509 -new -nodes -keyout "$CERT_DIR/rootCA.key" -out "$CERT_DIR/rootCA.crt" -sha256 -days "$DAYS_VALID" 

echo "Generating Private Key for Server..."
openssl genrsa -out "$CERT_DIR/server.key" 2048

echo "Creating Certificate Signing Request (CSR)..."
openssl req -new -key "$CERT_DIR/server.key" -out "$CERT_DIR/server.csr" \
  -subj "/C=US/ST=Local/L=Local/O=LocalServer/CN=$CUSTOM_DOMAIN"

echo "Creating the SAN config..."
cat > "$CERT_DIR/san.cnf" <<EOF
[ v3_ext ]
basicConstraints = CA:FALSE
subjectAltName = IP:$DOMAIN, IP:$VPN_DOMAIN, DNS:localhost, DNS:pi.hole, DNS:$CUSTOM_DOMAIN
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
EOF

echo "Signing the Server Certificate with Root CA and SAN..."
openssl x509 -req -in "$CERT_DIR/server.csr" -CA "$CERT_DIR/rootCA.crt" -CAkey "$CERT_DIR/rootCA.key" -CAcreateserial \
  -out "$CERT_DIR/server.crt" -days "$DAYS_VALID" -sha256 -extfile "$CERT_DIR/san.cnf" -extensions v3_ext

echo "Creating the Full Chain Certificate (server + CA)..."
cat "$CERT_DIR/server.crt" "$CERT_DIR/rootCA.crt" > "$CERT_DIR/fullchain.pem"

echo "Certificates generated in $CERT_DIR:"
ls -l "$CERT_DIR"

echo "Import '$CERT_DIR/rootCA.crt' into your browser and trust it as a CA."

