package ro.info.uaic.semcloth.controllers.cors

import play.api.mvc.{Action, Controller}

object PreReqController extends Controller {

  def preFlight(all: String) = Action { Ok("") }
}
