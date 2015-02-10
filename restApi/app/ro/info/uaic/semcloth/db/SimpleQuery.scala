package ro.info.uaic.semcloth.db

import java.io.ByteArrayOutputStream

import com.complexible.common.rdf.query.resultio.{HTMLQueryResultWriter, TextTableQueryResultWriter}
import com.complexible.stardog.api.SelectQuery
import org.openrdf.query.TupleQueryResult
import org.openrdf.query.resultio.{TupleQueryResultFormat, QueryResultIO}

object SimpleQuery {

  def selectQuery(queryString: String) = {
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
        // *Always* close your result sets, they hold resources which need to be released.
        result.close()
      }
    }
    finally {
      connection.close()
    }
  }

}
