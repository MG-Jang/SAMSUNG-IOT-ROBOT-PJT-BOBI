import mysql.connector

db = mysql.connector.connect(host='i7a208.p.ssafy.io', port = '3306', user='pjt_bobi', password='mysql989312bobi#', database='bobi', auth_plugin='mysql_native_password')
cur = db.cursor()

#query
cur.execute("select * from bobi_robot order by robot_id desc limit 1")

exp = None

#print
for (robot_id, exp, level) in cur:
   exp = exp 

print(exp)
cur.close()
db.close()
