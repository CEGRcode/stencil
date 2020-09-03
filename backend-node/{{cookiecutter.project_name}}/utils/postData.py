#!/usr/bin/python

import argparse
import json
import requests

# reference : https://realpython.com/python-requests/

if __name__ == '__main__':

    parser = argparse.ArgumentParser(
        description='Inserts example json into backend using the POST request')
    parser.add_argument('jsonFile', help='Sample Information in JSON format')
    args = parser.parse_args()

    URL = "http://{{cookiecutter.database_server_url}}:{{cookiecutter.http_port}}/samples"

    # Reading the example.json
    with open(args.jsonFile, 'r') as f:
        datastore = json.load(f)

    # posting each sample
    print("\n POSTING data \n")
    for item,value in datastore.items():
        response = requests.post(URL, json=value, verify=False)
        print("POST :  {}\t STATUS : {}".format(item,(response.status_code, response.reason)))
