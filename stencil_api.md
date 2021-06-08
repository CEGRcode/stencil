
# Stencil backend API

API methods for post/update database in Stencil.

### Get - /libraries [GET /libraries  /libraries/dbid/:dbid]

Used to retrieve list of libraries in Stencil database based on some search criteria.



**Response Fields** 

|Field|Type|Description|
|---|---|---|
|uid|string (not null)|the login user id|
|role|string (not null)|the user role ("admin", "regular", "guest")|
|dbId|string (not null)|Internal database ID of a library, automatically generated by the database;|
|libraryId|string (not null)| User defined  ID of the library which should be unique within a project. |
|sampleId|string| User defined ID of the sample. If missing, it will copy the value from libraryId. |
|projectId|string (not null)|User defined ID of a project.|
|groupTag|object|A dictionary of group tags, for example, {"sampleId":"xyz", targetId":"abc"}.|
|libraryType|string|The type of library, e.g. "RNAseq".|
|libraryData|array|Data analysis results.|
|createdBy|string (not null)|User name who created the object|
|createTimestamp|string (not null)|The time of sample registration.|
|updatedBy|string (not null)|User name who late updated the object.|
|updateTimestamp|string (not null)|The time of last update.|
|status|string (not null)|Status code of the library,  "1" (default) for active; "0" for "deprecated";|



libraryData Object (This object is only returned when query for individual record)

| Field       | Type              | Description                                                  |
| ----------- | ----------------- | ------------------------------------------------------------ |
| layoutId    | string (not null) | ID of the block of plots in stencil                          |
| layoutTitle | string            | If missing, using the value of layoutId                      |
| tabId       | string            | ID of the tab under layout. If missing, no tabs under layout |
| tabTitle    | string            | If missing, using the value of layoutId                      |
| stepId      | string (not null) | ID of the plot under tab (or layout if no tab)               |
| dataType    | string (not null) | Type of data ( jpg, png, image, linePlot)                    |
| dataLabel   | string            | Title of the plot                                            |
| URL         | string            | URL of the data source                                       |
| preLoadData | string            | Preloaded data string in json format.  Presence of preLoadData overwrite the requirement of URL. |




+ Parameters
    + dbId (Optional, ) ... the internal DB id for a library




+ Response 200 (application/json)
```
{
	"message" : "success",
	"uid" : "user1",
	"role" : "regular",
	"libraries": [
					{"_id": "9343lajsfasfda",
					"libraryId": "1",
					"sampleId": "1",
					"libraryDescription": "",
					"projectId": "1",
					"groupTag": {"targetId":"abc"},
					"libraryType": "RNAseq",
					"createdBy": "user1",
					"createTimestamp":"2020-11-02",
					"updatedBy": "user2",
					"updateTimestamp":"2020-11-02",
					"status":"1"           
					}  
				]
 }
```

### Post - /libraries [POST /libraries]

Call to register the event of a library being taken. Library ID is assigned as a result of the operation and returned in response.

**Request Fields** 

|Field|Type|Description|
|---|---|---|
|token|string (required)|A string authenticate the post request|
|submitter|string (required)|User id of the submitter|
|libraryId|string (required)| User defined  ID of the library which should be unique within a project; |
|sampleId|string| User defined ID of the sample. If not specified, it will copy the value from libraryId. |
|projectId|string (required)|User defined ID of a project.|
|groupTag|object|A dictionary of group tags, for example, {"sampleId":"xyz", targetId":"abc"}.|
|libraryType|string|The type of library, e.g. "RNAseq".|
|libraryData|array|Data analysis results. (see details in the next table for element of the array)|


libraryData Object (This object is only returned when query for individual record)

| Field       | Type              | Description                                                  |
| ----------- | ----------------- | ------------------------------------------------------------ |
| layoutId    | string (required) | ID of the block of plots in stencil                          |
| layoutTitle | string            | If missing, using the value of layoutId                      |
| tabId       | string            | ID of the tab under layout. If missing, no tabs under layout |
| tabTitle    | string            | If missing, using the value of layoutId                      |
| stepId      | string (required) | ID of the plot under tab (or layout if no tab)               |
| dataType    | string (not null) | Type of data ( jpg, png, image, linePlot)                    |
| dataLabel   | string            | Title of the plot                                            |
| URL         | string            | URL of the data source                                       |
| preLoadData | string            | Preloaded data string in json format.  Presence of preLoadData overwrite the requirement of URL. |




**Response Fields** 

|Field|Type|Description|
|---|---|---|
|dbId|string|Internal database ID of a library, automatically generated by the database;|
|libraryId|string| User defined  ID of the library which should be unique within a project; |
|sampleId|string| User defined ID of the sample. If not specified, it will copy the value from libraryId. |
|projectId|string|User defined ID of a project.|
|groupTag|object|A dictionary of group tags, for example, {"sampleId":"xyz", targetId":"abc"}.|
|libraryType|string|The type of library, e.g. "RNAseq".|
|libraryData|array|An array of data object associated with the library|
|createdBy|string|User name who created the object|
|createTimestamp|string (date-time)|The time of sample registration.|
|updatedBy|string|User name who late updated the object.|
|updateTimestamp|string (date-time)|The time of last update.|
|status|string|Status code of the library,  "1" (default) for active; "0" for "deprecated";|




+ Parameters


+ Request (application/json)
```
{
	"token": "aaaaa",
	"submitter": "ab23",
    "libraryId": "1",
    "sampleId": "1",
    "libraryDescription": "",
    "projectId": "1",
    "groupTag": {"targetId":"abc"},
    "libraryType": "RNAseq",
    "libraryData":[
        {
        "layoutId": "Heat Map 1",
        "layoutTitle": "Heat Map 1",
        "tabId": "Tab1",
        "tabTitle": "Tab 1",
        "stepId": "1",
        "workflowId": "1cd8e2f6b131e891",
        "dataType": "png",
        "dataLabel": "fig1.1"
        "URL": "http://128.84.9.200:8080/datasets/7eee9617b2705f10/display?preview=True",
        }
    ]
}  
```

+ Response 200 (application/json)
```
{
	"message" : "success",
    "libraries": [
                    {
                        "_id": "9343lajsfasfda",
                        "libraryId": "1",
                        "sampleId": "1",
                        "libraryDescription": "",
                        "projectId": "1",
                        "groupTag": {"targetId":"abc"},
                        "libraryType": "RNAseq",
                        "libraryData":[
                            {
                            "layoutId": "imageArray",
                            "layoutTitle": "Generic Layout",
                            "tabId": "Tab1",
                            "tabTitle": "Tab 1",
                            "stepId": "1",
                            "workflowId": "1cd8e2f6b131e891",
                            "dataType": "png",
                            "dataLabel": "fig1.1"
                            "URL": "http://128.84.9.200:8080/datasets/7eee9617b2705f10/display?preview=True",
                            }
                        ]
                        "createdBy": "user1",
                        "createTimestamp":"2020-11-02",
                        "updatedBy": "user1,
                        "updateTimestamp":"2020-11-02",
                        "status":"1"           
                    }  
              ]
    }

```