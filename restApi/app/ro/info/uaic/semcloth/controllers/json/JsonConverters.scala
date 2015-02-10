package ro.info.uaic.semcloth.controllers.json

import play.api.libs.json.Json
import ro.info.uaic.semcloth.models.Clothing

object JsonConverters {

  implicit val clothingItemFormat = Json.format[Clothing]

}
