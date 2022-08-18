import logging
import boto3
from botocore.exceptions import ClientError
import os

_bucket_name = "bobivoicebucket"
_object_name = "ssafy_iot_bobi (1).wav"
_file_name = "ssafy_iot_bobi (1).wav"

def upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True


s3 = boto3.client('s3')
""" with open("FILE_NAME", "rb") as f:
    s3.upload_fileobj(f, "BUCKET_NAME", "OBJECT_NAME") """
    
s3.download_file(_bucket_name, _object_name, _file_name)

if(upload_file("./a208_korean_hello.wav", _bucket_name)):
    print("upload success")
else:
    print("upload failed")


