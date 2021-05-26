#!/usr/bin/python

import argparse
import json
import requests

# reference : https://realpython.com/python-requests/

if __name__ == '__main__':

    parser = argparse.ArgumentParser(
        description='Inserts example json into backend using the POST request')
    parser.add_argument('jsonFile', help='Library data in JSON format')
    args = parser.parse_args()

    URL = "http://localhost:8081/libraries"

    # Reading the example.json
    f=open(args.jsonFile, 'r')
    value = json.load(f)
    f.close()

    response = requests.post(URL, json=value, verify=False)
    print(f"STATUS: {response.status_code}  \nReason: {response.reason} \nMessage: {response.content}")

