package com.xpandit.fusionplugin.pentaho.content;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.pentaho.platform.api.engine.IFileInfo;
import org.pentaho.platform.api.engine.ISolutionFile;
import org.pentaho.platform.api.engine.SolutionFileMetaAdapter;
import org.pentaho.platform.engine.core.solution.FileInfo;

/**
 * Class that make metadata available on the PUC.
 * 
 * @author xpandit
 *
 */
public class FusionContentTypeMetaProvider extends SolutionFileMetaAdapter {
  
  private static final String AUTHOR        = "meta.author";
  private static final String DESCRIPTION   = "meta.description";
  private static final String TITLE         = "meta.title";
  
  private static final Log logger = LogFactory.getLog(FusionContentTypeMetaProvider.class);

  public IFileInfo getFileInfo(ISolutionFile solutionFile, InputStream in) {
    
    Properties properties = new Properties();
    try {
      properties.load(in);
    } catch (IOException e) {
        logger.error("Error reading file for meta information.", e);
    }
    
    final IFileInfo fileInfo = new FileInfo();

    fileInfo.setTitle(properties.getProperty(TITLE, 
        solutionFile.getFileName().replace(solutionFile.getExtension(), "")));
    
    fileInfo.setAuthor(properties.getProperty(AUTHOR, "")); 
    fileInfo.setDescription(properties.getProperty(DESCRIPTION, ""));
    
    return fileInfo;
  }

}
