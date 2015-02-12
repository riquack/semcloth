package ro.info.uaic.semcloth.models


case class Clothing(
    clothingType: String,
    thumbnail: String,
    fabrics: List[String],
    colors: List[String],
    note: String,
    size: String,
    texture: String,
    genres: List[String]
)

