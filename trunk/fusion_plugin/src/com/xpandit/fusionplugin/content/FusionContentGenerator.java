package com.xpandit.fusionplugin.content;

import java.io.ByteArrayInputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.pentaho.commons.connection.IPentahoResultSet;
import org.pentaho.platform.api.engine.IParameterProvider;
import org.pentaho.platform.api.engine.ISolutionFile;
import org.pentaho.platform.api.repository.ISolutionRepository;
import org.pentaho.platform.engine.core.solution.ActionInfo;
import org.pentaho.platform.engine.core.system.PentahoSystem;
import org.pentaho.platform.engine.services.solution.SimpleContentGenerator;

import pt.webdetails.cda.CdaQueryComponent;

import com.xpandit.fusionplugin.FusionComponent;

public class FusionContentGenerator extends SimpleContentGenerator {
  private static final long serialVersionUID = 997953797244958291L;

  private static final String NAME              = "name";
  private static final String ACTION            = "action";
  private static final String PATH              = "path";
  private static final String SOLUTION          = "solution";
  private static final String ENCODING          = "UTF-8";
  private static final String MIMETYPE          = "text/html";
  private static final String CDAFILE           = "cda.file";
  private static final String CDAID             = "cda.dataAccessId";
  private static final String CHARTTYPE         = "chartType";
  private static final String CHARTTITLE        = "chartTitle";
  private static final String XAXISNAME         = "xAxisName";
  private static final String YAXISNAME         = "yAxisName";
  
  CdaQueryComponent cdaQueryComponent;
  FusionComponent fusionComponent;
  
  @Override
  public void createContent(OutputStream out) throws Exception {

    final ISolutionRepository repository = PentahoSystem.get(ISolutionRepository.class, userSession);
    final ISolutionFile file = repository.getSolutionFile(getAction().toString(), ISolutionRepository.ACTION_EXECUTE);
    
    if (file==null){
      getLogger().error("No solution file found: ".concat(getAction().toString()));
      return;
    }
    Properties properties = new Properties();
    properties.load(new ByteArrayInputStream(file.getData()));

    cdaQueryComponent = new CdaQueryComponent();
    cdaQueryComponent.setFile(properties.getProperty(CDAFILE));
    
    Map <String, Object> cdaInputs = new HashMap <String, Object>();
    cdaInputs.put("dataAccessId", properties.getProperty(CDAID));
    cdaQueryComponent.setInputs(cdaInputs);
    
    IPentahoResultSet resultset = null;

    if (cdaQueryComponent.execute()){
      resultset = cdaQueryComponent.getResultSet();
    }
    
    if (resultset==null){
      getLogger().error("Error retrieving data: cdaQueryComponent failed to return data. ");
      return;
    }
    
    fusionComponent = new FusionComponent();
    fusionComponent.setData(resultset);
    fusionComponent.setChartType(properties.getProperty(CHARTTYPE));
    fusionComponent.setChartTitle(properties.getProperty(CHARTTITLE));
    fusionComponent.setXAxisName(properties.getProperty(XAXISNAME));
    fusionComponent.setYAxisName(properties.getProperty(YAXISNAME));
    fusionComponent.setOutputStream(out);
    
    // Hack for relative URL conflict...
    String template = IOUtils.toString(fusionComponent.getHtmlTemplate());
    template = template.replaceAll("content/", "");
    fusionComponent.setHtmlTemplate(new ByteArrayInputStream(template.getBytes(ENCODING)));
    
    fusionComponent.execute();
  }

  @Override
  public String getMimeType() {
    return MIMETYPE;
  }

  @Override
  public Log getLogger() {
    return LogFactory.getLog(FusionContentGenerator.class);
  }
  
  private ActionInfo getAction(){
    
    ActionInfo action = null;
    IParameterProvider requestParams = parameterProviders.get(IParameterProvider.SCOPE_REQUEST);

    try{
      final String solution = URLDecoder.decode(requestParams.getStringParameter(SOLUTION, ""), ENCODING); 
      final String path = URLDecoder.decode(requestParams.getStringParameter(PATH, ""), ENCODING); 
      final String name = URLDecoder.decode(requestParams.getStringParameter(NAME, requestParams.getStringParameter(ACTION, "")), ENCODING);
      action = new ActionInfo(solution, path, name);
      
    }catch(UnsupportedEncodingException e){
      getLogger().error("Unsupported encoding: ".concat(ENCODING),e);
      
    }
   return action;
  }

}
