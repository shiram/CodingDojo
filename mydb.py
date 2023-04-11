# pip install mysql-connector-python

import mysql.connector

dataBase = mysql.connector.connect(
    host = 'localhost',
    user = 'sedward@localhost',
    passwd = '4thMAY04@1992'
)

#prepare cursor object
cursorObject = dataBase.cursor()

#create a database
res = cursorObject.execute("CREATE DATABASE elderco")

print("All Done -- with response")
print(res)