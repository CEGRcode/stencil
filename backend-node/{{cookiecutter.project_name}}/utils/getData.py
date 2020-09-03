#!/usr/bin/python

import argparse
import pprint
import requests

# reference : https://realpython.com/python-requests/

if __name__ == '__main__':

    parser = argparse.ArgumentParser(
        description='Retrieves all samples from backend using the GET request')
    args = parser.parse_args()

    URL = "http://{{cookiecutter.database_server_url}}:{{cookiecutter.http_port}}/samples"

    # making a GET request for all the samples.
    print("\n GET data \n")
    response = requests.get(URL,verify=False)
    pprint.pprint(response.json())
