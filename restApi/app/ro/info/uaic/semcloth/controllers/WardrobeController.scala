package ro.info.uaic.semcloth.controllers

import play.api.mvc.{Action, Controller}
import ro.info.uaic.semcloth.core.{OntologyConstants, OntologyHelpers}
import ro.info.uaic.semcloth.db.SimpleSPARQL
import ro.info.uaic.semcloth.models.Clothing

object WardrobeController extends Controller {


  def newClothingItem(id: String) = Action(parse.json) {
    implicit request => {
      import ro.info.uaic.semcloth.controllers.json.JsonConverters.clothingItemFormat
      request.body.validate[Clothing].fold(
        error => BadRequest("Object is not formatted correctly"),
        valid = correctData => {

          val resource = System.currentTimeMillis()

          val queryString =
            s"""INSERT DATA {
               |GRAPH ${OntologyHelpers.UserNamedGraphUri(id)} {
               |sc:${resource} a ${correctData.clothingType} ;
               |${asStringForSPARQL("sc:hasColour", correctData.colors)} ;
               |${asStringForSPARQL("sc:hasTextileComposition", correctData.fabrics)} ;
               |${asStringForSPARQL("sc:isSuitableToBeDressedByGenre", correctData.genres)} ;
               |sc:hasTexture ${asXSDString(correctData.texture)} ;
               |sc:hasSize ${asXSDString(correctData.size)} ;
               |sioc:note ${asXSDString(correctData.note)} ;
               |dbo:thumbnail ${asXSDString(correctData.thumbnail)}. }}""".stripMargin

          SimpleSPARQL.insert(queryString)
          Created(s"Item ${resource} was created!")
        }
      )
    }
  }


  def clothingItem(userId: String, clothingId: String) = Action {
    Ok(
      SimpleSPARQL.select(
        s"""select * FROM NAMED ${OntologyHelpers.UserNamedGraphUri(userId)}
           |where { GRAPH ?src {<${OntologyConstants.SemclothNS + clothingId}> ?property ?object. } }""".stripMargin
      )
    ).as(JSON)
  }

  def allClothingItems(userId: String) = Action {
    Ok(
      SimpleSPARQL.select(
        s"""select ?subject FROM NAMED ${OntologyHelpers.UserNamedGraphUri(userId)}
           |where { GRAPH ?src  {?subject a dbr:Clothing} }""".stripMargin
      )
    ).as(JSON)
  }

  def removeClothing(userId: String, clothingId: String) = Action {
    val result = SimpleSPARQL.delete(
      s"""DELETE DATA {
         |  GRAPH  ${OntologyHelpers.UserNamedGraphUri(userId)} {
         |  <${OntologyConstants.SemclothNS + clothingId}> ?predicate ?object. } }""".stripMargin)

    if (result)
      Ok("Item removed")
    else
      InternalServerError("Something went wrong. Item was not removed")

  }

  def recommendations(
      userId: String,
      event: Option[String],
      genres: List[String],
      materials: List[String],
      religion: Option[String],
      season: Option[String],
      style: Option[String],
      weather: Option[String]) = Action {

    var x = s"""select ?indv FROM NAMED ${OntologyHelpers.UserNamedGraphUri(userId)}
        |where { GRAPH ?src {?indv ${addConstrain("sc:isSuitableToBeDressedAtEvent", event)}
        |                          ${addConstrain("sc:isSuitableToBeDressedInSeason", season)}
        |                          ${addConstrain("sc:isSuitableForDressingCode", style)}
        |                          ${addConstrain("sc:isSuitableToBeDressedOnWeather", weather)}
        |                          ${addConstrain("sc:isSuitableForDressingForReligion", religion)}
        |                          ${addConstrain("sc:isSuitableToBeDressedByGenre", genres)}
        |                          ${addConstrain("sc:hasTextileComposition", materials)}} }""".stripMargin
    Ok(SimpleSPARQL.select(x)).as(JSON)
  }


  private def addConstrain(key: String, constrain: Option[String]) = {
    if(constrain.isDefined)
      s"$key $constrain;"
    else ""
  }

  private def addConstrain(key: String, constrain: List[String]) = {
    if(constrain.nonEmpty)
      asStringForSPARQL(key, constrain) + ";"
    else ""
  }
  private def asStringForSPARQL(key: String, colors: List[String]) = {
    colors.map{x => s"$key $x"}.mkString("; ")
  }

  private def asXSDString(str: String) = {
    "\"" + str + "\"^^xsd:string"
  }

}
