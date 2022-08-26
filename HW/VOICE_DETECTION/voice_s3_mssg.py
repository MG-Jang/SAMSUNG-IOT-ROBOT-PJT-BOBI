'''
# Class for save and upload file to S3
# 
# Modification history
#   Created by Dongwon Kim on 04 Aug, 2022 
#   Modified by Dongwon Kim on 11 Aug, 2022
#
'''
from asyncio import open_connection
import logging
import boto3
from botocore.exceptions import ClientError
import os
import paho.mqtt.client as mqtt
import mysql.connector
import datetime


class VoiceMessage():
    """Upload and download voice file to/from S3
    """
    def __init__(self):
        super(VoiceMessage, self).__init__()
        self.s3_client = boto3.client('s3')
        self.bucket_name = "bobivoicebucket"
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.connect("[server ip]", 1883, 60)
        self.db = mysql.connector.connect(host='[server ip]', port = '3306', user='pjt_bobi', password='[db pw]', database='bobi', auth_plugin='mysql_native_password')
        self.cur = self.db.cursor()
        
    def upload_file(self, file_name, user_id):
        """Upload a file to an S3 bucket

        :param file_name: File to upload
        :param userid: user id for mqtt
        :return: True if file was uploaded, else False
        """
        object_name = os.path.basename(file_name)

        try:
            response = self.s3_client.upload_file(
                file_name, self.bucket_name, object_name)
        except ClientError as e:
            logging.error(e)
            print("upload failed")
            return False
        print("upload success")
        # mqtt
        print("mqtt topic " + user_id + "/voice/toweb")
        topic = user_id + "/voice/toweb"
        
        # db
        time = str(datetime.datetime.now().strftime('%Y-%m-%d   %I:%M:%S'))
        query = "insert into voices_voicecheck(datetime, is_checked) values (%s, %s)"
        value = (time, 0)

        self.cur.execute(query, value)
        self.db.commit()
        
        self.mqtt_client.publish(topic, "upload")
        return True

    def download_file(self, file_name):
        object_name = os.path.basename(file_name)
        self.s3_client.download_file(self.bucket_name, object_name, file_name)
