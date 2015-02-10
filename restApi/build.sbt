name := "restApi"

version := "1.0"

lazy val `restApi` = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.1"

libraryDependencies ++= Seq( jdbc , anorm , cache , ws )

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )

unmanagedBase <<= baseDirectory { base => base / "lib" }