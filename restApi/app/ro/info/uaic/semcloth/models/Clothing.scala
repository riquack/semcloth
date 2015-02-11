package ro.info.uaic.semcloth.models


case class Clothing(
    clothingType: String,
    genres: Array[String],
    fabrics: Array[String],
    size: String,
    texture: String,
    colors: Array[String],
    note: String,
    thumbnail: String
   )

