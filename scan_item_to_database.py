#!/usr/bin/env python

import os
import json
from typing import Optional
import requests
import sys

IMDB_API_URL = "https://imdb-api.com/API"
IMDB_API_KEY = "YOUR_IMDB_KEY"
IMDB_API_TITLE = "Title"

def _create_file_if_not_exists(filename: str, content: Optional[str] = None) -> None:
    if not os.path.exists(filename):
        file = open(filename, "w+")
        if content:
            file.write(json.dump(content))
        file.close()

def _read_json_from_file(filename: str, default_obj: dict[str, str] = {}):
    _create_file_if_not_exists(filename, default_obj)
    content = default_obj
    try:
        file = open(filename, "r")
        content = json.load(file)
    except:
        pass
    if file:
        file.close()
    return content

def _write_json_to_file(filename: str, content) -> None:
    _create_file_if_not_exists(filename)
    file = open(filename, "w")
    file.seek(0)
    file.write(json.dumps(content))
    file.close()

def _api_get_details(title_id: str) -> str:
    response = requests.get(f"{IMDB_API_URL}/{IMDB_API_TITLE}/{IMDB_API_KEY}/{title_id}")
    return response.json()

def main():
  try:
    item_id = sys.argv[1]
    database_file = sys.argv[2]

    item_dict = _read_json_from_file(database_file)
    item_details = _api_get_details(item_id)
    if item_details:
      item_dict[item_id] = item_details
      _write_json_to_file(database_file, item_dict)
  except:
    print(f"Error. Script usage: {sys.argv[0]} tt1375666 src/assets/database.json")

if __name__ == "__main__":
  main()
