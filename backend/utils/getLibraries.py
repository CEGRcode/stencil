#!/usr/bin/python

import argparse
import pprint
import requests

# reference : https://realpython.com/python-requests/

if __name__ == '__main__':

    token = "ssspwd"

    URL = "http://localhost/libraries/all/"+ token 

    # making a GET request for all the samples.
    print("\n GET data \n")
    response = requests.get(URL,verify=False)
    pprint.pprint(response.json())
