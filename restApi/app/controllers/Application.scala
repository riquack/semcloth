package controllers

import com.complexible.common.rdf.query.resultio.TextTableQueryResultWriter
import com.complexible.stardog.api.{Connection, SelectQuery}
import com.complexible.stardog.api.reasoning.ReasoningConnection
import org.openrdf.model.URI
import org.openrdf.model.impl.ValueFactoryImpl
import org.openrdf.query.TupleQueryResult
import org.openrdf.query.resultio.QueryResultIO
import play.api.mvc._
import ro.info.uaic.semcloth.db.ConnectionPool

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def doQuery = {

    val aConn = ConnectionPool.reasoningConnection

    try {
      val aQuery: SelectQuery = aConn.select("PREFIX sc: <http://www.semanticweb.org/ontologies/2015/02/semcloth.owl#> \n\nselect ?c where { ?c a sc:Clothing }");
      aQuery.limit(10);
      val aResult: TupleQueryResult = aQuery.execute();

      try {
        System.out.println("The first ten results...");

        QueryResultIO.write(aResult, TextTableQueryResultWriter.FORMAT, System.out);
      }
      finally {
        // *Always* close your result sets, they hold resources which need to be released.
        aResult.close();
      }
    }
    finally {
      aConn.close();
    }
  }

  def doReasoning = {

    val aReasoningConn = ConnectionPool.reasoningConnection

    try {
      // Let's do the same thing with the reasoning connection
      // and print the same set of counts, but this time, with reasoning so we can see the difference
      System.out.println("\nResults with reasoning...");
      printCounts(aReasoningConn);
    }
    finally {
      // Closing the reasoning connection will close the base connection too
      aReasoningConn.close();
    }
  }

  def printCounts(theConn: Connection )  {
    val PERSON: URI = ValueFactoryImpl.getInstance().createURI("http://www.lehigh.edu/~zhp2/2004/0401/univ-bench.owl#Person");
    val STUDENT: URI  = ValueFactoryImpl.getInstance().createURI("http://www.lehigh.edu/~zhp2/2004/0401/univ-bench.owl#Student");
    val GRAD_STUDENT: URI  = ValueFactoryImpl.getInstance().createURI("http://www.lehigh.edu/~zhp2/2004/0401/univ-bench.owl#GraduateStudent");
    val PROFESSOR: URI  = ValueFactoryImpl.getInstance().createURI("http://www.lehigh.edu/~zhp2/2004/0401/univ-bench.owl#Professor");
    val FULL_PROFESSOR: URI  = ValueFactoryImpl.getInstance().createURI("http://www.lehigh.edu/~zhp2/2004/0401/univ-bench.owl#FullProfessor");

     val aQuery: SelectQuery = theConn.select("SELECT ?x WHERE {\n" +
      "?x <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> ?type\n" +
      "}");

    aQuery.parameter("type", PERSON);
    println(aQuery.toString)
    var aResult: TupleQueryResult = aQuery.execute();
    System.out.println("Number of Persons: " + count(aResult));

    aQuery.parameter("type", STUDENT);
    aResult = aQuery.execute();
    System.out.println("Number of Students: " + count(aResult));

    aQuery.parameter("type", GRAD_STUDENT);
    aResult = aQuery.execute();
    System.out.println("Number of Grad Students: " + count(aResult));

    aQuery.parameter("type", PROFESSOR);
    aResult = aQuery.execute();
    System.out.println("Number of Professors: " + count(aResult));

    aQuery.parameter("type", FULL_PROFESSOR);
    aResult = aQuery.execute();
    System.out.println("Number of Full Professors: " + count(aResult));
  }

  def count(theResult:  TupleQueryResult) {
    try {
      QueryResultIO.write(theResult, TextTableQueryResultWriter.FORMAT, System.out);
      /*def countAcc(list: TupleQueryResult, acc: Int): Int = {
        if (!list.hasNext)
          acc
        else {
          list.next()
          countAcc(list, acc + 1)
        }
      }

      countAcc(theResult, 0)*/
    }
    finally {
      theResult.close();
    }
  }

}