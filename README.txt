Node.js and NPM Installation
Download Node.js from http://nodejs.org/download/

MySQL installation
Download Mysql Workbench from http://dev.mysql.com/downloads/tools/workbench/
After downloading Mysql workbench add the my sql server path to the path system environment variable
which would be something like "C:\Program Files\MySQL\MySQL Server 5.6\bin"


Installation & Setup
This assumes you already have node.js & mysql installed.


git clone http://github.com/sattarab/blog.git
After cloning:
1. npm install
2. node app

To run Database scripts
mysql -u root -p
Enter password as password if you haven't changed it
source createDatabase.sql(this is to be done before starting the node app i.e. before node app)
source seed.sql(this is to be done after node app i.e. app is up and running)
