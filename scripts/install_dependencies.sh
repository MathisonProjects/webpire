sudo yum install httpd -y
sudo service httpd start
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
npm install -g aws-sdk pm2 dotenv
npm install