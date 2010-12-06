package com.xpandit.fusionplugin;

import java.util.Arrays;
import java.util.List;


public class FusionService {
  
  public List getSupportedMaps(){
    return Arrays.asList(MapInfo.values());
  }
  
  public String describeDataForMap(String mapName){
    return MapInfo.valueOf(mapName).getDataDescription();
  }
  
  enum MapInfo {
    
    USA("USA", "Map of the United States", "Column1: State Abbreviation; Column 2: Numeric Value");
    
    String mapName;
    String mapDescription;
    String dataDescription;
    
    MapInfo(String mapName, String mapDescription, String dataDescription){
      this.mapName = mapName;
      this.mapDescription = mapDescription;
      this.dataDescription = dataDescription;
    }
    
    public String getMapName() {
      return mapName;
    }
    public void setMapName(String mapName) {
      this.mapName = mapName;
    }
    public String getMapDescription() {
      return mapDescription;
    }
    public void setMapDescription(String mapDescription) {
      this.mapDescription = mapDescription;
    }
    public String getDataDescription() {
      return dataDescription;
    }
    public void setDataDescription(String dataDescription) {
      this.dataDescription = dataDescription;
    }
  }
}
