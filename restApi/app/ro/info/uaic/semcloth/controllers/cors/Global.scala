package ro.info.uaic.semcloth.controllers.cors

import play.api.GlobalSettings
import play.api.mvc.WithFilters


/**
 * Created by riquack on 15.02.2015.
 */
object Global extends WithFilters(CORSFilter()) with GlobalSettings {
}
