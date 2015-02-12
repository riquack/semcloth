import json
import sys
import urllib.request
from pprint import pprint


outputFile = sys.argv[1]
print(outputFile)

triples = open(outputFile, "a")

resources = open("dbpedia-resources.txt")


for resource in [line.rstrip('\n') for line in resources]:
	response = urllib.request.urlopen(resource)
	file = response.read()
	print (resource)
	triples.write(file.decode('utf-8'))

triples.close()

