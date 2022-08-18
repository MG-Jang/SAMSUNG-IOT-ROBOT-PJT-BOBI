from asyncio import open_connection
import logging
import boto3
from botocore.exceptions import ClientError
import os
import paho.mqtt.client as mqtt


class VoiceMessage():
    def __init__(self):
        super(VoiceMessage, self).__init__()
        self.s3_client = boto3.client('s3')
        self.bucket_name = "bobivoicebucket"
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.connect("i7a208.p.ssafy.io", 1883, 60)

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
        print("mqtt topic " + user_id + "/voice/toweb")
        topic = user_id + "/voice/toweb"
        
        self.mqtt_client.publish(topic, "upload")
        return True

    def download_file(self, file_name):
        object_name = os.path.basename(file_name)
        self.s3_client.download_file(self.bucket_name, object_name, file_name)

'''
voice_mssg = VoiceMessage()
#voice_mssg.download_file(_file_name)
voice_mssg.upload_file("./a208_korean_hello.wav", "testuser")
'''