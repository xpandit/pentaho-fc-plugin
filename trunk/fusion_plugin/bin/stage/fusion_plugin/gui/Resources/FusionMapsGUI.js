/**
 * FusionMapsGUI: GUI rendering and handling class for FusionMaps v3.
 *
 */
if(typeof infosoftglobal == "undefined") var infosoftglobal = new Object();
if(typeof infosoftglobal.FusionMapsGUI == "undefined") infosoftglobal.FusionMapsGUI = new Object();
infosoftglobal.FusionMapsGUI = function(){
	if (!document.getElementById) { return; }	
	//Store the map id for global usage
	this.mapId = "MainMap";
	//Path for map storage
	this.mapPath = "../../Maps/";
	//Currently loaded map's index
	this.mapIndex = -1;
	//Get reference to the form - later we'll directly access objects.
	this.gForm = document['guiFORM'];	
	//List of maps that we've to cover
	this.mapList = new Array();	
	//Create container objects
	this.entities = new Array();	
	//Array to store Markers
	//In Markers array, we'll store each marker's ID only, to get referential index
	//The other details will be picked up from the form.
	this.markers = new Array();
	//Array to store marker positions
	this.markerPos = new Array();
	//What mode map is in. We need to keep a track of map mode for the following case:
	//1. User enters bad XML data and switches to preview tab (or XML > Update Chart).
	//2. Map goes into Invalid XML mode and therefore doesn't expose any JavaScript API.
	//3. enableChooseMode and disableChooseMode JavaScript API do not work anymore.
	//4. As such, switching of tabs give an error. So, we can conditionally switch tabs
	//only when required.
	this.chooseMode = false;
	//Define map list
	this.defineMapList();
}
// --------- Following functions help interact with the map ----------------//
infosoftglobal.FusionMapsGUI.prototype.getReferenceToMap = function(){
	//This method is invoked when the map has loaded and rendered. So, we can safely
	//get a reference to the map object.
	this.mapObj = infosoftglobal.FusionMapsUtil.getMapObject(this.mapId);			
	//If we cannot get a reference to map object, it means	
	//Also, we can now get the map's entities and store it.	
	this.entities = this.mapObj.getEntityList();
}
infosoftglobal.FusionMapsGUI.prototype.defineMapList = function(){
	this.mapList.push({isMap:false,title:"Please select a map below",swf:"",width:0,height:0});
	
	this.mapList.push({isMap:false,title:"------------------------------------",swf:"",width:0,height:0});
	
	this.mapList.push({isMap:true,title:"World Map",swf:"FCMap_World.swf",width:750,height:400});
	this.mapList.push({isMap:true,title:"World Map (8 Regions)",swf:"FCMap_World8.swf",width:570,height:290});
	this.mapList.push({isMap:true,title:"World Map (All Countries)",swf:"FCMap_WorldwithCountries.swf",width:2160,height:1130});
	this.mapList.push({isMap:true,title:"Europe",swf:"FCMap_Europe.swf",width:620,height:600});
	this.mapList.push({isMap:true,title:"North America",swf:"FCMap_NorthAmerica.swf",width:675,height:675});
	this.mapList.push({isMap:true,title:"Central America",swf:"FCMap_CentralAmerica.swf",width:610,height:470});
	this.mapList.push({isMap:true,title:"South America",swf:"FCMap_SouthAmerica.swf",width:600,height:700});
	this.mapList.push({isMap:true,title:"Asia",swf:"FCMap_Asia.swf",width:650,height:650});
	this.mapList.push({isMap:true,title:"Africa",swf:"FCMap_Africa.swf",width:670,height:620});
 	this.mapList.push({isMap:true,title:"Middle East",swf:"FCMap_MiddleEast.swf",width:620,height:480});
	this.mapList.push({isMap:true,title:"Oceania",swf:"FCMap_Oceania.swf",width:675,height:525});
	this.mapList.push({isMap:true,title:"Asia (No Mid-east)",swf:"FCMap_Asia3.swf",width:650,height:650});
	this.mapList.push({isMap:true,title:"North America (no Central)",swf:"FCMap_NorthAmerica_WOCentral.swf",width:660,height:660});	
	
	this.mapList.push({isMap:false,title:"  ",swf:"",width:0,height:0});
	this.mapList.push({isMap:false,title:"--------- US & Counties ---------",swf:"",width:0,height:0});
	
	this.mapList.push({isMap:true,title:"USA (States)",swf:"FCMap_USA.swf",width:750,height:460});
	this.mapList.push({isMap:true,title:"Alaska",swf:"FCMap_Alaska.swf",width:685,height:555});
	this.mapList.push({isMap:true,title:"Alabama",swf:"FCMap_Alabama.swf",width:575,height:875});
	this.mapList.push({isMap:true,title:"Arizona",swf:"FCMap_Arizona.swf",width:600,height:690});
	this.mapList.push({isMap:true,title:"Arkansas",swf:"FCMap_Arkansas.swf",width:720,height:650});
	this.mapList.push({isMap:true,title:"California",swf:"FCMap_California.swf",width:620,height:705});
	this.mapList.push({isMap:true,title:"Colorado",swf:"FCMap_Colorado.swf",width:810,height:670});
	this.mapList.push({isMap:true,title:"Connecticut",swf:"FCMap_Connecticut.swf",width:760,height:570});
	this.mapList.push({isMap:true,title:"Delaware",swf:"FCMap_Delaware.swf",width:375,height:850});
	this.mapList.push({isMap:true,title:"District of Columbia",swf:"FCMap_DistrictofColumbia.swf",width:640,height:750});
  	this.mapList.push({isMap:true,title:"Florida",swf:"FCMap_Florida.swf",width:650,height:600});
	this.mapList.push({isMap:true,title:"Georgia",swf:"FCMap_Georgia.swf",width:610,height:700});
	this.mapList.push({isMap:true,title:"Hawaii",swf:"FCMap_Hawaii.swf",width:770,height:490});
	this.mapList.push({isMap:true,title:"Idaho",swf:"FCMap_Idaho.swf",width:575,height:900});
	this.mapList.push({isMap:true,title:"Illinois",swf:"FCMap_Illinois.swf",width:550,height:910});
	this.mapList.push({isMap:true,title:"Indiana",swf:"FCMap_Indiana.swf",width:580,height:890});
	this.mapList.push({isMap:true,title:"Iowa",swf:"FCMap_Iowa.swf",width:760,height:500});
	this.mapList.push({isMap:true,title:"Kentucky",swf:"FCMap_Kentucky.swf",width:910,height:430});
	this.mapList.push({isMap:true,title:"Kansas",swf:"FCMap_Kansas.swf",width:760,height:400});
	this.mapList.push({isMap:true,title:"Lousiana",swf:"FCMap_Louisiana.swf",width:710,height:610});
	this.mapList.push({isMap:true,title:"Maine",swf:"FCMap_Maine.swf",width:600,height:870});
	this.mapList.push({isMap:true,title:"Maryland",swf:"FCMap_Maryland.swf",width:750,height:400});
	this.mapList.push({isMap:true,title:"Massachusetts",swf:"FCMap_Massachusetts.swf",width:770,height:490});
	this.mapList.push({isMap:true,title:"Michigan",swf:"FCMap_Michigan.swf",width:600,height:700});
	this.mapList.push({isMap:true,title:"Minnesota",swf:"FCMap_Minnesota.swf",width:620,height:670});
	this.mapList.push({isMap:true,title:"Mississippi",swf:"FCMap_Mississippi.swf",width:570,height:900});
	this.mapList.push({isMap:true,title:"Missouri",swf:"FCMap_Missouri.swf",width:680,height:600});
	this.mapList.push({isMap:true,title:"Montana",swf:"FCMap_Montana.swf",width:775,height:450});
	this.mapList.push({isMap:true,title:"Nebraska",swf:"FCMap_Nebraska.swf",width:775,height:375});
	this.mapList.push({isMap:true,title:"Nevada",swf:"FCMap_Nevada.swf",width:630,height:880});
	this.mapList.push({isMap:true,title:"New Hampshire",swf:"FCMap_NewHampshire.swf",width:300,height:550});
	this.mapList.push({isMap:true,title:"New Jersey",swf:"FCMap_NewJersey.swf",width:485,height:890});
	this.mapList.push({isMap:true,title:"New Mexico",swf:"FCMap_NewMexico.swf",width:600,height:690});
	this.mapList.push({isMap:true,title:"New York",swf:"FCMap_NewYork.swf",width:775,height:600});
	this.mapList.push({isMap:true,title:"North Carolina",swf:"FCMap_NorthCarolina.swf",width:900,height:400});
	this.mapList.push({isMap:true,title:"North Dakota",swf:"FCMap_NorthDakota.swf",width:770,height:470});
	this.mapList.push({isMap:true,title:"Ohio",swf:"FCMap_Ohio.swf",width:620,height:670});
	this.mapList.push({isMap:true,title:"Oklahoma",swf:"FCMap_Oklahoma.swf",width:780,height:380});
	this.mapList.push({isMap:true,title:"Oregon",swf:"FCMap_Oregon.swf",width:760,height:570});
	this.mapList.push({isMap:true,title:"Pennsylvania",swf:"FCMap_Pennsylvania.swf",width:770,height:460});
	this.mapList.push({isMap:true,title:"Rhode Island",swf:"FCMap_RhodeIsland.swf",width:600,height:900});
	this.mapList.push({isMap:true,title:"South Carolina",swf:"FCMap_SouthCarolina.swf",width:760,height:550});
	this.mapList.push({isMap:true,title:"South Dakota",swf:"FCMap_SouthDakota.swf",width:770,height:500});
	this.mapList.push({isMap:true,title:"Tennessee",swf:"FCMap_Tennessee.swf",width:770,height:210});
	this.mapList.push({isMap:true,title:"Texas",swf:"FCMap_Texas.swf",width:980,height:920});
	this.mapList.push({isMap:true,title:"Utah",swf:"FCMap_Utah.swf",width:620,height:780});
	this.mapList.push({isMap:true,title:"Washington",swf:"FCMap_Washington.swf",width:780,height:520});
	this.mapList.push({isMap:true,title:"Vermont",swf:"FCMap_Vermont.swf",width:570,height:900});
	this.mapList.push({isMap:true,title:"Virginia",swf:"FCMap_Virginia.swf",width:890,height:490});
	this.mapList.push({isMap:true,title:"West Virginia",swf:"FCMap_WestVirginia.swf",width:710,height:610});
	this.mapList.push({isMap:true,title:"Wisconsin",swf:"FCMap_Wisconsin.swf",width:650,height:690});
	this.mapList.push({isMap:true,title:"Wyoming",swf:"FCMap_Wyoming.swf",width:710,height:610});
	
	this.mapList.push({isMap:false,title:"  ",swf:"",width:0,height:0});
	this.mapList.push({isMap:false,title:"----------- US Regions ----------",swf:"",width:0,height:0});
	this.mapList.push({isMap:true,title:"USA (All Regions)",swf:"FCMap_USARegion.swf",width:710,height:510});
	this.mapList.push({isMap:true,title:"USA North East Region",swf:"FCMap_USANorthEastRegion.swf",width:440,height:400});
	this.mapList.push({isMap:true,title:"USA North West Region",swf:"FCMap_USANorthWestRegion.swf",width:360,height:320});
	this.mapList.push({isMap:true,title:"USA Central Region",swf:"FCMap_USACentralRegion.swf",width:250,height:350});
	this.mapList.push({isMap:true,title:"USA South East Region",swf:"FCMap_USASouthEastRegion.swf",width:460,height:360});
	this.mapList.push({isMap:true,title:"USA South West Region",swf:"FCMap_USASouthWestRegion.swf",width:270,height:230});
	
  this.mapList.push({isMap:false,title:"  ",swf:"",width:0,height:0});
  this.mapList.push({isMap:false,title:"------- Europe & Countries ------",swf:"",width:0,height:0});
  this.mapList.push({isMap:true,title:"Europe (All Countries)",swf:"FCMap_EuropewithCountries.swf",width:620,height:600});	
  this.mapList.push({isMap:true,title:"Europe (With all islands)",swf:"FCMap_Europe2.swf",width:460,height:460});	
  this.mapList.push({isMap:true,title:"Albania",swf:"FCMap_Albania.swf",width:190,height:410});
  this.mapList.push({isMap:true,title:"Andorra",swf:"FCMap_Andorra.swf",width:490,height:400});
  this.mapList.push({isMap:true,title:"Austria",swf:"FCMap_Austria.swf",width:580,height:320});
  this.mapList.push({isMap:true,title:"Belarus",swf:"FCMap_Belarus.swf",width:320,height:260});
  this.mapList.push({isMap:true,title:"Belgium",swf:"FCMap_Belgium.swf",width:400,height:330});
  this.mapList.push({isMap:true,title:"Bosnia-Herzegovina",swf:"FCMap_BosniaHerzegovina.swf",width:490,height:470});
  this.mapList.push({isMap:true,title:"Bulgaria",swf:"FCMap_Bulgaria.swf",width:580,height:400});
  this.mapList.push({isMap:true,title:"Croatia",swf:"FCMap_Croatia.swf",width:520,height:520});
  this.mapList.push({isMap:true,title:"Cyprus",swf:"FCMap_Cyprus.swf",width:630,height:390});
  this.mapList.push({isMap:true,title:"Cyprus (Regions)",swf:"FCMap_Cyprus2.swf",width:630,height:400});
  this.mapList.push({isMap:true,title:"Czech Republic",swf:"FCMap_CzechRepublic.swf",width:810,height:470});
  this.mapList.push({isMap:true,title:"Denmark",swf:"FCMap_Denmark.swf",width:700,height:550});
  this.mapList.push({isMap:true,title:"Denmark (Regions)",swf:"FCMap_DenmarkRegion.swf",width:530,height:590});
  this.mapList.push({isMap:true,title:"England",swf:"FCMap_England.swf",width:500,height:600});
  this.mapList.push({isMap:true,title:"Estonia",swf:"FCMap_Estonia.swf",width:600,height:400});
  this.mapList.push({isMap:true,title:"Finland",swf:"FCMap_Finland.swf",width:280,height:470});
  this.mapList.push({isMap:true,title:"France",swf:"FCMap_France.swf",width:650,height:575});
  this.mapList.push({isMap:true,title:"France (Departments)",swf:"FCMap_FranceDepartment.swf",width:620,height:580});
  this.mapList.push({isMap:true,title:"Germany",swf:"FCMap_Germany.swf",width:475,height:600});
  this.mapList.push({isMap:true,title:"Greece",swf:"FCMap_Greece.swf",width:420,height:430});
  this.mapList.push({isMap:true,title:"Hungary",swf:"FCMap_Hungary.swf",width:520,height:340});
  this.mapList.push({isMap:true,title:"Hungary (Regions)",swf:"FCMap_ HungaryRegions.swf",width:780,height:500});
  this.mapList.push({isMap:true,title:"Iceland",swf:"FCMap_Iceland.swf",width:510,height:360});
  this.mapList.push({isMap:true,title:"Ireland",swf:"FCMap_Ireland.swf",width:425,height:550});
  this.mapList.push({isMap:true,title:"Italy",swf:"FCMap_Italy.swf",width:500,height:575});
  this.mapList.push({isMap:true,title:"Latvia",swf:"FCMap_Latvia.swf",width:530,height:320});
  this.mapList.push({isMap:true,title:"Liechtenstein",swf:"FCMap_Liechtenstein.swf",width:320,height:610});
  this.mapList.push({isMap:true,title:"Lithuania",swf:"FCMap_Lithuania.swf",width:800,height:620});
  this.mapList.push({isMap:true,title:"Luxembourg",swf:"FCMap_Luxembourg.swf",width:560,height:780});
  this.mapList.push({isMap:true,title:"Macedonia",swf:"FCMap_Macedonia.swf",width:520,height:430});
  this.mapList.push({isMap:true,title:"Malta",swf:"FCMap_Malta.swf",width:360,height:310});	
  this.mapList.push({isMap:true,title:"Moldova",swf:"FCMap_Moldova.swf",width:350,height:440});
  this.mapList.push({isMap:true,title:"Monaco",swf:"FCMap_Monaco.swf",width:270,height:360});
  this.mapList.push({isMap:true,title:"Montenegro",swf:"FCMap_Montenegro.swf",width:520,height:590});
  this.mapList.push({isMap:true,title:"Netherland",swf:"FCMap_Netherland.swf",width:500,height:575});
  this.mapList.push({isMap:true,title:"Norway",swf:"FCMap_Norway.swf",width:530,height:570});
  this.mapList.push({isMap:true,title:"Norway (Regions)",swf:"FCMap_NorwayRegion.swf",width:600,height:550});
  this.mapList.push({isMap:true,title:"Poland (Counties)",swf:"FCMap_PolandCounties.swf",width:730,height:680});
  this.mapList.push({isMap:true,title:"Poland",swf:"FCMap_Poland.swf",width:420,height:400});
  this.mapList.push({isMap:true,title:"Portugal",swf:"FCMap_Portugal.swf",width:260,height:520});
  this.mapList.push({isMap:true,title:"Romania",swf:"FCMap_Romania.swf",width:480,height:350});
  this.mapList.push({isMap:true,title:"San Marino",swf:"FCMap_SanMarino.swf",width:330,height:400});
  this.mapList.push({isMap:true,title:"Scotland",swf:"FCMap_Scotland.swf",width:575,height:575});
  this.mapList.push({isMap:true,title:"Serbia",swf:"FCMap_Serbia.swf",width:360,height:500});
  this.mapList.push({isMap:true,title:"Slovakia",swf:"FCMap_Slovakia.swf",width:620,height:320});
  this.mapList.push({isMap:true,title:"Slovenia",swf:"FCMap_Slovenia.swf",width:570,height:390});
  this.mapList.push({isMap:true,title:"Spain (Autonomous)",swf:"FCMap_Spain.swf",width:560,height:400});
  this.mapList.push({isMap:true,title:"Spain (Provinces)",swf:"FCMap_SpainProvinces.swf",width:820,height:580});
  this.mapList.push({isMap:true,title:"Sweden",swf:"FCMap_Sweden.swf",width:300,height:600});
  this.mapList.push({isMap:true,title:"Switzerland",swf:"FCMap_Switzerland.swf",width:520,height:350});
  this.mapList.push({isMap:true,title:"Turkey",swf:"FCMap_Turkey.swf",width:720,height:330});
  this.mapList.push({isMap:true,title:"UK",swf:"FCMap_UK.swf",width:270,height:430});
  this.mapList.push({isMap:true,title:"Ukraine",swf:"FCMap_Ukraine.swf",width:560,height:390});
  this.mapList.push({isMap:true,title:"Vatican City",swf:"FCMap_VaticanCity.swf",width:330,height:260});
		
	this.mapList.push({isMap:false,title:"  ",swf:"",width:0,height:0});
	this.mapList.push({isMap:false,title:"------- Europe By Regions ------",swf:"",width:0,height:0});
	this.mapList.push({isMap:true,title:"Europe (All Regions)",swf:"FCMap_EuropeRegion.swf",width:440,height:410});
	this.mapList.push({isMap:true,title:"East European Region",swf:"FCMap_EastEuropeanRegion.swf",width:220,height:320});
	this.mapList.push({isMap:true,title:"West European Region",swf:"FCMap_WestEuropeanRegion.swf",width:280,height:320});
	this.mapList.push({isMap:true,title:"Central European Region",swf:"FCMap_CentralEuropeanRegion.swf",width:300,height:260});
	this.mapList.push({isMap:true,title:"North European Region",swf:"FCMap_NorthEuropeanRegion.swf",width:280,height:260});
	this.mapList.push({isMap:true,title:"South European Region",swf:"FCMap_SouthEuropeanRegion.swf",width:600,height:225});
	
	this.mapList.push({isMap:false,title:"  ",swf:"",width:0,height:0});
	this.mapList.push({isMap:false,title:"---------------- UK ----------------",swf:"",width:0,height:0});
	this.mapList.push({isMap:true,title:"UK",swf:"FCMap_UK.swf",width:270,height:430});
  	this.mapList.push({isMap:true,title:"UK (With Islands)",swf:"FCMap_UK7.swf",width:360,height:590});
	this.mapList.push({isMap:true,title:"England (Region)",swf:"FCMap_EnglandRegion.swf",width:410,height:470});	
	this.mapList.push({isMap:true,title:"Scotland (Region)",swf:"FCMap_ScotlandRegion.swf",width:400,height:470});
	this.mapList.push({isMap:true,title:"Wales",swf:"FCMap_Wales.swf",width:340,height:410});	
	this.mapList.push({isMap:true,title:"North Ireland",swf:"FCMap_NorthIreland.swf",width:420,height:350});

	this.mapList.push({isMap:false,title:"  ",swf:"",width:0,height:0});
	this.mapList.push({isMap:false,title:"--------- North America ---------",swf:"",width:0,height:0});	
	this.mapList.push({isMap:true,title:"Antigua",swf:"FCMap_Antigua.swf",width:510,height:380});
	this.mapList.push({isMap:true,title:"Bahamas",swf:"FCMap_Bahamas.swf",width:530,height:570});
	this.mapList.push({isMap:true,title:"Barbados",swf:"FCMap_Barbados.swf",width:210,height:270});	
	this.mapList.push({isMap:true,title:"British Columbia",swf:"FCMap_BritishColumbia.swf",width:570,height:530});
	this.mapList.push({isMap:true,title:"Canada",swf:"FCMap_Canada.swf",width:660,height:560});
  	this.mapList.push({isMap:true,title:"CaymanIsland",swf:"FCMap_CaymanIslands.swf",width:920,height:450});
	this.mapList.push({isMap:true,title:"Cuba",swf:"FCMap_Cuba.swf",width:600,height:240});
	this.mapList.push({isMap:true,title:"Dominica",swf:"FCMap_Dominica.swf",width:160,height:280});
	this.mapList.push({isMap:true,title:"Dominican Republic",swf:"FCMap_DominicanRepublic.swf",width:410,height:300});
	this.mapList.push({isMap:true,title:"Greenland",swf:"FCMap_Greenland.swf",width:320,height:550});
	this.mapList.push({isMap:true,title:"Grenada",swf:"FCMap_Grenada.swf",width:260,height:300});
	this.mapList.push({isMap:true,title:"Haiti",swf:"FCMap_Haiti.swf",width:360,height:290});
	this.mapList.push({isMap:true,title:"Jamaica",swf:"FCMap_Jamaica.swf",width:420,height:180});
	this.mapList.push({isMap:true,title:"Mexico",swf:"FCMap_Mexico.swf",width:770,height:450});
	this.mapList.push({isMap:true,title:"Ontario",swf:"FCMap_Ontario.swf",width:615,height:600});
	this.mapList.push({isMap:true,title:"Puerto Rico",swf:"FCMap_PuertoRico.swf",width:670,height:350});
	this.mapList.push({isMap:true,title:"Quebec",swf:"FCMap_Quebec.swf",width:360,height:420});
	this.mapList.push({isMap:true,title:"Saint Kitts & Nevis",swf:"FCMap_SaintKittsandNevis.swf",width:360,height:340});
	this.mapList.push({isMap:true,title:"Saint Lucia",swf:"FCMap_SaintLucia.swf",width:280,height:530});
	this.mapList.push({isMap:true,title:"Saint Vincent & The Grenadines",swf:"FCMap_SaintVincentandtheGrenadines.swf",width:240,height:530});
	this.mapList.push({isMap:true,title:"Trinidad & Tabogo",swf:"FCMap_TrinidadandTobago.swf.swf",width:620,height:580});
	
	this.mapList.push({isMap:false,title:"  ",swf:"",width:0,height:0});
	this.mapList.push({isMap:false,title:"--------- South America ---------",swf:"",width:0,height:0});	
	this.mapList.push({isMap:true,title:"Argentina",swf:"FCMap_Argentina.swf",width:350,height:700});
	this.mapList.push({isMap:true,title:"Bolivia",swf:"FCMap_Bolivia.swf",width:310,height:350});
	this.mapList.push({isMap:true,title:"Brazil",swf:"FCMap_Brazil.swf",width:650,height:600});
  	this.mapList.push({isMap:true,title:"Brazil (Regions)",swf:"FCMap_BrazilRegion.swf",width:380,height:380});
	this.mapList.push({isMap:true,title:"Chile",swf:"FCMap_Chile.swf",width:210,height:580});
	this.mapList.push({isMap:true,title:"Colombia",swf:"FCMap_Colombia.swf",width:430,height:580});
	this.mapList.push({isMap:true,title:"Ecuador",swf:"FCMap_Ecuador.swf",width:460,height:410});
	  this.mapList.push({isMap:true,title:"Falkland Island",swf:"FCMap_FalklandIsland.swf",width:390,height:310});
	  this.mapList.push({isMap:true,title:"French Guiana",swf:"FCMap_FrenchGuiana.swf",width:380,height:470});
	  this.mapList.push({isMap:true,title:"Guyana",swf:"FCMap_Guyana.swf",width:340,height:420});
	this.mapList.push({isMap:true,title:"Paraguay",swf:"FCMap_Paraguay.swf",width:310,height:330});
	this.mapList.push({isMap:true,title:"Peru",swf:"FCMap_Peru.swf",width:370,height:520});
	this.mapList.push({isMap:true,title:"Suriname",swf:"FCMap_Suriname.swf",width:410,height:430});
	this.mapList.push({isMap:true,title:"Uruguay",swf:"FCMap_Uruguay.swf",width:310,height:350});
	this.mapList.push({isMap:true,title:"Venezuela",swf:"FCMap_Venezuela.swf",width:560,height:490});
	
	this.mapList.push({isMap:false,title:"  ",swf:"",width:0,height:0});
	this.mapList.push({isMap:false,title:"-------- Central America --------",swf:"",width:0,height:0});
  	this.mapList.push({isMap:true,title:"Central America (with Caribbean)",swf:"FCMap_CentralAmericawithCaribbean.swf",width:660,height:560});	
	this.mapList.push({isMap:true,title:"Central America (with Virgin Islands)",swf:"FCMap_CentralAmerica2.swf",width:660,height:660});
	this.mapList.push({isMap:true,title:"Belize",swf:"FCMap_Belize.swf",width:160,height:260});
	this.mapList.push({isMap:true,title:"Costa Rica",swf:"FCMap_CostaRica.swf",width:320,height:310});
	this.mapList.push({isMap:true,title:"El Salvador",swf:"FCMap_ElSalvador.swf",width:330,height:225});
	this.mapList.push({isMap:true,title:"Guatemala",swf:"FCMap_Guatemala.swf",width:450,height:450});	
	this.mapList.push({isMap:true,title:"Honduras",swf:"FCMap_Honduras.swf",width:420,height:260});
	this.mapList.push({isMap:true,title:"Nicaragua",swf:"FCMap_Nicaragua.swf",width:410,height:380});
	this.mapList.push({isMap:true,title:"Panama",swf:"FCMap_Panama.swf",width:430,height:210});
	
	this.mapList.push({isMap:false,title:"  ",swf:"",width:0,height:0});
	this.mapList.push({isMap:false,title:"-------- Canada - Provinces & Territories --------",swf:"",width:0,height:0});
	  this.mapList.push({isMap:true,title:"Alberta",swf:"FCMap_Alberta.swf",width:290,height:490});
	  this.mapList.push({isMap:true,title:"Manitoba",swf:"FCMap_Manitoba.swf",width:330,height:480});
	  this.mapList.push({isMap:true,title:"New Brunswick",swf:"FCMap_NewBrunswick.swf",width:460,height:460});
	  this.mapList.push({isMap:true,title:"New Foundland & Labrador",swf:"FCMap_NewfoundlandandLabrador.swf",width:450,height:350});
	  this.mapList.push({isMap:true,title:"Northwest Territories",swf:"FCMap_NorthwestTerritories.swf",width:310,height:480});
	  this.mapList.push({isMap:true,title:"Nova Scotia",swf:"FCMap_NovaScotia.swf",width:460,height:350});
	  this.mapList.push({isMap:true,title:"Nunavut",swf:"FCMap_Nunavut.swf",width:360,height:450});
	  this.mapList.push({isMap:true,title:"Prince Edward Island",swf:"FCMap_PrinceEdwardIsland.swf",width:470,height:320});
	  this.mapList.push({isMap:true,title:"Saskatchewan",swf:"FCMap_Saskatchewan.swf",width:260,height:460});
	  this.mapList.push({isMap:true,title:"Yukon Territory",swf:"FCMap_YukonTerritory.swf",width:510,height:750});
	
	this.mapList.push({isMap:false,title:"  ",swf:"",width:0,height:0});
	this.mapList.push({isMap:false,title:"--------------- Asia ---------------",swf:"",width:0,height:0});			
	this.mapList.push({isMap:true,title:"Armenia",swf:"FCMap_Armenia.swf",width:500,height:510});
	this.mapList.push({isMap:true,title:"Azerbaijan",swf:"FCMap_Azerbaijan.swf",width:600,height:480});
	this.mapList.push({isMap:true,title:"Bangladesh",swf:"FCMap_Bangladesh.swf",width:460,height:620});
  this.mapList.push({isMap:true,title:"Bhutan",swf:"FCMap_Bhutan.swf",width:790,height:450});
  this.mapList.push({isMap:true,title:"Brunei",swf:"FCMap_Brunei.swf",width:530,height:450});
  this.mapList.push({isMap:true,title:"Burma",swf:"FCMap_Burma.swf",width:600,height:1200});
  this.mapList.push({isMap:true,title:"Cambodia",swf:"FCMap_Cambodia.swf",width:430,height:360});
  this.mapList.push({isMap:true,title:"China",swf:"FCMap_China.swf",width:500,height:420});
  this.mapList.push({isMap:true,title:"China - 2",swf:"FCMap_China2.swf",width:890,height:730});
  this.mapList.push({isMap:true,title:"Georgia",swf:"FCMap_AsiaGeorgia.swf",width:580,height:300});
  this.mapList.push({isMap:true,title:"East Timor",swf:"FCMap_EastTimor.swf",width:1070,height:470});
  this.mapList.push({isMap:true,title:"Hong Kong",swf:"FCMap_HongKong.swf",width:760,height:600});
  this.mapList.push({isMap:true,title:"India",swf:"FCMap_India.swf",width:625,height:650});
  this.mapList.push({isMap:true,title:"Indonesia",swf:"FCMap_Indonesia.swf",width:800,height:300});
  this.mapList.push({isMap:true,title:"Japan",swf:"FCMap_Japan.swf",width:575,height:625});
  this.mapList.push({isMap:true,title:"Kazakhstan",swf:"FCMap_Kazakhstan.swf",width:570,height:420});
  this.mapList.push({isMap:true,title:"Laos",swf:"FCMap_Laos.swf",width:280,height:320});
  this.mapList.push({isMap:true,title:"Macau",swf:"FCMap_Macau.swf",width:490,height:780});
  this.mapList.push({isMap:true,title:"Malaysia",swf:"FCMap_Malaysia.swf",width:600,height:275});
  this.mapList.push({isMap:true,title:"Mongolia",swf:"FCMap_Mongolia.swf",width:830,height:430});
  this.mapList.push({isMap:true,title:"Nepal",swf:"FCMap_Nepal.swf",width:760,height:410});
  this.mapList.push({isMap:true,title:"North Korea",swf:"FCMap_NorthKorea.swf",width:530,height:560});
  this.mapList.push({isMap:true,title:"Philippines",swf:"FCMap_Philippines.swf",width:590,height:790});
  this.mapList.push({isMap:true,title:"Russia",swf:"FCMap_Russia.swf",width:675,height:450});
  this.mapList.push({isMap:true,title:"Singapore",swf:"FCMap_Singapore.swf",width:570,height:350});
  this.mapList.push({isMap:true,title:"South Korea",swf:"FCMap_SouthKorea.swf",width:550,height:570});
  this.mapList.push({isMap:true,title:"SriLanka",swf:"FCMap_SriLanka.swf",width:610,height:1050});
  this.mapList.push({isMap:true,title:"Taiwan",swf:"FCMap_Taiwan.swf",width:450,height:560});
  this.mapList.push({isMap:true,title:"Thailand",swf:"FCMap_Thailand.swf",width:710,height:1200});
  this.mapList.push({isMap:true,title:"Tibet",swf:"FCMap_Tibet.swf",width:510,height:340});
  this.mapList.push({isMap:true,title:"Vietnam",swf:"FCMap_Vietnam.swf",width:330,height:620});
	
	this.mapList.push({isMap:false,title:"  ",swf:"",width:0,height:0});
	this.mapList.push({isMap:false,title:"----------- Middle East -----------",swf:"",width:0,height:0});
  this.mapList.push({isMap:true,title:"Afghanistan",swf:"FCMap_Afghanistan.swf",width:620,height:480});
  this.mapList.push({isMap:true,title:"Bahrain",swf:"FCMap_Bahrain.swf",width:160,height:230});
  this.mapList.push({isMap:true,title:"Iran",swf:"FCMap_Iran.swf",width:430,height:400});
  this.mapList.push({isMap:true,title:"Iraq",swf:"FCMap_Iraq.swf",width:320,height:330});
  this.mapList.push({isMap:true,title:"Israel",swf:"FCMap_Israel.swf",width:200,height:500});
  this.mapList.push({isMap:true,title:"Jordan",swf:"FCMap_Jordan.swf",width:530,height:590});
  this.mapList.push({isMap:true,title:"Kuwait",swf:"FCMap_Kuwait.swf",width:530,height:510});
  this.mapList.push({isMap:true,title:"Kyrgyzstan",swf:"FCMap_Kyrgyzstan.swf",width:770,height:400});
  this.mapList.push({isMap:true,title:"Lebanon",swf:"FCMap_Lebanon.swf",width:330,height:420});
  this.mapList.push({isMap:true,title:"Oman",swf:"FCMap_Oman.swf",width:460,height:580});
  this.mapList.push({isMap:true,title:"Pakistan",swf:"FCMap_Pakistan.swf",width:230,height:220});
  this.mapList.push({isMap:true,title:"Qatar",swf:"FCMap_Qatar.swf",width:230,height:440});
  this.mapList.push({isMap:true,title:"Saudi Arabia",swf:"FCMap_SaudiArabia.swf",width:430,height:380});
  this.mapList.push({isMap:true,title:"Syria",swf:"FCMap_Syria.swf",width:430,height:380});
  this.mapList.push({isMap:true,title:"Tajikistan",swf:"FCMap_Tajikistan.swf",width:330,height:250});
  this.mapList.push({isMap:true,title:"Turkmenistan",swf:"FCMap_Turkmenistan.swf",width:330,height:240});
  this.mapList.push({isMap:true,title:"United Arab Emirates",swf:"FCMap_UAE.swf",width:580,height:480});
  this.mapList.push({isMap:true,title:"Uzbekistan",swf:"FCMap_Uzbekistan.swf",width:400,height:240});
  this.mapList.push({isMap:true,title:"Yemen",swf:"FCMap_Yemen.swf",width:530,height:330});
	
  this.mapList.push({isMap:false,title:"  ",swf:"",width:0,height:0});
	this.mapList.push({isMap:false,title:"------------- Oceania -------------",swf:"",width:0,height:0});	
	this.mapList.push({isMap:true,title:"Oceania",swf:"FCMap_Oceania.swf",width:675,height:525});
	this.mapList.push({isMap:true,title:"Australia",swf:"FCMap_Australia.swf",width:275,height:215});
  this.mapList.push({isMap:true,title:"Australia (W/Capital)",swf:"FCMap_Australia2.swf",width:660,height:610});
  this.mapList.push({isMap:true,title:"Fiji",swf:"FCMap_Fiji.swf",width:610,height:600});
  this.mapList.push({isMap:true,title:"Kiribati",swf:"FCMap_Kiribati.swf",width:330,height:170});
  this.mapList.push({isMap:true,title:"Marshall Islands",swf:"FCMap_MarshallIsland.swf",width:380,height:310});
  this.mapList.push({isMap:true,title:"Micronesia",swf:"FCMap_Micronesia.swf",width:760,height:340});
  this.mapList.push({isMap:true,title:"Nauru",swf:"FCMap_Nauru.swf",width:510,height:520});
  this.mapList.push({isMap:true,title:"New Caledonia",swf:"FCMap_NewCaledonia.swf",width:560,height:440});
  this.mapList.push({isMap:true,title:"New Zealand",swf:"FCMap_NewZealand.swf",width:410,height:600});
  this.mapList.push({isMap:true,title:"Palau",swf:"FCMap_Palau.swf",width:640,height:720});
  this.mapList.push({isMap:true,title:"Papua New Guinea",swf:"FCMap_PapuaNewGuinea.swf",width:810,height:570});
  this.mapList.push({isMap:true,title:"Samoa",swf:"FCMap_Samoa.swf",width:810,height:400});
  this.mapList.push({isMap:true,title:"Solomon Islands",swf:"FCMap_SolomonIsland.swf",width:590,height:280});
  this.mapList.push({isMap:true,title:"Tonga",swf:"FCMap_Tonga.swf",width:210,height:540});
  this.mapList.push({isMap:true,title:"Tuvalu",swf:"FCMap_Tuvalu.swf",width:360,height:390});
  this.mapList.push({isMap:true,title:"Vanuatu",swf:"FCMap_Vanuatu.swf",width:210,height:390});
	
	this.mapList.push({isMap:false,title:"  ",swf:"",width:0,height:0});
	this.mapList.push({isMap:false,title:"-------- Africa & Countries -------",swf:"",width:0,height:0});
  this.mapList.push({isMap:true,title:"Algeria",swf:"FCMap_Algeria.swf",width:330,height:320});
  this.mapList.push({isMap:true,title:"Angola",swf:"FCMap_Angola.swf",width:330,height:370});
  this.mapList.push({isMap:true,title:"Benin",swf:"FCMap_Benin.swf",width:170,height:290});
  this.mapList.push({isMap:true,title:"Botswana",swf:"FCMap_Botswana.swf",width:600,height:580});
  this.mapList.push({isMap:true,title:"Burkina Faso",swf:"FCMap_BurkinaFaso.swf",width:610,height:470});
  this.mapList.push({isMap:true,title:"Burundi",swf:"FCMap_Burundi.swf",width:460,height:500});
  this.mapList.push({isMap:true,title:"Cameroon",swf:"FCMap_Cameroon.swf",width:450,height:600});
  this.mapList.push({isMap:true,title:"Cape Verde",swf:"FCMap_CapeVerde.swf",width:710,height:630});
  this.mapList.push({isMap:true,title:"Central African Republic",swf:"FCMap_CentralAfricanRepublic.swf",width:460,height:320});
  this.mapList.push({isMap:true,title:"Chad",swf:"FCMap_Chad.swf",width:330,height:500});
  this.mapList.push({isMap:true,title:"Comoros",swf:"FCMap_Comoros.swf",width:620,height:550});
  this.mapList.push({isMap:true,title:"Congo",swf:"FCMap_Congo.swf",width:330,height:380});
  this.mapList.push({isMap:true,title:"Cote Divoire",swf:"FCMap_CoteDivoire.swf",width:520,height:570});
  this.mapList.push({isMap:true,title:"Democratic Republic of the Congo",swf:"FCMap_DemocraticRepublicofCongo.swf",width:430,height:430});
  this.mapList.push({isMap:true,title:"Djibouti",swf:"FCMap_Djibouti.swf",width:380,height:450});
	this.mapList.push({isMap:true,title:"Egypt",swf:"FCMap_Egypt.swf",width:410,height:420});
  this.mapList.push({isMap:true,title:"Equatorial Guinea",swf:"FCMap_EquatorialGuinea.swf",width:330,height:210});
  this.mapList.push({isMap:true,title:"Eritrea",swf:"FCMap_Eritrea.swf",width:430,height:390});
  this.mapList.push({isMap:true,title:"Ethiopia",swf:"FCMap_Ethiopia.swf",width:520,height:410});
  this.mapList.push({isMap:true,title:"Gabon",swf:"FCMap_Gabon.swf",width:320,height:350});
  this.mapList.push({isMap:true,title:"Gambia",swf:"FCMap_Gambia.swf",width:660,height:200});
  this.mapList.push({isMap:true,title:"Ghana",swf:"FCMap_Ghana.swf",width:600,height:690});
  this.mapList.push({isMap:true,title:"Guinea",swf:"FCMap_Guinea.swf",width:420,height:350});
  this.mapList.push({isMap:true,title:"Guinea-Bissau",swf:"FCMap_GuineaBissau.swf",width:690,height:430});
  this.mapList.push({isMap:true,title:"Kenya",swf:"FCMap_Kenya.swf",width:300,height:340});
  this.mapList.push({isMap:true,title:"Lesotho",swf:"FCMap_Lesotho.swf",width:620,height:540});
  this.mapList.push({isMap:true,title:"Liberia",swf:"FCMap_Liberia.swf",width:440,height:450});
  this.mapList.push({isMap:true,title:"Libya",swf:"FCMap_Libya.swf",width:580,height:600});
  this.mapList.push({isMap:true,title:"Madagascar",swf:"FCMap_Madagascar.swf",width:230,height:420});
  this.mapList.push({isMap:true,title:"Madagascar (Regions)",swf:"FCMap_MadagascarRegions.swf",width:380,height:630});
  this.mapList.push({isMap:true,title:"Malawi",swf:"FCMap_Malawi.swf",width:280,height:620});
  this.mapList.push({isMap:true,title:"Mali",swf:"FCMap_Mali.swf",width:480,height:480});
  this.mapList.push({isMap:true,title:"Mauritania",swf:"FCMap_Mauritania.swf",width:330,height:360});
  this.mapList.push({isMap:true,title:"Mauritius",swf:"FCMap_Mauritius.swf",width:330,height:360});
  this.mapList.push({isMap:true,title:"Morocco",swf:"FCMap_Morocco.swf",width:400,height:410});
  this.mapList.push({isMap:true,title:"Mozambique",swf:"FCMap_Mozambique.swf",width:310,height:510});
  this.mapList.push({isMap:true,title:"Namibia",swf:"FCMap_Namibia.swf",width:330,height:340});
  this.mapList.push({isMap:true,title:"Niger",swf:"FCMap_Niger.swf",width:570,height:460});
  this.mapList.push({isMap:true,title:"Nigeria",swf:"FCMap_Nigeria.swf",width:430,height:390});
  this.mapList.push({isMap:true,title:"Rwanda",swf:"FCMap_Rwanda.swf",width:480,height:430});
  this.mapList.push({isMap:true,title:"Sao Tome and Principe",swf:"FCMap_SaoTomeandPrincipe.swf",width:270,height:380});
  this.mapList.push({isMap:true,title:"Senegal",swf:"FCMap_Senegal.swf",width:620,height:450});
  this.mapList.push({isMap:true,title:"Seychelles",swf:"FCMap_Seychelles.swf",width:270,height:320});
  this.mapList.push({isMap:true,title:"Sierra Leone",swf:"FCMap_SierraLeone.swf",width:490,height:500});
  this.mapList.push({isMap:true,title:"Somalia",swf:"FCMap_Somalia.swf",width:460,height:620});
  this.mapList.push({isMap:true,title:"South Africa",swf:"FCMap_SouthAfrica.swf",width:460,height:500});
  this.mapList.push({isMap:true,title:"Sudan",swf:"FCMap_Sudan.swf",width:610,height:770});
  this.mapList.push({isMap:true,title:"Swaziland",swf:"FCMap_Swaziland.swf",width:180,height:220});
  this.mapList.push({isMap:true,title:"Tanzania",swf:"FCMap_Tanzania.swf",width:570,height:580});
  this.mapList.push({isMap:true,title:"Togo",swf:"FCMap_Togo.swf",width:180,height:400});
  this.mapList.push({isMap:true,title:"Tunisia",swf:"FCMap_Tunisia.swf",width:370,height:630});	
  this.mapList.push({isMap:true,title:"Uganda",swf:"FCMap_Uganda.swf",width:880,height:910});
  this.mapList.push({isMap:true,title:"Western Sahara",swf:"FCMap_WesternSahara.swf",width:340,height:310});
  this.mapList.push({isMap:true,title:"Zambia",swf:"FCMap_Zambia.swf",width:510,height:440});
  this.mapList.push({isMap:true,title:"Zimbabwe",swf:"FCMap_Zimbabwe.swf",width:500,height:470});
	
}
infosoftglobal.FusionMapsGUI.prototype.loadMap = function(index){
	//This method loads the map, if the index is a map value
	if(this.mapList[index].isMap){
		//Store the index of new map
		this.mapIndex = index;
		var map = new FusionMaps(this.mapPath + this.mapList[index].swf, this.mapId, this.mapList[index].width, this.mapList[index].height, "0", "1");      
		map.setDataXML("<map animation='0' showBevel='0' showShadow='0' fillColor='F1f1f1' borderColor='000000'/>");
		map.render("mapdiv");
		//Update mapNameDiv with the new map's name
		var dv = document.getElementById("mapNameDiv");
		dv.innerHTML = "<span class='text'>Map of " + this.mapList[index].title + "</span>";
	}	
}
infosoftglobal.FusionMapsGUI.prototype.previewMap = function(){
	//This method is called when the user wants to preview map.
	//Get XML data for the map.
	var strXML = this.getFullXMLData();
	//Bug Handling: Due to weird behavior in Firefox when markers are defined, we cannot
	//directly update the map data using it's JS interface. So, if markes are defined
	//and the browser is Firefox (non IE), we re-load the map.
	if ((markerWinOpened==true || this.markers.length>0) && navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {		
		//Update flag that it's a forced re-load
		isReload = true;
		markerWinOpened = false;
		//Re-load map		
		var map = new FusionMaps(this.mapPath + this.mapList[this.mapIndex].swf, this.mapId, this.mapList[this.mapIndex].width, this.mapList[this.mapIndex].height, "0", "1"); 
		map.setDataXML(strXML);
		map.render("mapdiv");
	}else{
		//If IE or if no-markers defined
		//Just update map data
		this.mapObj.setDataXML(strXML);
	}
}
infosoftglobal.FusionMapsGUI.prototype.updateMapfromXML = function(){
	//This method updates the map with XML data contained in the textarea.
	//Bug Handling: Due to weird behavior in Firefox when markers are defined, we cannot
	//directly update the map data using it's JS interface. So, if markes are defined
	//and the browser is Firefox (non IE), we re-load the map.
	if (markerWinOpened==true && navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {		
		//Update flag that it's a forced re-load
		isReload = true;
		//Re-load map		
		var map = new FusionMaps(this.mapPath + this.mapList[this.mapIndex].swf, this.mapId, this.mapList[this.mapIndex].width, this.mapList[this.mapIndex].height, "0", "1"); 
		map.setDataXML(this.getValue("xmlDataFull"));
		map.render("mapdiv");
	}else{
		//If IE or if no-markers defined
		//Just update map data
		this.mapObj.setDataXML(this.getValue("xmlDataFull"),false);
	}
}
infosoftglobal.FusionMapsGUI.prototype.enableChooseMode = function(){
	//If map is not in Invalid XML mode and we've chooseMode function exposed
	if (typeof this.mapObj.enableChooseMode=="function"){
		this.mapObj.enableChooseMode();
		//Update flag
		this.chooseMode = true;
	}
}
infosoftglobal.FusionMapsGUI.prototype.disableChooseMode = function(){
	//If in choose mode, disable
	if(this.chooseMode == true){
		this.mapObj.disableChooseMode();
		//Update flag
		this.chooseMode = false;
	}
}
// ------------ Form renderers, controllers and handlers ----------------------//
infosoftglobal.FusionMapsGUI.prototype.renderMapSelectionBox = function(divRef){
	//This method renders the map selection drop down box in the divRef div.
	//Get reference to the div	
	var dv = document.getElementById(divRef);
	//Create the HTML for select box
	var selectHTML = "<select name='mapSelector' class='select' onChange=\"javascript:changeMap(document['guiFORM'].mapSelector.value);\">";
	var i;
	for (i=0; i<this.mapList.length; i++){
		selectHTML = selectHTML + "<option value='" + String(i) + "'>" + this.mapList[i].title;
	}
	//Close select tag
	selectHTML = selectHTML + "</select>";
	//Render it in within the select DIV
	dv.innerHTML = selectHTML;
}
infosoftglobal.FusionMapsGUI.prototype.isMapIndex = function(index){
	//This method checks whether the index of the map drop-down list actually belongs to a map
	return this.mapList[index].isMap;
}
infosoftglobal.FusionMapsGUI.prototype.createTabs = function(){
	//This method creates the required tabs for data entry and display
	//Get reference to the div that contains tabs
	var dv = document.getElementById("tabDiv");
	//Update its visibility
	dv.style.display = "inline";
	//Update form for the new map
	//First up, update the entityList form
	this.updateEntityForm();
}
infosoftglobal.FusionMapsGUI.prototype.clearForms = function(){
	//clearForms method clears the form when a map type is changed
	//and a new map is sent for loading.	
	//Switch back to first tab - so that we keep our events track on marker tab
	document.getElementById('maintab').tabber.tabShow(0);
	//Update Entity Form
	var dv = document.getElementById("entityFormDiv");
	dv.innerHTML = "<span class='text'><B>Please wait while the new map is loading.</B></span>";
	//Remove all rows from marker tables
	while (getTableLen("tblMarker")>0){
		deleteLastRow("tblMarker");
	}
	//Clear HTML Code text-area
	this.gForm.htmlCode.value = "";
	//Clear the XML code textareas
	this.gForm.xmlDataFull.value = "";
	this.gForm.xmlEntityTemplate.value = "";
	this.gForm.xmlMarkerFull.value = "";
	this.gForm.xmlMarkerDef.value = "";
	//Hide all tabs
	var dv = document.getElementById("tabDiv");
	//Update its visibility
	dv.style.display = "none";
}
infosoftglobal.FusionMapsGUI.prototype.updateEntityForm = function(){
	//This function updates the entity form, where user can enter data.
	//HTML for the entire form
	var fHTML = "<table width='95%' align='center' cellpadding='2' cellspacing='2' style='border:1px #CCCCCC solid;'>";
	var fHTML = fHTML + "<tr bgColor='#E0E0E0'><td width='25%' class='header' valign='top'>Entity Name</td><td width='8%' class='header' valign='top'>Id</td><td width='12%' class='header' valign='top' align='center'>Value</td><td width='16%' class='header' valign='top' align='center'>Display Value</td><td width='12%' class='header' valign='top'>&nbsp;Tool-tip</td><td width='15%' class='header' valign='top'>&nbsp;Link</td><td width='15%' class='header' valign='top' align='center'>Color</td></tr>";
	for (i=1; i<this.entities.length; i++){
		//Based on i, do alternate coloring
		if (i % 2==1){
			fHTML = fHTML + "<tr bgColor='#F5F5F5'>";
		}else{
			fHTML = fHTML + "<tr>";
		}
		fHTML = fHTML + "<td width='25%' class='text' valign='middle'>" + String(this.entities[i].lName) + "</td>";
		fHTML = fHTML + "<td width='8%' class='text' valign='middle'>" + String(this.entities[i].id) + "</td>";
		fHTML = fHTML + "<td width='12%' valign='middle' align='center'><input type='text' class='textbox' size='6' name='eValue" + String(i) + "' onBlur='if(this.value!=\"\" && isNaN(this.value)) {alert(\"You cannot enter a non-numeric value for an entity\"); this.focus();}'/> </td>";																																																																 
		fHTML = fHTML + "<td width='16%' valign='middle' align='center'><input type='text' class='textbox' size='12' name='eDisplayValue" + String(i) + "' /> </td>";
		fHTML = fHTML + "<td width='12%' valign='middle' align='center'><input type='text' class='textbox' size='10' name='eToolText" + String(i) + "' /> </td>";
		fHTML = fHTML + "<td width='14%' valign='middle' align='center'><input type='text' class='textbox' size='12' name='eLink" + String(i) + "' /> </td>";
		fHTML = fHTML + "<td width='15%' align='center' valign='middle'><input type='text' class='textbox' size='6' name='eColor" + String(i) + "' />&nbsp;<input type='button' value='...' style='width:20;' class='select' onClick=\"javascript:openColorPicker(document['guiFORM'].eColor" + String(i) + ");\"></td>";
		fHTML = fHTML + "</tr>";
	}
	fHTML = fHTML + "</table><BR>";
	//Update the DIV with the form information
	var dv = document.getElementById("entityFormDiv");
	dv.innerHTML = fHTML;
}
infosoftglobal.FusionMapsGUI.prototype.renderHTMLCode = function(){
	//This function renders the HTML code the map.
	var strHTML = "<html>\n";
	strHTML = strHTML + "\t<head>\n";
	strHTML = strHTML + "\t\t<title>FusionCharts v3 FusionMapss</title>\n";
	strHTML = strHTML + "\t\t<!-- Do not forget to include this JS file and update it's path -->\n";
	strHTML = strHTML + "\t\t<scri" + "pt type=\"text/javascript\" src=\"FusionMaps.js\"></scr" + "ipt>\n";
	strHTML = strHTML + "\t\t</title>\n";
	strHTML = strHTML + "\t</head>\n";
	strHTML = strHTML + "\t<body>\n";
	strHTML = strHTML + "\t\t<!-- Code Block for Map Starts here -->\n";
	strHTML = strHTML + "\t\t<div id='mapDiv'>\n";	
	strHTML = strHTML + "\t\t\tThe map will replace this text. If any users do not have Flash Player 8 (or above), they'll see this message.\n";	
  	strHTML = strHTML + "\t\t</div>\n";	
	strHTML = strHTML + "\t\t<scr" + "ipt type=\"text/javascript\">\n";
	strHTML = strHTML + "\t\t\tvar map = new FusionMaps(\"" + this.mapList[this.mapIndex].swf + "\", \"Map_Id\", " + this.mapList[this.mapIndex].width + ", " + this.mapList[this.mapIndex].height + ", \"0\", \"0\");\n";
	strHTML = strHTML + "\t\t\tmap.setDataURL(\"Data.xml\");\n"
	strHTML = strHTML + "\t\t\tmap.render(\"mapDiv\");\n";
	strHTML = strHTML + "\t\t</scr" + "ipt>\n";
	strHTML = strHTML + "\t\t<!-- Code Block for Map Ends here -->\n";
	strHTML = strHTML + "\t</body>\n";
	strHTML = strHTML + "</html>";
	//Update text field
	this.gForm.htmlCode.value = strHTML;
}
infosoftglobal.FusionMapsGUI.prototype.renderXMLCode = function(){
	//This method renders the XML codes for the various code blocks
	this.gForm.xmlDataFull.value = 	this.getFullXMLData();
	//Update Entity XML text area
	this.gForm.xmlEntityTemplate.value = this.getEntityXMLTemplate();
	//Markers XML	
	if (this.markers.length>0){
		//Markers (def & app) text-area
		var strXML = "";
		strXML = strXML + "<markers>\n";
		//Add marker definition tags
		strXML = strXML + "\t<definition>\n" + this.getMarkerDefXML(false) + "\t</definition>\n";
		//Add marker application tags
		strXML = strXML + "\t<application>\n" + this.getMarkerAppXML(false) + "\t</application>\n";
		//Close markers tag
		strXML = strXML + "</markers>\n";		
		this.gForm.xmlMarkerFull.value = strXML;
		//Markers definition XML only.
		var strXML = "";
		strXML = strXML + "<markers>\n";
		//Add marker definition tags
		strXML = strXML + "\t<definition>\n" + this.getMarkerDefXML(false) + "\t</definition>\n";
		//Close markers tag
		strXML = strXML + "</markers>\n";		
		this.gForm.xmlMarkerDef.value = strXML;
	}else{
		//Set empty strings
		this.gForm.xmlMarkerFull.value = "";
		this.gForm.xmlMarkerDef.value = "";
	}
}
infosoftglobal.FusionMapsGUI.prototype.addMarker = function(mX, mY, mId, mLabel, mLabelPos, mShow){
	//This function adds a marker to the map.
	//Encode all the strings to be XML safe
	mId = this.encodeStr(mId);
	mLabel = this.encodeStr(mLabel);
	//Push it to our markers store
	this.markers.push(mId);
	this.markerPos.push({x:mX, y:mY});
	//Now, update the UI with the new marker information.
	//Create a new row in marker table (at end)
	var markerRow = appendRowAtEnd("tblMarker");	
	//Now, create the cells within this and set their properties
	var idCell = markerRow.insertCell(0);
	idCell.width = "10%";
	idCell.valign = "top";
	idCell.bgColor="#f5f5f5";
	idCell.innerHTML = "<span class='text'>" + mId + "</span>";
	
	var labelCell = markerRow.insertCell(1);
	labelCell.width = "30%";
	labelCell.valign = "top";
	labelCell.innerHTML = "<input type='text' class='textbox' name='mLabel_" + mId + "' value='" + mLabel + "' size='25'>";
	
	var labelPosCell = markerRow.insertCell(2);
	labelPosCell.width = "15%";
	labelPosCell.valign = "top";
	labelPosCell.align = "center";
	labelPosCell.innerHTML = "<select name='mLabelPos_" + mId + "' class='select'><option value='top' " + this.isSelected("top",mLabelPos) + ">Top<option value='bottom'" + this.isSelected("bottom",mLabelPos) + ">Bottom<option value='center'" + this.isSelected("center",mLabelPos) + ">Center<option value='left'" + this.isSelected("left",mLabelPos) + ">Left<option value='right'" + this.isSelected("right",mLabelPos) + ">Right</select>";
	
	var showCell = markerRow.insertCell(3);
	showCell.width = "15%";
	showCell.valign = "top";
	showCell.align="center";
	showCell.innerHTML = "<input type='checkbox' name='mShow_" + mId + "' " + ((mShow)?"checked":"") + ">";
	
	var shapeCell = markerRow.insertCell(4);
	shapeCell.width = "15%";
	shapeCell.valign = "top";
	shapeCell.align = "center";
	shapeCell.innerHTML = "<select name='mShape_" + mId + "' class='select'><option value='circle'>Circle<option value='arc'>Arc<option value='triangle'>Triangle<option value='diamond'>Diamond</select>";
	
	var deleteCell = markerRow.insertCell(5);
	deleteCell.width = "10%";
	deleteCell.valign = "top";
	deleteCell.align = "center";
	deleteCell.innerHTML = "<input type='button' class='select' value='X' name='mDelete_" + mId + "' onClick='javaScript:deleteMarker(\"" + mId + "\");'>";	
}
infosoftglobal.FusionMapsGUI.prototype.deleteMarker = function(markerId){
	//Get the index of the maker from id
	var index = this.getMarkerIndexFromId(markerId);
	//Now splice the markers array to remove this
	this.markers.splice(index,1);
	this.markerPos.splice(index,1);
	//Also, delete the table row from UI
	deleteTableRow("tblMarker",index+1);
}
infosoftglobal.FusionMapsGUI.prototype.getMarkers = function(){
	//This method exposes the defined markers of the map, so that we can check for
	//duplicates.
	return this.markers;
}
infosoftglobal.FusionMapsGUI.prototype.getMarkerIndexFromId = function(mId){
	//This method searches for a marker ID in the array and returns its
	//numerical index.
	var index = -1;
	for (i=0; i<this.markers.length; i++){
		//Make a case in-sensitive check
		if (this.markers[i]==mId){
			index=i;
			break;
		}
	}		
	return index;
}
// ------------- The following functions build XML data -----------------//
infosoftglobal.FusionMapsGUI.prototype.getFullXMLData = function(){
	//This method returns the full XML data for the map.
	var strXML = "<map " + this.getMapElementAtts() + " >\n";
	//Add Data
	strXML = strXML + this.getDataAsXML();
	//Add the marker XML - definition & application (if required)
	if (this.markers.length>0){
		strXML = strXML + "\t<markers>\n";
		//Add marker definition tags
		strXML = strXML + "\t\t<definition>\n" + this.getMarkerDefXML(true) + "\t\t</definition>\n";
		//Add marker application tags
		strXML = strXML + "\t\t<application>\n" + this.getMarkerAppXML(true) + "\t\t</application>\n";
		//Close markers tag
		strXML = strXML + "\t</markers>\n";		
	}
	//Close <map>
	strXML = strXML + "</map>";
	//Return
	return strXML;
}
infosoftglobal.FusionMapsGUI.prototype.getMapElementAtts = function(){
	//This method returns the attributes of the <map> element
	var atts = "";
	//Append each of the map attributes
	atts = atts + this.buildAttString("animation","mAnimation",false,"1");
	atts = atts + this.buildAttString("showShadow","mShowShadow",false,"1");
	atts = atts + this.buildAttString("showBevel","mShowBevel",false,"1");
	atts = atts + this.buildAttString("showLegend","mShowLegend",false,"1");
	atts = atts + this.buildAttString("showLabels","mShowLabels",false,"1");
	atts = atts + this.buildAttString("showMarkerLabels","mShowMarkerLabels",false,"2");
	atts = atts + this.buildAttString("useSNameInToolTip","mUseSNameInToolTip",false,"0");
	
	atts = atts + this.buildAttString("includeNameInLabels","mIncludeNameInLabels",false,"1");
	atts = atts + this.buildAttString("includeValueInLabels","mIncludeValueInLabels",false,"0");

	atts = atts + this.buildAttString("fillColor","mFillColor",true,"");
	atts = atts + this.buildAttString("borderColor","mBorderColor",true,"");
	atts = atts + this.buildAttString("connectorColor","mConnectorColor",true,"");
	atts = atts + this.buildAttString("hoverColor","mHoverColor",true,"");
	atts = atts + this.buildAttString("canvasBorderColor","mCanvasBorderColor",true,"");
	atts = atts + this.buildAttString("baseFont","mBaseFont",true,"");
	atts = atts + this.buildAttString("baseFontSize","mBaseFontSize",true,"");
	atts = atts + this.buildAttString("baseFontColor","mBaseFontColor",true,"");
	atts = atts + this.buildAttString("markerBorderColor","mMarkerBorderColor",true,"");
	atts = atts + this.buildAttString("markerBgColor","mMarkerBgColor",true,"");
	atts = atts + this.buildAttString("markerRadius","mMarkerRadius",true,"");	
	atts = atts + this.buildAttString("legendPosition","mLegendPosition",false,"");	

	atts = atts + this.buildAttString("useHoverColor","mUseHoverColor",false,"2");		
	atts = atts + this.buildAttString("showToolTip","mShowToolTip",false,"1");	
	atts = atts + this.buildAttString("showMarkerToolTip","mShowMarkerToolTip",false,"2");
	atts = atts + this.buildAttString("formatNumberScale","mFormatNumberScale",false,"1");
	atts = atts + this.buildAttString("numberPrefix","mNumberPrefix",true,"");
	atts = atts + this.buildAttString("numberSuffix","mNumberSuffix",true,"");	
	//Return atts list
	return atts;
}
infosoftglobal.FusionMapsGUI.prototype.getDataAsXML = function(){
	//This method encodes the data of the map in XML format.
	var dataXML = "\t<data>\n";
	//We need to iterate through all the entities and look for values
	//in their form elements
	for (i=1; i<this.entities.length; i++){
		//Container for entity element
		var entityEl = "\t\t<entity id='" + this.entities[i].id + "' ";
		entityEl = entityEl + this.buildAttString("value","eValue"+i,false,"");
		entityEl = entityEl + this.buildAttString("displayValue","eDisplayValue"+i,true,"");
		entityEl = entityEl + this.buildAttString("toolText","eToolText"+i,true,"");
		entityEl = entityEl + this.buildAttString("link","eLink"+i,true,"");
		entityEl = entityEl + this.buildAttString("color","eColor"+i,true,"");
		//Close entity element
		entityEl = entityEl+ " />\n";
		//Add to entire XML
		dataXML = dataXML + entityEl;
	}	
	//Close data element
	dataXML = dataXML + "\t</data>\n";
	return dataXML;
}
infosoftglobal.FusionMapsGUI.prototype.getEntityXMLTemplate = function(){
	//getEntityXMLTemplate method returns the XML representation for all entities of map.	
	var i;
	var entityXML = "<data>\n";
	for (i=1; i<this.entities.length; i++){
		entityXML = entityXML + "\t<entity id='" + String(this.entities[i].id) + "' value='' />\n";
	}
	entityXML = entityXML + "</data>";
	//Return XML Data
	return entityXML;
}
/**
 *  @param	threeTabs	Whether to use three tabs for formatting
*/
infosoftglobal.FusionMapsGUI.prototype.getMarkerDefXML = function(threeTabs){
	//This method returns the marker definition XML
	var defXML = "";
	var i;
	var id;
	for (i=0; i<this.markers.length; i++){
		id = this.markers[i];
		var markerXML = ((threeTabs==true)?"\t\t\t":"\t\t") + "<marker id='" + id + "' x='" + this.markerPos[i].x + "' y='" + this.markerPos[i].y + "' ";
		markerXML = markerXML + this.buildAttString("label","mLabel_"+id,true,"");
		markerXML = markerXML + this.buildAttString("labelPos","mLabelPos_"+id,false,"top");
		markerXML = markerXML + " />\n";
		//Add to entire XML
		defXML = defXML + markerXML;
	}
	return defXML;
}
/**
 *  @param	threeTabs	Whether to use three tabs for formatting
*/
infosoftglobal.FusionMapsGUI.prototype.getMarkerAppXML = function(threeTabs){
	//This method returns the marker application XML
	var appXML = "";
	var i;
	var id;
	var show;
	for (i=0; i<this.markers.length; i++){
		id = this.markers[i];
		//Whether we've to show this data on the map.
		show = this.getValue("mShow_"+id,false);
		if (show=="1"){
			var markerXML = ((threeTabs==true)?"\t\t\t":"\t\t") + "<marker id='" + id + "' ";
			markerXML = markerXML + this.buildAttString("shapeId","mShape_"+id,false,"");
			markerXML = markerXML + " />\n";
			//Add to entire XML
			appXML = appXML + markerXML;
		}
	}
	return appXML;
}

infosoftglobal.FusionMapsGUI.prototype.buildAttString = function(attName, elementName, encodeSafe, defaultValue){
	//This method builds the attribute string representation
	var attString = "";
	//Get the value of the element
	var val = this.getValue(elementName, encodeSafe);
	//Now, if the val is different from default value, only then we create the string
	//Else, it makes no sense to add an attribute which still bears its default value
	if (val!=defaultValue){
		attString = attName + "='" + val + "' ";
	}
	//Return
	return attString;
}
// ------------ Generic functions to do various things ----------------- //
infosoftglobal.FusionMapsGUI.prototype.getValue = function(elementName, encodeSafe){
	//This method returns the value of a form element and converts into safe encoding
	//Get reference to the element
	var el = this.gForm[elementName];
	var rtnVal;
	//Based on the type of form element, we send the value back
	switch (el.type){
		case "text":
			rtnVal = el.value;
			break;
		case "textarea":
			rtnVal = el.value;
			break;
		case "select-one":
			rtnVal = el.value;						
			break;
		case "checkbox":
			rtnVal = (el.checked)?"1":"0";
			//No need for encode safe in checkbox
			encodeSafe=false;
			break;
		default:
			rtnVal = "";
			encodeSafe=false;
			break;
	}
	//If we've to encode-safe
	if (encodeSafe==true){
		rtnVal = this.encodeStr(rtnVal);
	}
	return rtnVal;
}
infosoftglobal.FusionMapsGUI.prototype.encodeStr = function(str){
	//This method takes in a string as parameter and encodes the special
	//characters for safe conversion and placement in XML.
	//Replace %
	//str = str.replace(/%/g,"%25");
	//Replace quotation mark	
	str = str.replace(/'/g,"&apos;");
	//Replace ampersand
	//str = str.replace(/&/g,"%26");	
	//Replace Euro sign
	//str = str.replace(/€/g,"%E2%82%AC");
	//Replace pound sign
	//str = str.replace(/£/g,"%A3");
	//Replace < 
	str = str.replace(/</g,"&lt;");
	//Replace >
	str = str.replace(/>/g,"&gt;");
	//Return
	return str;
}
infosoftglobal.FusionMapsGUI.prototype.isSelected = function(selectString, matchString){
	//This method is used to render "selected" option for checkboxes
	if (selectString==matchString){
		return " selected ";
	}else{
		return "";
	}
}
infosoftglobal.FusionMapsGUI.prototype.reInit = function(){
	//This method re-initializes the properties associated with a map.
	//To be called when a new map is loaded.
	this.mapIndex = -1;
	this.chooseMode = false;
	this.entities = new Array();	
	this.markers = new Array();
	this.markerPos = new Array();
}
/* Aliases for easy usage */
var FusionMapsGUI = infosoftglobal.FusionMapsGUI;