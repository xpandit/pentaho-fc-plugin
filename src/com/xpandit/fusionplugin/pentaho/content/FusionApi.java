package com.xpandit.fusionplugin.pentaho.content;

import java.text.SimpleDateFormat;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.HttpHeaders;

import com.sun.jersey.api.representation.Form;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;
import com.sun.jersey.spi.container.ContainerRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Collection;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.dom4j.DocumentException;
import org.json.JSONException;
import org.json.JSONObject;
import org.pentaho.platform.api.engine.IParameterProvider;
import org.pentaho.platform.engine.core.solution.SimpleParameterProvider;

import pt.webdetails.cpf.plugins.IPluginFilter;
import pt.webdetails.cpf.plugins.Plugin;
import pt.webdetails.cpf.plugins.PluginsAnalyzer;
import pt.webdetails.cpf.utils.CharsetHelper;
import pt.webdetails.cpf.utils.MimeTypes;
import pt.webdetails.cpf.utils.PluginUtils;
import pt.webdetails.cpk.CpkApi;
import pt.webdetails.cpk.CpkCoreService;
import pt.webdetails.cpk.CpkEngine;
import pt.webdetails.cpk.CpkPentahoEnvironment;
import pt.webdetails.cpk.datasources.DataSource;
import pt.webdetails.cpk.elements.IDataSourceProvider;
import pt.webdetails.cpk.elements.IElement;
import pt.webdetails.cpk.sitemap.LinkGenerator;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;

import pt.webdetails.cpk.utils.CpkUtils;

import com.xpandit.fusionplugin.exception.InvalidParameterException;
import com.xpandit.fusionplugin.pentaho.FusionComponent;
import com.xpandit.fusionplugin.pentaho.FusionPluginSettings;
import com.xpandit.fusionplugin.pentaho.input.ParameterParser;
import com.xpandit.fusionplugin.util.LicenseChecker;
import com.xpandit.fusionplugin.util.VersionChecker;

/**
 * 
 * xFusion plugin REST API. This class serves chart requests and version checks.
 * 
 * @author dams
 * 
 */

@Path("/{plugin}/api")
public class FusionApi extends CpkApi{

	private static final Log logger = LogFactory.getLog(FusionApi.class);

	private static final String DEFAULT_STORE_ERROR_MESSAGE = "Something went wrong when trying to upload the file";
	private static final String DEFAULT_STORE_UPLOAD_FOLDER = "system/fusion_plugin/fusioncharts/JSClass";
	private static final String[] reservedWords = { "ping", "default", "reload", "refresh", "version", "status", "getSitemapJson", "elementsList", "listDataAccessTypes", "reloadPlugins" };
	
	protected CpkPentahoEnvironment cpkEnv;
	protected CpkCoreService coreService;
	
	FusionApi() {
		cpkEnv = new CpkPentahoEnvironment( new PluginUtils(), reservedWords );
		coreService = new CpkCoreService( this.cpkEnv );
	}
	  protected static String getEncoding() {
		    return CharsetHelper.getEncoding();
		  }

		  
		  /*
		   * FUSION CHARTS ENDPOINTS
		   */
			/**
			 * Check Pentaho version
			 * @return
			 * @throws Exception
			 */
			@GET
			@Path("/checkVersions")
			public String getVersion() throws Exception {
				return VersionChecker.getVersions();
			}
			
			/**
			 * Get the Fusion Chart XML to be rendered
			 * @param request HTTP Request
			 * @return Fusion Chart XML
			 * @throws Exception
			 */
			@GET
			@Path("/renderChart")
			public String doGetRenderChart(@Context HttpServletRequest request) throws Exception {
				logger.debug("\n\nrenderChart START\n----------------");
				// Build parameter parser
				ParameterParser pp = buildParameterParser(request, null);
				printParameterParser(pp);
				
				// Check license and act accordingly
				String licenseChecked = LicenseChecker.verifyKey();
				if (licenseChecked.startsWith("Error")) {
					logger.error(licenseChecked);
					logger.debug("\n----------------\nrenderChart END\n\n");
					return licenseChecked;
				}
				else if (licenseChecked.startsWith("Warning")) {
					logger.warn(licenseChecked);
				}
				FusionComponent fc = new FusionComponent(pp);
				String fcResult = fc.renderChartGetData();
				logger.debug("\n----------------\nrenderChart END\n\n");
				return licenseChecked + fcResult;
			}

			/**
			 * Get a Fusion Chart to be embedded in Analyzer  
			 * @param request HTTP request
			 * @param jsonStr POST body with all the parameters and chart data
			 * @return Fusion Chart XML
			 * @throws Exception
			 */
			@POST
			@Path("/renderChartExternalData")
			public String doPostRenderChartExternalData(@Context HttpServletRequest request,
					@FormParam("json") String jsonStr) throws Exception {
				logger.debug("\n\nrenderChartExternalData START\n----------------");
				// Build parameter parser
				ParameterParser pp = buildParameterParser(request, jsonStr);
				printParameterParser(pp);
				
				// Check license and act accordingly
				String licenseChecked = LicenseChecker.verifyKey();
				if (licenseChecked.startsWith("Error")) {
					logger.error(licenseChecked);
					logger.debug("\n----------------\nrenderChartExternalData END\n\n");
					return licenseChecked;
				}
				else if (licenseChecked.startsWith("Warning")) {
					logger.warn(licenseChecked);
				}
				FusionComponent fc = new FusionComponent(pp);
				String fcResult = fc.renderChartGetData();
				logger.debug("\n----------------\nrenderChartExternalData END\n\n");
				return licenseChecked + fcResult;
			}

			/**
			 * Build an auto-updating chart to be rendered
			 * @param request HTTP request
			 * @return Real time Fusion Chart XML
			 * @throws Exception
			 */
			@GET
			@Path("/dataStream")
			public String doGetDataStream(@Context HttpServletRequest request) throws Exception {
				logger.debug("\n\ndataStream START\n----------------");
				// Build parameter parser
				ParameterParser pp = buildParameterParser(request, null);
				printParameterParser(pp);
				
				// Check license and act accordingly
				String licenseChecked = LicenseChecker.verifyKey();
				if (licenseChecked.startsWith("Error")) {
					logger.error(licenseChecked);
					logger.debug("\n----------------\ndataStream END\n\n");
					return licenseChecked;
				}
				else if (licenseChecked.startsWith("Warning")) {
					logger.warn(licenseChecked);
				}
				FusionComponent fc = new FusionComponent(pp);
				String fcResult = fc.dataStream();
				logger.debug("\n----------------\ndataStream END\n\n");
				return licenseChecked + fcResult;
			}
			
			 @POST
			  @Path( "/uploadFile" )
			  @Consumes( "multipart/form-data" )
			  @Produces( MimeTypes.JSON )
			  public String store( @FormDataParam( "file" ) InputStream uploadedInputStream,
			                       @FormDataParam( "file" ) FormDataContentDisposition fileDetail,
			                       @FormDataParam( "path" ) String path ) throws JSONException {

			    String fileName = checkRelativePathSanity( fileDetail.getFileName() ), savePath = checkRelativePathSanity( path );
			    ByteArrayOutputStream oStream = new ByteArrayOutputStream();
			    byte[] contents;
			    try {
			      IOUtils.copy( uploadedInputStream, oStream );
			      oStream.flush();
			      contents = oStream.toByteArray();
			      oStream.close();
			    } catch ( IOException e ) {
			      logger.error( e );
			      return buildResponseJson( false, DEFAULT_STORE_ERROR_MESSAGE );
			    }

			    if ( fileName == null ) {
			      logger.error( "parameter fileName must not be null" );
			      return buildResponseJson( false, DEFAULT_STORE_ERROR_MESSAGE );
			    }
			    if ( !fileName.endsWith(".zip")){
			    	logger.error( "parameter fileName must be zip file" );
				    return buildResponseJson( false, "You are only allowed to upload zip files" );
			    }
			    if ( savePath == null ) {
			      logger.error( "parameter path must not be null" );
			      return buildResponseJson( false, DEFAULT_STORE_ERROR_MESSAGE );
			    }
			    if ( contents == null ) {
			      logger.error( "File content must not be null" );
			      return buildResponseJson( false, DEFAULT_STORE_ERROR_MESSAGE );
			    }
			    
			    FusionPluginSettings fps = new FusionPluginSettings();
			    String basePath = fps.getBasePath() + DEFAULT_STORE_UPLOAD_FOLDER;
			    String fullPath = FilenameUtils.normalize( savePath + "/" + fileName );
			    if (fileExists( checkRelativePathSanity( fullPath ), basePath ) ) {
			      return buildResponseJson( false, "File " + fileName + " already exists!" );
			    }
			    
			    File f;
			    
			    if ( checkRelativePathSanity( fullPath ).startsWith( File.separator ) ) {
				      f = new File( basePath + checkRelativePathSanity( fullPath ) );
				    } else {
				      f = new File( basePath + File.separator + checkRelativePathSanity( fullPath ) );
				    }

			    FileOutputStream fos;

			    try {
			      fos = new FileOutputStream( f, false );
			      fos.write( contents );
			      fos.flush();
			      fos.close();
			      return buildResponseJson( true, "File " + fileName + " Saved!" );
			    } catch ( FileNotFoundException fnfe ) {
			      logger.error( "Unable to create file. Check permissions on folder " + fullPath, fnfe );
			      return buildResponseJson( false, "File " + fileName + " not Saved!" );
			    } catch ( IOException ioe ) {
			      logger.error( "Error caught while writing file", ioe );
			      return buildResponseJson( false, "File " + fileName + " not Saved!" );
			    }
			  }
		  
		  
		  /*
		   * FUSION CHARTS FUNCTIONS
		   */
		  
		  /**
			 * Parameter adapter. We use it so we're able to run the ParameterParser class without the IParameterProvider map given by the old Content Generator.
			 * @param request HTTP Request with header and request parameters.
			 * @param jsonStr JSON string obtained through POST calls.
			 * @return A map with the IParameterProviders "request", "headers", "path".
			 */
			private Map<String, IParameterProvider> getParameterProviders(
					HttpServletRequest request, String jsonStr) {

				Map<String, IParameterProvider> parameterProviders = new HashMap<String, IParameterProvider>();
				// Create request parameters
				SimpleParameterProvider requestParams = new SimpleParameterProvider();
				Enumeration paramKeys = request.getParameterNames();
				while (paramKeys.hasMoreElements()) {
					String key = (String) paramKeys.nextElement();
					String value = request.getParameter(key);
					requestParams.setParameter(key, value);
				}
				// If there's a JSON string it should be put together with the request parameters so it can be correctly parsed
				if (jsonStr != null) {
					requestParams.setParameter("json", jsonStr);
				}

				// Create header parameters
				SimpleParameterProvider headerParams = new SimpleParameterProvider();
				Enumeration names = request.getHeaderNames();
				while (names.hasMoreElements()) {
					String name = (String) names.nextElement();
					String value = request.getHeader(name);
					headerParams.setParameter(name, value);
				}

				// Populate IParameterProvider map
				parameterProviders.put(IParameterProvider.SCOPE_REQUEST, requestParams);
				parameterProviders.put("headers", headerParams);
				parameterProviders.put("path", new SimpleParameterProvider());
				return parameterProviders;
			}

			/**
			 * Log in debug mode all the parsed request parameters.
			 * @param pp ParameterProvider to be logged.
			 */
			private void printParameterParser(ParameterParser pp) {
				for (Entry<String, Object> entry : pp.getParameters().entrySet()) {
					logger.debug(entry.getKey() + " :: " + entry.getValue());
				}
			}
			
			/**
			 * Build a ParameterParser from a HTTP Request and an optional JSON string.
			 * @param request HTTP request.
			 * @param jsonStr Optional JSON string, useful in POST calls.
			 * @return The ParameterParser to be used in the built chart.
			 * @throws InvalidParameterException
			 */
			private ParameterParser buildParameterParser(HttpServletRequest request, String jsonStr)
					throws InvalidParameterException {
				ParameterParser parameterParser = new ParameterParser(getParameterProviders(request, jsonStr));
				return parameterParser;
			}
			
			private String checkRelativePathSanity( String path ) {
			    String result = path;

			    if ( path != null ) {
			      if ( result.startsWith( "./" ) ) {
			        result = result.replaceFirst( "./", "" );
			      }
			      if ( result.startsWith( "." ) ) {
			        result = result.replaceFirst( ".", "" );
			      }
			      if ( result.startsWith( "/" ) ) {
			        result = result.replaceFirst( "/", "" );
			      }

			      if ( result.endsWith( "/" ) ) {
			        result = result.substring( 0, result.length() - 1 );
			      }
			    }

			    return result;
			  }
			
			private boolean fileExists( String fullName, String baseSystemPath) {
				    if ( !checkPath( fullName ) ) {
				      return false;
				    }
				    File f;
				    if ( fullName.startsWith( File.separator ) ) {
				      f = new File( baseSystemPath + fullName );
				    } else {
				      f = new File( baseSystemPath + File.separator + fullName );
				    }
				    return f.exists();
				  }
			
			 private boolean checkPath( String path ) {
				    boolean result = !path.contains( ".." );
				    if ( !result ) {
				      logger.warn( "Path parameter contains unsupported back tracking path element: " + path );
				    }
				    return result;
				  }
			
			  private String buildResponseJson( boolean status, String message ) throws JSONException {
				    JSONObject result = new JSONObject();
				    result.put( "result", status );
				    result.put( "message", message );
				    return result.toString();
				  }
		  
}
