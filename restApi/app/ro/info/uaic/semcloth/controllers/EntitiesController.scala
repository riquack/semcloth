package ro.info.uaic.semcloth.controllers

import play.api.mvc.{Action, Controller}
import ro.info.uaic.semcloth.db.SimpleSPARQL

object EntitiesController extends Controller {

  def events = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?event ?label where { ?event a dbo:Event;
                                               rdfs:label ?label .}"""
      )
    )
  }

  def clothingStyles = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?clothingStyle ?label where { ?clothingStyle a :ClothingStyle;
                                                               rdfs:label ?label .}"""
      )
    )
  }

  def religions = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?religion ?label where { ?religion a dbr:Religion;
                                                     rdfs:label ?label .}"""
      )
    )
  }

  def seasons = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?season ?label ?comment where
          | {?season a dbr:Season;
          |            rdfs:label ?label ;
          |            rdfs:comment ?comment
          |          FILTER (lang(?label) = 'en' && lang(?comment) = 'en')}""".stripMargin
      )
    )
  }

  def weatherConditions = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?weatherCondition ?label where { ?weatherCondition a dbr:Weather;
                                                                      rdfs:label ?label .}"""
      )
    )
  }

  def clothingMaterials = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?clothingMaterial ?label where { {?clothingMaterial a :ClothingMaterial.} UNION {?clothingMaterial a :ClothingMaterial;
                                                                     rdfs:label ?label .}}"""
      )
    )
  }

  def colors = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?color ?label where { ?color a dbr:Color;
                                               rdfs:label ?label .}"""
      )
    )
  }

}
