#!/usr/bin/python

import pprint
import json
import requests
import sys

# reference : https://realpython.com/python-requests/

if __name__ == '__main__':

    URL = "http://localhost/libraries/libid/"

    projectId = sys.argv[1]
    libraryId = sys.argv[2]

    token = "ssspwd"

    deleteURL = f"{URL}/{token}/{projectId}/{libraryId}"
    response = requests.delete(deleteURL)
    pprint.pprint(response.json())
