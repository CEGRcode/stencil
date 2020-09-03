#!/usr/bin/python

import argparse
import pprint
import json
import requests

# reference : https://realpython.com/python-requests/

if __name__ == '__main__':

    parser = argparse.ArgumentParser(
        description='Update sample info using the PATCH request')
    args = parser.parse_args()

    URL = "http://{{cookiecutter.database_server_url}}:{{cookiecutter.http_port}}/samples/"

    # data to patch, needs to be in the format below.
    patchData = [
        {"propName": "sequencingInfo.assayType", "value": "ChIP-seq"},
        {"propName": "target", "value": "SSL1"}
    ]
    headers = {'Content-Type': 'application/json'}

    # making a GET request for all the samples.
    response = requests.get(URL, verify=False)
    data = response.json()

    # Retrieve the mongodb ID for the first sample and update it.
    pprint.pprint("Patching Sample with mongodb ID : " + str(data['samples'][0]['_id']))

    # making a PATCH request to update the first sample.
    patchURL = URL + str(data['samples'][0]['_id'])
    response = requests.patch(patchURL, data=json.dumps(patchData), headers=headers)
    pprint.pprint(response.json())
