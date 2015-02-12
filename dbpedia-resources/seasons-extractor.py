import json
import sys
import urllib.request
from pprint import pprint


outputFile = sys.argv[1]
print(outputFile)

triples = open(outputFile, "a")

seasons = open("dbpedia-resources.txt")


for season in [line.rstrip('\n') for line in seasons]:
	response = urllib.request.urlopen(season)
	file = response.read()
	print (season)
	triples.write(file.decode('utf-8'))

triples.close()

