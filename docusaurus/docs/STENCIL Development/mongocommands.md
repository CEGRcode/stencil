---
sidebar_position: 7
id: tipstricks
title: Dev Tips & Tricks
sidebar_label: Dev Tips & Tricks
---

---

## Reset the MongoDB database

### Useful for dropping development data

1. Check that the stencil database is visible
    ```
    mongo
    show dbs
    ```

    - Expect an output similar to this:

    >  |db name|db size|
    >  |---------|---------|
    >  |admin      | 0.000GB|
    >  |config     | 0.000GB|
    >  |local      | 0.000GB|
    >  |stencilDB  | 0.000GB|


2. Make the stencilDB the active database
    ```
    use stencilDB
    ```

    > switched to db stencilDB

3. Drop all data from the database

    ```
    db.dropDatabase()
    ```

    > { "ok" : 1 }

4. Quit the mongo interface

    ```
    exit
    ```
