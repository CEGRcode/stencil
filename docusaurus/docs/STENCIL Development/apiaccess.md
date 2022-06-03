---
sidebar_position: 6
id: apiaccess
title: API access
sidebar_label: API access
---

---

## API Access
- STENCIL NodeJS backend is accessible programmatically
- Example scripts for accessing STENCIL are provided in */backend/utils*

### postLibrary.py

```
#!/usr/bin/python

import argparse
import json
import requests

# reference : https://realpython.com/python-requests/

if __name__ == '__main__':

    parser = argparse.ArgumentParser(
        description='Inserts JSON into backend using the POST request')
    parser.add_argument('jsonFile', help='Library data in JSON format')
    args = parser.parse_args()

    URL = "http://localhost:8081/libraries"

    # Reading the example.json
    f=open(args.jsonFile, 'r')
    value = json.load(f)
    f.close()

    response = requests.post(URL, json=value, verify=False)
    print(f"STATUS: {response.status_code}  \nReason: {response.reason} \nMessage: {response.content}")
```
#### Example usage:
```
python3 postLibrary.py libraryData.json
```

### deleteLibrary.py
- Deletes library in STENCIL given libraryID and projectID
- Token must equal SVC_STENCIL_PWD

```
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

    token = "XXXXXX"

    deleteURL = f"{URL}/{token}/{projectId}/{libraryId}"
    response = requests.delete(deleteURL)
    pprint.pprint(response.json())
```
#### Example usage:
```
python3 deleteLibrary.py projectID libraryID
```

### getLibraries.py
- Retrieves ALL data in STENCIL in JSON format
- Token must equal SVC_STENCIL_PWD

```
#!/usr/bin/python

import argparse
import pprint
import requests

# reference : https://realpython.com/python-requests/

if __name__ == '__main__':

    token = "XXXXXX"

    URL = "http://localhost/libraries/all/"+ token

    # making a GET request for all the samples.
    print("\n GET data \n")
    response = requests.get(URL,verify=False)
    pprint.pprint(response.json())
```
#### Example usage:
```
python3 getLibraries.py > ALL_DATA.json
```
