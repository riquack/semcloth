package ro.info.uaic.semcloth.controllers

import play.api.mvc.{Action, Controller}
import ro.info.uaic.semcloth.db.SimpleQuery

object EntitiesController extends Controller {

  def events = Action {
    Ok(
      SimpleQuery.selectQuery(
        """select ?event ?label where { ?event a dbo:Event;
                                               rdfs:label ?label .}"""
      )
    )
  }

  def clothingStyles = Action {
    Ok(
      SimpleQuery.selectQuery(
        """select ?clothingStyle ?label where { ?clothingStyle a :ClothingStyle;
                                                               rdfs:label ?label .}"""
      )
    )
  }

  def religions = Action {
    Ok(
      SimpleQuery.selectQuery(
        """select ?religion ?label where { ?religion a dbr:Religion;
                                                     rdfs:label ?label .}"""
      )
    )
  }

  def seasons = Action {
    Ok(
      SimpleQuery.selectQuery(
        """select ?season ?label where { {?season a dbr:Season.} UNION
                                                {?season a dbr:Season;
                                                         rdfs:label ?label} .}"""
      )
    )
  }

  def weatherConditions = Action {
    Ok(
      SimpleQuery.selectQuery(
        """select ?weatherCondition ?label where { ?weatherCondition a dbr:Weather;
                                                                      rdfs:label ?label .}"""
      )
    )
  }

  def clothingMaterials = Action {
    Ok(
      SimpleQuery.selectQuery(
        """select ?clothingMaterial ?label where { {?clothingMaterial a :ClothingMaterial.} UNION {?clothingMaterial a :ClothingMaterial;
                                                                     rdfs:label ?label .}}"""
      )
    )
  }

  def colors = Action {
    Ok(
      SimpleQuery.selectQuery(
        """select ?color ?label where { ?color a dbr:Color;
                                               rdfs:label ?label .}"""
      )
    )
  }

}
