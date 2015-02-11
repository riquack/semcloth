package ro.info.uaic.semcloth.db

import java.io.ByteArrayOutputStream

import com.complexible.common.rdf.model.Values
import com.complexible.common.rdf.query.resultio.{HTMLQueryResultWriter, TextTableQueryResultWriter}
import com.complexible.stardog.api.{Adder, UpdateQuery, SelectQuery}
import org.openrdf.model.vocabulary.RDF
import org.openrdf.query.TupleQueryResult
import org.openrdf.query.resultio.{TupleQueryResultFormat, QueryResultIO}
import ro.info.uaic.semcloth.core.OntologyConstants
import ro.info.uaic.semcloth.models.Clothing

object SimpleSPARQL {

  def select(queryString: String) = {
    val connection = ConnectionPool.reasoningConnection

    try{

      val query: SelectQuery = connection.select(queryString)

      val result = query.execute()

      try {
        val outputStream: ByteArrayOutputStream = new ByteArrayOutputStream()
        QueryResultIO.write(result, TupleQueryResultFormat.JSON, outputStream )
        outputStream.toString
      }
      finally {
        result.close()
      }
    }
    finally {
      connection.close()
    }
  }

  def insert(queryString: String)  = {

    val connection = ConnectionPool.reasoningConnection

    try{

      val query: UpdateQuery = connection.update(queryString)

      query.execute()

    }
    finally {
      connection.close()
    }
  }

  def delete(queryString: String)  = {

    val connection = ConnectionPool.reasoningConnection

    try {
      val query: UpdateQuery = connection.update(queryString)

      query.execute()

    }
    finally {
      connection.close()
    }
  }

}
