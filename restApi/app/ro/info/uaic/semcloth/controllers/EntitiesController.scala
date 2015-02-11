package ro.info.uaic.semcloth.controllers

import play.api.libs.ws.WS
import play.api.mvc.{Action, Controller}
import ro.info.uaic.semcloth.db.SimpleSPARQL

object EntitiesController extends Controller {

  def events = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?event ?label
          |where { ?event a dbo:Event;rdfs:label ?label . }""".stripMargin
      )
    ).as(JSON)
  }

  def clothingTypes = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?clothing ?label ?thumbnail
          |where { ?clothing a dbr:Clothing; rdfs:label ?label ; dbo:thumbnail ?thumbnail . }""".stripMargin
      )
    ).as{JSON}
  }

  def clothingSizes = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?size ?label
          |where { ?size a dbr:Clothing_sizes;rdfs:label ?label . }""".stripMargin
      )
    ).as(JSON)
  }

  def clothingStyles = Action.async {
    import play.api.Play.current
    import scala.concurrent.ExecutionContext.Implicits.global

    val result = WS.url(
      """http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=PREFIX+yago%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fclass%2Fyago%2F%3E%0D%0A%0D%0ASELECT+%3FdressingStyle+%3Flabel+%3Fcomment+%0D%0A++WHERE+%0D%0A%09%7B%0D%0A+++++%3FdressingStyle+a+yago%3AFashionAesthetics+%3B%0D%0A+++++rdfs%3Alabel+%3Flabel%3B%0D%0A+++++rdfs%3Acomment+%3Fcomment+.%0D%0A%0D%0A+++++FILTER%28lang%28%3Flabel%29+%3D+%22en%22+%26%26+lang%28%3Fcomment%29+%3D+%22en%22%29%0D%0A+++%7D&format=application%2Fsparql-results%2Bjson&timeout=30000""")

    result.get().map{
      response =>
        Ok(response.json)
    }
  }

  def clothingTextures = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?texture ?label
          |where {?texture a sc:ClothingTexture;rdfs:label ?label . }""".stripMargin
      )
    ).as(JSON)
  }

  def religions = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?religion ?label ?comment
          |where
          |	{ ?religion a dbr:Religion;
          |				rdfs:label ?label ;
          |				rdfs:comment ?comment
          |     			FILTER (lang(?label) = 'en' && lang(?comment) = 'en' ).
          |	}""".stripMargin
      )
    ).as(JSON)
  }

  def seasons = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?season ?label ?comment where
          |           {?season a dbr:Season;
          |                      rdfs:label ?label.
          |                     OPTIONAL {?season rdfs:comment ?comment. } }""".stripMargin
      )
    ).as(JSON)
  }

  def weatherConditions = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?weatherCondition ?label ?comment
          |where
          |	{ ?weatherCondition a dbr:Weather;
          |		rdfs:label ?label .
          |		OPTIONAL {?weatherCondition rdfs:comment ?comment.}
          |	}
          |""".stripMargin
      )
    ).as(JSON)
  }

  def clothingMaterials =  Action {
    Ok(
      SimpleSPARQL.select(
        """select ?clothingMaterial ?label ?comment
          |where
          |	{ ?clothingMaterial a sc:ClothingMaterial;
          |                        rdfs:label ?label;
          |						rdfs:comment ?comment .
          |	}	""".stripMargin
      )
    ).as(JSON)
  }

  def colors = Action.async {

    import play.api.Play.current
    import scala.concurrent.ExecutionContext.Implicits.global
    val x = WS.url(
      """http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=PREFIX+umbel%3A+%3Chttp%3A%2F%2Fumbel.org%2Fumbel%2Frc%2F%3E%0D%0A%0D%0ASELECT+%3Fcolor+%3FcolourHexCode+%3Flabel+%3Fcomment+%0D%0A++WHERE+%7B%0D%0A+++++%3Fcolor+a+umbel%3AColor+%3B%0D%0A+++++dbpedia-owl%3AcolourHexCode+%3FcolourHexCode%3B%0D%0A+++++rdfs%3Alabel+%3Flabel%3B%0D%0A+++++rdfs%3Acomment+%3Fcomment+.%0D%0A%0D%0A+++++FILTER%28lang%28%3Flabel%29+%3D+%22en%22+%26%26+lang%28%3Fcomment%29+%3D+%22en%22%29%0D%0A++%7D&format=application%2Fsparql-results%2Bjson&timeout=30000""")
    x.get().map {
      response =>
        Ok(response.json)
    }
  }

}
