import json
import sys
import urllib.request
from pprint import pprint


outputFile = sys.argv[1]
print(outputFile)

triples = open(outputFile, "a")

jsonData = open("colors.json")
colors = json.load(jsonData)

for color in colors["results"]["bindings"]:
	uri = color["c"]["value"].replace("resource", "data") + ".ntriples"
	response = urllib.request.urlopen(uri)
	file = response.read()
	print (uri)
	triples.write(file.decode('utf-8'))

triples.close()
jsonData.close()
