package ro.info.uaic.semcloth.core

object OntologyConstants {

  val SemclothNS = "http://www.semanticweb.org/ontologies/2015/02/semcloth.owl#"
  val NamedGraphBaseUri = "<http://www.semanticweb.org/ontologies/2015/02/semcloth/namedGraphs/"

}

object OntologyHelpers {

  def UserNamedGraphUri(name: String) = OntologyConstants.NamedGraphBaseUri + name + ">"

}
