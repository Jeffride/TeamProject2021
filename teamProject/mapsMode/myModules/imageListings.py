import random

imgDict = {
  "barrackStreet":['images/hard/bstreet.jpg',{"lat":51.893897,"lng":-8.477632}],
  "GrandParade":['images/hard/gparade.jpg',{"lat":51.893897,"lng":-8.477632}],
  "PatricksHill":['images/hard/phill.jpg',{"lat":51.893897,"lng":-8.477632}],
}
places = [*imgDict]


def genRandomImage():
    randomImage = imgDict[places[random.randint(0,len(places)-1)]][0]   
    return randomImage

