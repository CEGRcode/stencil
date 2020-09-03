#!/usr/bin/python

import argparse
import pprint
import json
import requests

# reference : https://realpython.com/python-requests/

if __name__ == '__main__':

    parser = argparse.ArgumentParser(
        description='Delete all samples')
    args = parser.parse_args()

    URL = "http://{{cookiecutter.database_server_url}}:{{cookiecutter.http_port}}/samples/"

    # making a GET request for all the samples.
    response = requests.get(URL, verify=False)
    data = response.json()

    items = int(data['count'])
    for i in range(0,items):
        # Retrieve the mongodb ID for each sample and delete it.
        print("\n")
        pprint.pprint("Deleting Sample with mongodb ID : " + str(data['samples'][i]['_id']))

        # making a PATCH request to update the first sample.
        deleteURL = URL + str(data['samples'][i]['_id'])
        response = requests.delete(deleteURL)
        pprint.pprint(response.json())
