#!/bin/bash
mongoimport -d js -c plunks --jsonArray --drop <plunks.json
