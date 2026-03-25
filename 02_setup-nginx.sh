#!/bin/bash

set -e

echo "🚀 Installing NGINX..."
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx

echo "📁 Creating NGINX config files..."

# codersdiary
sudo tee /etc/nginx/sites-available/codersdiary >/dev/null <<EOF
server {
    listen 80;
    server_name codersdiary.online;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

# ror
sudo tee /etc/nginx/sites-available/ror.codersdiary >/dev/null <<EOF
server {
    listen 80;
    server_name ror.codersdiary.online;

    location / {
        proxy_pass http://localhost:3002;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

# n8n
sudo tee /etc/nginx/sites-available/n8n.codersdiary >/dev/null <<EOF
server {
    listen 80;
    server_name n8n.codersdiary.online;

    location / {
        proxy_pass http://localhost:5678;

        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;

        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
EOF

echo "🔗 Enabling sites..."

sudo ln -sf /etc/nginx/sites-available/codersdiary /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/ror.codersdiary /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/n8n.codersdiary /etc/nginx/sites-enabled/

echo "🧹 Removing default config..."
sudo rm -f /etc/nginx/sites-enabled/default

echo "🧪 Testing NGINX config..."
sudo nginx -t

echo "🔄 Restarting NGINX..."
sudo systemctl restart nginx

echo "✅ DONE! Your domains should now be live."
