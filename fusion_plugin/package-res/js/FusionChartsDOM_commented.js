/* 
 *    @author: Shamasis Bhattacharya
 *    @description: FusionCharts DOM Manipulation script
 *    
 *    @publish: 2008-Oct-24
 *    @version: 1.0.0
 */

/*
 *  ChangeLog:
 *  ==========
 *  
 *  1.0.0 - 24/10/2008:
 *  First release.
 *    
 */

/* Check whether FusionCharts main object is already declared or not.
 * 
 * Debug Info: In case you get an error, make sure -
 * 1. FusionCharts_DOM.js (this file) is included AFTER the main FusionCharts.js
 *    file is included.
 * 2. If the parent script has any modifications or errors, the main object may
 *    be defined
 */
if(typeof infosoftglobal == 'undefined' ||
    typeof infosoftglobal.FusionCharts == 'undefined')
{
    // this string is in variable so that repeatations are not caused
    var ErrorMsg = "FusionChart Object was not found. Verify script inclusions.";
    alert(ErrorMsg); throw ErrorMsg;
}



// ============================================================================
// == Global Objects ==========================================================
// ============================================================================

// Create FusionDOM class and map an easy to use variable to this as this is too
// long of a name to be used as a workset
infosoftglobal.FusionChartsDOM = {};
var FusionChartsDOM = infosoftglobal.FusionChartsDOM; // henceforth FD becomes the ref object


var _FCD = infosoftglobal.FusionChartsDOM; // internal coding variable
/*
 * Store and retrieve settings that are used by the FusionCharts DOM object
 * User can modify this section for their use.
 */
_FCD.Settings =
{
    // errors can be enabled/suppressed if required
    alertonerrors: false,
    
    // the attributes supported in chart <tag> with their default values in
    // specific order of passing on to the fusioncharts wrapper
    // DEV NOTE: ANY NEW PROPERTY HERE, MUST BE REPLICATED IN "probeAttributes" method twice
    parameters : {
        chartid: '', // programmatically generated ()no-value needed)
        charttype: 'Column2D',
        width: '400',
        height: '300',
        debugmode: '0', 
        registerwithjs: '0',
        backgroundcolor: '',
        scalemode: 'noScale', 
        language: '', 
        detectflashversion: '',
        autoinstallredirect: '', 
        chartversion: 'v3', // free or v3
        swfpath: 'FusionCharts/',
        dataurl: '',
        swfuri: '' // final swf path thats generated (no-value required)
    },
    
    // enable FD to attach itself to window.onload to render all graphs on load
    renderonload: false,

    // the message displayed before the charts are rendered
    loadingmessage: 'Loading Chart...',
        
    // class applied to every container dom division created
    containerclassname: 'fusioncharts_dom_container',
	
	// when set to false, if no chartId is specified, the object will raise error
	autochartid: true

};

/* String resources; Separated from JS for language localization and js
 * compression. 
 *  DO NOT MANUALLY PUT IN ANY PROPERTY IN HERE. THE BODY DEFINITION OF THIS
 *  OBJECT IS AT DOCUMENT END
 */
_FCD.Resources = { };
var _FCDR = _FCD.Resources; // internal coding variable
/*
 * Common runtime/library snippet functions that will be repeatedly and extensively
 * used in this script. All cross-browser functions should be implemented here,
 * so that debugging is faster.
 *  DO NOT MANUALLY PUT ANY PROPERTY IN HERE. THE BODY DEFINITION OF THIS
 *  OBJECT IS AT DOCUMENT END
 */
_FCD.Library = { };
var _FCDL = _FCD.Library;

// ============================================================================
// == Public Functions and Variables ==========================================
// ============================================================================
// Users are recommended NOT to perform any editing beyond this point.


/* Array that holds global Node objects
 * It should cointain the properties: (as per release 0.1)
 * id, parameters, chartObject, swfObject, container, renderState, sourceNode
 */
_FCD.Nodes = Array();

/*
 *  The initialization function that is called upon page load
 *  Client-constructor
 */
_FCD.Constructor = function()
{
    // Parse all the default settings passed via the script tag
    _FCD.parseSettings();
    
    // The work of this constructor is very simple:
    // It calls the parseDOM method that parses all the <tags> and adds them
    // to the _FCD.Nodes array.
    _FCD.parseDOM();
    
    // In case "renderOnLoad" is enabled in settings, then call the RenderCharts
    // method with forcedUpdate marked as true
    if(_FCD.Settings.renderonload) _FCD.RenderAllCharts(true);
};

/*
 * this property is updated upon chart population. This helps to get the index of
 * a node from its char id
 * @param: key integer
 */
_FCD.indexOf = function(key)
{
	return _FCD._indexOf[key];
};

/*
 * Renders charts within the <graph> tag that are in the FCD.Nodes array
 * @param: forceRender boolean "force already rendered charts to re-render"
 */
_FCD.RenderAllCharts = function(forceRender)
{
    for(i=0; i<_FCD.Nodes.length; i++)
    {	
        // check whether the link is marked as already rendered
        // if not, then only proceed
        if( (_FCD.Nodes[i].renderState == true)
            && !forceRender ) continue;
        _FCD.RenderChart(i); // call the updater function to replace proper html
		
    }
};

/*
 * Update the HTML / re-render the chart-item specified by the arrayIndex
 * It simply replaces the innerHTML of the container with the html returned by
 * the chartObject
 */
_FCD.RenderChart = function(arrayIndex)
{
//alert(arrayIndex);
//alert(_FCD.Nodes[arrayIndex].id);
	//alert(_FCD.Nodes[arrayIndex].chartObject.getSWFHTML());
	
    _FCD.Nodes[arrayIndex].container.style.display = ''; // unhide
    _FCD.Nodes[arrayIndex].container.innerHTML = 
        _FCD.Nodes[arrayIndex].chartObject.getSWFHTML();
		
	// call fusionchartsutil to get access to chart object
	_FCD.Nodes[arrayIndex].swfObject =
		infosoftglobal.FusionChartsUtil.getChartObject(_FCD.Nodes[arrayIndex].id);

    _FCD.Nodes[arrayIndex].renderState = true; // mark rendered
};


// ============================================================================
// == Private Functions and Variables =========================================
// ============================================================================
// Users are NOT to perform any editing at this point.

/*
 * This is an internal private propert, that holds a list of index w.r.t chartId
 */
_FCD._indexOf = {};

/*
 * This function parses the DOM tree and correspindingly populates the
 * _FCD.Nodes array.
 * During the process, it does the required modifications w.r.t. IE.
 * It converts the custom tags into xmlIslands and adds all these data to
 * the Nodes array.
 */
_FCD.parseDOM = function()
{
    // deletes the charts from objects completely.
    // this is risky in case the creations fail
    _FCD.Nodes  = Array();
    
    // get all <tags> and calls the 'process' to perform modifications
    var tagItems = _FCDL.tags( _FCDR.fcTag );
    var i; // initialize counter (separate init so that this var can be reused)
    var newNode;


    for(i=0; i<tagItems.length; i++)
    {
		newNode = _FCD.processTag(tagItems[i],i);
        _FCD.Nodes.push( newNode );
		_FCD._indexOf[newNode.id] = i;
		//alert("node id: "+newNode.id);
		//alert("node id: "+_FCD.Nodes[i].id);	
    }
    
	/**for(i=0; i<tagItems.length; i++)
    {
		alert("node id: "+_FCD.Nodes[i].id);
	}**/
    // perform process on source nodes and set corresponding dataxml
    var sourceNodes = _FCD.processSourceNodes();
    
    for(i=0; i<sourceNodes.length; i++)
    {	
        _FCD.Nodes[i].sourceNode = sourceNodes[i];
        if(_FCD.Nodes[i].parameters.dataurl)
        {
            _FCD.Nodes[i].chartObject.setDataURL(
                _FCD.Nodes[i].parameters.dataurl);
        }
        else
        {
            var xmlString = _FCD.loadEmbeddedData(
                _FCD.Nodes[i].sourceNode );
            if(!xmlString) 
            {
                _FCD.notify(_FCDR.errorNoValidData);
                // no need to throw error here. just notify
            }
            _FCD.Nodes[i].chartObject.setDataXML(xmlString);
        }

        // DEVNOTE: IN CASE OF Internet Explorer the container links are lost upon
        // processing of source nodes. hence they are updated.
        if(_FCDL.isIE)
        {
            _FCD.Nodes[i].container = 
            _FCDL.get(_FCD.Nodes[i].id
                +'_'+_FCDR.containerTagName);
        }
    }
};


/*
 * This function processes each custom chart tag and creates a FD Node out of it.
 * @param: tagObj object "HTML node received from getElementsBtTagName"
 * @return property
 */
_FCD.processTag = function(tagObj, idx)
{
    // create the list of attributes. the probeAttributes method returns
    // all the specified attributes or the default value
    var newAttributes = _FCD.probeAttributes(tagObj); // read all required attributes

    // create a unique chart id in case id is not specified
    if(!newAttributes.chartid)
	{
		if(_FCD.Settings.autochartid)
			newAttributes.chartid = _FCDR.idPrefix + _FCDL.uniqueId() + ('_'+idx);
		else // in case autochartid is off, throw an error
		{
			_FCD.notify(_FCDR.errorNoChartId);
			throw _FCDR.errorNoChartId;
		}
	}

    // compute full swf uri
    newAttributes.swfuri = (newAttributes.chartversion.toLowerCase() == 'free') ? 
        newAttributes.swfpath + 'FCF_'+ newAttributes.charttype + '.swf' :
        newAttributes.swfpath + newAttributes.charttype + '.swf';
	
    // create a division and append it to the required place
    var newDiv = _FCDL.getNew(_FCDR.containerTagName,
        'id='+newAttributes.chartid+'_'+_FCDR.containerTagName,
        'style=display:none', // hidden (to avoid layout errors before load)
        'class='+_FCD.Settings.containerclassname);

    newDiv.innerHTML = _FCD.Settings.loadingmessage;
    tagObj.parentNode.insertBefore(newDiv, tagObj); // append to DOM

    // create the chart object from the FCJS wrapper
    var newChart = _FCD.createChart(newAttributes);
    
	// get all chartparams and add to newchart
	var chartParams = _FCD.probeParameters(tagObj);
	for(var aParam in chartParams)
	{
		newChart.addParam(aParam, chartParams[aParam]);
		// also add that param to attributes list for easy access
		newAttributes[aParam] = chartParams[aParam];
	}

	// get all chartvariables and add to newchart
	var chartVars = _FCD.probeVariables(tagObj);
	for(var aVar in chartVars)
	{
		newChart.addVariable(aVar, chartVars[aVar]);
		// also add that vars to attributes list for easy access
		newAttributes[aVar] = chartVars[aVar];
	}
    return {id: newAttributes.chartid, parameters: newAttributes,
        chartObject: newChart, swfObject: null, container: newDiv,
        renderState: false,  sourceNode: null };
};

/*
 * This function reads the arguments from DOM node and creates a chart
 * @param: attributeList property "list of attributes for the new chart"
 * @return: FusionChart
 */
_FCD.createChart = function(attributeList)
{

    // put it in try block to trap externel errors from fcjs wrapper
    try
    {
        // create a chart from node attributeListute values that we just excavated                
        return new FusionCharts(attributeList.swfuri, attributeList.chartid, 
            attributeList.width, attributeList.height,
            attributeList.debugmode, attributeList.registerwithjs, 
            attributeList.backgroundcolor, attributeList.scalemode, attributeList.language, 
            attributeList.detectflashversion, attributeList.autoinstallredirect );
            
    }
    catch (er)
    {
        _FCD.notify(_FCDR.errorUnexpected + er.toString());
        throw _FCDR.errorUnexpected + er.toString();
    }
};

/*
 * This function returns an array of sourceNodes from <tags> after doing browser-specific
 * conversions. In case if IE, it converts to xmlIslands
 * @return: object "In case any browser specific modifications are rewuired it
 *                  sends the modified node(xmlIsland) else nodeList"
 */
_FCD.processSourceNodes = function()
{

    // proceed only if IE (for nonIE, just replace this function with an easier one)
    if(!_FCDL.isIE)
    {
        _FCD.processSourceNodes = function()
        {
            // self-redefinition helps to reduce browser load!
            return _FCDL.tags( _FCDR.fcTag );
        };
        return _FCD.processSourceNodes();
    }
    
    // create xml islands (thanks to sudipto for his help!)
    // DEVNOTE: IN CASE OF Internet Explorer the container links are lost upon
    // processing of source nodes. hence they are updated.
    document.body.innerHTML = document.body.innerHTML.replace(
        new RegExp('<'+_FCDR.fcTag, 'gi'),
        '<xml bind="'+_FCDR.fcTag+'"><'+_FCDR.fcTag);
    document.body.innerHTML = document.body.innerHTML.replace(
        new RegExp('</'+_FCDR.fcTag+'>', 'gi'),
        '</'+_FCDR.fcTag+'></xml>'); 

    var returnObj = Array();
    var xmlIslands = _FCDL.tags('xml');
    for(var c=0; c<xmlIslands.length; c++)
    {
        // just make sure that you are not adding any other xml islands! (verify the bind attribute)
        if(_FCDL.getAttribute(xmlIslands[c], 'bind')
            == _FCDR.fcTag)
        {
            returnObj.push(xmlIslands[c].childNodes[0]);
        }
    }
    return returnObj;
};


/*
 * This function fetches chart data when embedded as CDATA
 * @param: sourceNode object "The node from where to load data"
 */
_FCD.loadEmbeddedData = function(sourceNode)
{
    try {
        return ( (_FCDL.isIE) ? sourceNode.childNodes[0].childNodes[0].xml :
            _FCDL.tags('data', sourceNode)[0].innerHTML).replace(
            '<!--[CDATA[','').replace(']]-->','');
    }
    catch (e)
    {
        return '';
    }
};

/*
 * Looks for the required list of attributes in the DOM object and when not
 * found, returns a default value
 * @param: obj object "Node whose attributes needs be probed"
 * @return object
 */
_FCD.probeAttributes = function(obj)
{
    var returnObj = {};
    for(var aSetting in _FCD.Settings.parameters)
    {
        returnObj[aSetting] =
            _FCDL.getAttribute(obj, aSetting) ||
            _FCD.Settings.parameters[aSetting];
    }
    return returnObj;
};

/*
 * Looks for the required list of swf variables in the DOM object.
 * @param: obj object "Node whose attributes needs be probed"
 * @return object
 */
_FCD.probeVariables = function(obj)
{
    var returnObj = {};
	var tmpVar1 = _FCDR.chartVariables;
	var tmpVar2;
    for(var c=0; c<tmpVar1.length; c++)
    {
		tmpVar2 = _FCDL.getAttribute(obj, tmpVar1[c].toLowerCase());
        if(tmpVar2 != null) returnObj[tmpVar1[c]] = tmpVar2;
    }

    return returnObj;
};

/*
 * Looks for the required list of parameters for chart and also makes sure
 * that values from parameters and reservedAttributes are not added
 * @param: obj object "Node whose attributes needs be probed"
 * @return array "new object parameters"
 */
_FCD.probeParameters = function(obj)
{
	// it is a three stage process.
	// iterate through attributes, exclude constructor attributes, exclude
	// reserved keywords and then add the remaining to array
    var returnObj = {};
	var c; // counter
	// DEVNOTE: Our great IE returns dead parameters, so create an array of
	// valid parameters
	for(c=0; c < obj.attributes.length; c++)
	{
		// do not parse invalid attributes
		if(!obj.attributes[c].specified) continue;
		// append valid values to proplist
		returnObj[obj.attributes[c].nodeName.toLowerCase()] = obj.attributes[c].nodeValue;
	}

	// FF is case-insenstitive for xhtml (which is w3c correct), so indivdually parse
	// reserved array and parameters
	var anItem;
	for(anItem in _FCD.Settings.parameters)
	{
		anItem = anItem.toLowerCase();
		if(typeof returnObj[anItem] == 'undefined') continue;
		delete returnObj[anItem];
	}

	// remove reserved attributes
	var tmpVar1 = _FCDR.reservedAttributes;
	for(c=0; c<tmpVar1.length; c++)
	{
		if(typeof returnObj[tmpVar1[c]] == 'undefined') continue;
		delete returnObj[tmpVar1[c]];
	}
	
	// remove chartquerystrings
	tmpVar1 = _FCDR.chartVariables;
	for(c=0; c<tmpVar1.length; c++)
	{
		if(typeof returnObj[tmpVar1[c]] == 'undefined') continue;
		delete returnObj[tmpVar1[c]];
	}
	return returnObj;
};

/*
 * This method parses the settings provided at the fcSettings 
 */
_FCD.parseSettings = function()
{
    // locate all scripts and then find out which is the FCD script
    var scriptTags = _FCDL.tags('script');
    var thisScript; 
    for(var i=0; i<scriptTags.length; i++)
    {
        if(scriptTags[i].src.length - (_FCDR.jsFileName).length
            - scriptTags[i].src.toLowerCase().indexOf(_FCDR.jsFileName) == 0)
        {
            thisScript = scriptTags[i];
            break; // when script is found, skip searching
        }
    }
    
    // in case parsing failed, simply exit
    if(!thisScript) return;
    
    // convert the user settings into properties and sync each of them
    // the process is simple: eval the attributes from json to js properties
    // and then sync matching items with existing properties
    try
    {
        var tempParseResult; // store parsed properties here
        eval('tempParseResult = {' 
            + (thisScript.getAttribute(_FCDR.userSettingsTagPrefix
            + 'settings') || '') + ' };');
        _FCD.Settings =
            _FCD.syncProperties(_FCD.Settings, tempParseResult);
        
        eval('tempParseResult = { '
            + (thisScript.getAttribute(_FCDR.userSettingsTagPrefix
            + 'parameters') || '') +' };');
		
        _FCD.Settings.parameters =
            _FCD.syncProperties(_FCD.Settings.parameters, tempParseResult);
        
        tempParseResult = null; // clean memory
    }
    catch (e)
    {
        _FCD.notify(_FCDR.errorParseSettings + 
            "\nDebug Info: " +e);
    }
};

/*
 * This method synchronises properties from source to target
 * @param: target property "the property whose data is to be updated"
 * @param: source property "the property from which to take data"
 * @return: property "updated target property"
 */
_FCD.syncProperties = function(target, source)
{
    for(var aSetting in source)
	{
        if(typeof target[aSetting.toLowerCase()] != 'undefined')
            target[aSetting.toLowerCase()] = source[aSetting];
	}
    return target;
};

/*
 * This function calls "alert" only if it is enabled in settings
 * @param: msg string "Alert message"
 */
_FCD.notify = function(msg)
{
    if(_FCD.Settings.alertonerrors) alert(msg);
};


// ============================================================================
// == Library and Resources ===================================================
// ============================================================================

/* String resources; Separated from JS for language localization and js
 * compression.
 */
_FCDR =
{
    // tagName for <tag> support
    fcTag : 'fusioncharts',
    
    // message to show in case of unexpected error
    errorUnexpected: 'FusionCharts Error: An unexpected error had occured '+
        'while creating chart. Kindly report this with full source code.' +
        "\nDebug Information: ",
    
    // error message when no valid datasource is found
    errorNoValidData: 'FusionCharts Error: Could not parse a valid data source.',
    
    // error raised when settings could not be parsed due to user error
    errorParseSettings: 'FusionCharts Error: Could not parse script settings.',
	
	errorNoChartId: 'FusionCharts Parameter Error: Absence of ChartId invalidates '
		+'"autoChartId=true" settings.',
    
    // the element type in which new charts will be rendered
    containerTagName: 'span',
    
    // prefix for every new chartid (in acse auto id is enabled)
    idPrefix: 'fusioncharts_',
    
    // file name of this script
    jsFileName: 'fusionchartsdom.js',
    
    // the prefix to be used in settings and other attributes 
    userSettingsTagPrefix: '',
	
	// these attributes will not be parsed and added to the swfobjects addparam
	// method (regexp)
	reservedAttributes: Array('style', 'class', 'id', 'name', 'title', 'on.+', 'value', 'src',
							   'runat', 'spry:.+'),
	// other values: 'href', 'rel', 'dir', 'lang', 'align' , 'font', 'color', 'border', 'type',
	// 'size', 'alt', 'valign'
	
	chartVariables: Array('XMLLoadingText', 'ParsingDataText', 'ChartNoDataText', 'RenderingChartText', 'LoadDataErrorText', 'InvalidXMLText')
};


/*
 * Common runtime/library snippet functions that will be repeatedly and extensively
 * used in this script. All cross-browser functions should be implemented hers,
 * so that debugging is faster.
 */
_FCDL =
{
    d: document,
    w: window,
    isIE: navigator.appName == "Microsoft Internet Explorer",
    isFF: document.getElementById && !document.all,
    
    // attach an event to the window
    attachEvent: function(obj, eventName, func)
    {
        return (_FCDL.isIE) ? obj.attachEvent('on'+eventName, func) :
            obj.addEventListener(eventName, func, false);
    },
    
    get: function(id, obj)
    {
        return (obj || _FCDL.d).getElementById(id);
    },
	
    // implement getElementsByTagName
    tags: function(nm, obj)
    {
        return (obj || _FCDL.d).getElementsByTagName(nm);
    },
    
    // put getAttribute here as its not browser safe
    getAttribute: function(obj, attr)
    {
        return obj.getAttribute(attr);
    },
    
    // put setAttribute here as its not browser safe
    setAttribute: function(obj, attr, val)
    {
        return obj.setAttribute(attr, val);
    },
    
    // returns an unique id
    uniqueId: function()
    {
        return (new Date().valueOf()).toString();
    },
    
    // get new dom node
    getNew: function(tag)
    {
	el = _FCDL.d.createElement(tag);
	for(c=1; c<arguments.length; c++)
	{
            arg = arguments[c].split('=');
            el.setAttribute(arg[0], arg[1]);
	}
	return el;
    }
    
};

// fire the init() function upon page load
_FCDL.attachEvent( _FCDL.w, 'load',
    _FCD.Constructor);