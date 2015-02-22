package ro.info.uaic.semcloth.db

import java.util.concurrent.TimeUnit

import com.complexible.stardog.api.reasoning.ReasoningConnection
import com.complexible.stardog.api.{ConnectionConfiguration, ConnectionPoolConfig}
import com.complexible.stardog.reasoning.api.ReasoningType

object ConnectionPool {

  private val conConfig: ConnectionConfiguration = ConnectionConfiguration
    .to("semantic-clothing")
    .server("http://localhost:5820")
    .credentials("admin", "admin")
    .reasoning(ReasoningType.SL);

  private val conPoolConfig: ConnectionPoolConfig = ConnectionPoolConfig
    .using(conConfig)							// use my connection configuration to spawn new connections
    .minPool(10)								// the number of objects to start my pool with
    .maxPool(200)								// the maximum number of objects that can be in the pool (leased or idle)
    .expiration(1, TimeUnit.MINUTES)				// Connections can expire after being idle for 1 hr.
    .blockAtCapacity(10, TimeUnit.MINUTES);

  private val pool = conPoolConfig.create();

  def reasoningConnection = pool.obtain().as(classOf[ReasoningConnection])

}
