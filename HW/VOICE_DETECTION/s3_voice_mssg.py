import logging
import boto3
from botocore.exceptions import ClientError
import os

_bucket_name = "bobivoicebucket"
_object_name = "ssafy_iot_bobi (1).wav"
_file_name = "ssafy_iot_bobi (1).wav"

class VoiceMessage():
    def __init__(self):
        super(VoiceMessage, self).__init__()
        self.s3_client = boto3.client('s3')
        self.bucket_name = "bobivoicebucket"
    
    def upload_file(self, file_name):
        """Upload a file to an S3 bucket

        :param file_name: File to upload
        :param bucket: Bucket to upload to
        :param object_name: S3 object name. If not specified then file_name is used
        :return: True if file was uploaded, else False
        """
        object_name = os.path.basename(file_name)

        try:
            response = self.s3_client.upload_file(file_name, self.bucket_name, object_name)
        except ClientError as e:
            logging.error(e)
            print("upload failed")
            return False
        print("upload success")
        return True

    def download_file(self, file_name):
        object_name = os.path.basename(file_name)
        self.s3_client.download_file(self.bucket_name, object_name, file_name)

""" voice_mssg = VoiceMessage()
#voice_mssg.download_file(_file_name)
voice_mssg.upload_file(_file_name) """

