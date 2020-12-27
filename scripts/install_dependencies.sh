sudo yum update
curl --silent --location https://rpm.nodesource.com/setup_14.x | bash -
sudo yum install httpd nodejs -y
sudo service httpd start
node -v
npm -v
npm install -g aws-sdk pm2 dotenv
npm install