import L from 'https://sabbakilam.github.io/modules/Lmodule.js';
//import L from './Lmodule.js';
import s from './STYLES.js';

let m = {};
const v = {};

const c = {
		initialize(eventObject){
		
		window.id = `window`;
		document.id = `document`;

		L.attachAllElementsById(v);
		v.loginBox.focus();
		
		c.initializeModel(eventObject);
			
		c.recordCircleLocations();

		v.logger.css(s.loggerHiddenStyle);
		c.fillTestSelector();
	  
		c.showInfo();
		
		L.noPinchZoom();
		
		////////////////////////////////////
		const eventTypes = [
			//`wheel`,    // see separate wheel event wiring below that prevents a warning
			//`click`,    // we have our own boolean click test (m.clicked)
			//`dblclick`, // we have our own boolean double click test (m.dblPressed)
			`unload`,
			`beforeunload`,
			`change`,
			`input`,
			`keydown`,  
			`keyup`,	 //maybe the preferred key event, with e.code ( a decimal number ) AND e.key ( a string)
			`keypress`, 
			`load`,
			`mousedown`,
			`mousemove`,
			`mouseout`,
			`mouseover`,
			`mouseup`,
			`offline`,
			`online`,
			`orientationchange`,
			`resize`,
			`touchend`,
			`touchmove`,
			`touchstart`,
			
			////| drag and drop event types |//////
			`drag`,	
			`dragend`,
			`dragenter`,
			`dragexit`,
			`dragleave`,
			`dragover`,
			`dragstart`,			
			`drop`,
			
			////| music player event types: |/////
			'playing',
			'play',
			'pause',
			'volumechange',
			'timeupdate',
			'durationchange',
			'ended', //etc.      
		];
		
		//Have the window object listen for every event type listed in the eventTypes array
		//and handle them with the same "handler supervisior", namely: c.qualifyHandlers
		eventTypes.forEach( eventType => window.addEventListener(eventType, c.update, true));
		
		window.addEventListener(`wheel`, c.update, {passive: true} ); //prevents a warning		
	},

	updateModelAndView(handlerQualifiers){
	  L.runQualifiedHandlers(handlerQualifiers, m, v, c);
	  
	},////////////////| END of initialize |///////////////////
	
	/////////////////////////////////////////////////////////
	///////////////////| Initialize MODEL |//////////////////
	/////////////////////////////////////////////////////////	
	/////////////////////////////////////////////////////////
  
	initializeModel(eventObject){
	//////////////////////////////////////////////////////////////////////
	///////| define data (state variables) particular to this app: |/////
	//////////////////////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////
		
	m.chatInvitationsArray = [];
	m.loggedIn = false;
	m.loginStatus = `deny`;
	m.whoIsLoggedIn = `foobar`;
	m.loginNames = [`Arlene`, `Jose`, `Linda`, `Abbas`];
	
	m.DELAY_VEIL = 500;
	m.DELAY_SLIDE = m.DELAY_VEIL / 2 ;
	m.selectedCameo =  v.cameo1; //null; //the one moving, or dropping, etc.
	m.veilShowing = false;
	m.inSliding = false;
	m.fingerDropTarget = null;
	m.cameoOrigin = null;
	m.cameoSize = null;
	
	///////////////////////////////
	m.circleLocations = {
		  testTarget1: [0,0],
		  testTarget2: [0,0],
		  testTarget3: [0,0],
		  testTarget4: [0,0],
		  testTarget5: [0,0],
		  testTarget6: [0,0],
		  testTarget7: [0,0],
		  testTarget8: [0,0],
		  testTarget9: [0,0],
		  testTarget10: [0,0],
		  testTarget11: [0,0],
		  testTarget12: [0,0],
		  testTarget13: [0,0],
		  testTarget14: [0,0],
		  testTarget15: [0,0],
		  testTarget16: [0,0],
		  testTarget17: [0,0],
		  testTarget18: [0,0],
		  testTarget19: [0,0],
		  testTarget20: [0,0],		  
	};
	
	/////////////////////////////
	m.standardFamilyInfo = {
		cameo1: {
			holderName: "testTarget1",
			pictureURL: "images/lucyliu.jpg",
			lastname: "Liu",
			firstname: "Lucy",
			phone: "610-555-1212",
			email: "xyz@xyz.com",
			chatInvitation: false,
			online: false,
		},
		cameo2: {
			holderName: "testTarget2",
			pictureURL: "images/AbbasHat.png",
			lastname: "Abdulmalik",
			firstname: "Abbas",
			phone: "610-357-2710",
			email: "abbas229@gmail.com",
			chatInvitation: false,
			online: false,			
		},
		cameo3: {
			holderName: "testTarget3",
			pictureURL: "images/arlene.jpg",
			lastname: "Ramos",
			firstname: "Arlene",
			phone: "804-690-8184",
			email: "xyz@xyz.com",
			chatInvitation: false,
			online: false,			
		},
		cameo4: {
			holderName: "testTarget4",
			pictureURL: "images/charlize.jpg",
			lastname: "Theron",
			firstname: "Charlize",
			phone: "610-555-1212",
			email: "xyz@xyz.com",
			chatInvitation: false,
			online: false,			
		},
		cameo5: {
			holderName: "testTarget5",
			pictureURL: "images/girl.jpg",
			lastname: "Melendez",
			firstname: "Linda",
			phone: "484-832-6938",
			email: "LindaMel76@comcast.net",
			chatInvitation: false,
			online: false,			
		},
		cameo6: {
			holderName: "testTarget6",
			pictureURL: "images/liam.jpg",
			lastname: "Neeson",
			firstname: "Liam",
			phone: "610-555-1212",
			email: "xyz@xyz.com",
			chatInvitation: false,
			online: false,			
		},
		cameo7: {
			holderName: "testTarget7",
			pictureURL: "images/JackieChan.jpg",
			lastname: "Chan",
			firstname: "Jackie",
			phone: "215-555-1212",
			email: "xyz@xyz.com",
			chatInvitation: false,
			online: false,			
		},	
		cameo10: {
			holderName: "testTarget10",
			pictureURL: "images/jose.jpg",
			lastname: "Ramos",
			firstname: "Jose",
			phone: "650-520-4678",
			email: "Jose.Ramos@kin-.com",
			chatInvitation: false,
			online: false,			
		},		
	};
	
	////////////////////////
	m.loginNameToCameo = {
		Lucy:		"cameo1",
		Abbas:		"cameo2",
		Arlene: 	"cameo3",
		Charlize:	"cameo4",
		Linda:		"cameo5",
		Liam:		"cameo6",
		Jackie: 	"cameo7",
		Jose:		"cameo10",
	};
	
	////////////////////////
	m.circleSize = 8;	
	m.circleColor = `rgb(19, 210, 142)`;
	m.cameoSmall = 10.5;
	m.cameoLarge = 18;//14 works well
	
	m.popupTimer = 0;
	m.testBank = ["console.clear()", "Object.keys(v).sort().forEach(key => console.log(key))"];
	m.showVeil = false;
	m.moveCount = 0;
	m.inDblPress = false;
	m.dblPressDelay = 50;
	
	m.dragSource = {};
	m.dragParent = {};    
	
	m.timeOfModelSave = 0;
	m.timeBetweenModelSaves = 0;
	m.modelSaveDelay = 10000; //10 seconds between saving model	

	//////////////////////////////////////////////////
	///////////| define all meta events  |////////////
	//////////////////////////////////////////////////
	  /*
	      Should first get MODEL.json from website.
	      If it is not empty, retain it as the current state repo,
	      and exit this method:
	  */	
	  ////////////////////////
	  /*
	  const modelResponse = await window.fetch(`model.json`);
	  const MODEL = await modelResponse.json();
	  //const modelJson = await modelResponse.text(); // could do this in one step with .json() method
	  //const MODEL = JSON.parse(modelJson);
	  if(Object.keys(MODEL).length > 5){//5 properties is rather arbitrary: m.id, m.type, m .source, etc.
	    m = MODEL
	    m.firstTime = true;
	    m.stillPressed = false;
	    m.eventTime = Date.now();
	    m.timeBetweenEvents = 0;   
	    m.historyTimeBetweenEvents = [0,0,0,0,0];
	    m.inDblPress = false;
		
		//JSON-ized entities cannot include functions, so includedInClass is re-established here: 
		
		m.source.includedInClass = (className) => {
			return !! Array.from( document.querySelectorAll(`.${className}`) ).includes(eventObject.target)
		}
	    return; //because we will use this most recent state data (rather than start fresh)
	  }else {
		  console.log(`No valid model could be retrieved upon loading`)
	  } 
	  */
	  ////////////////////////

	  m.firstTime = true;
	  m.historyTimeBetweenEvents = [0,0,0,0,0];  
	  m.stillPressed = false; 
	  m.eventTime = Date.now();
	  m.timeBetweenEvents = 0;
	
	  m.eventObject = eventObject;		//the event object itself
	
	  m.e = eventObject;              //a convenient shorthand for eventObject
	  m.source = eventObject.target;	//where the event took place	  
	  
	  m.source.includedInClass = (className) => {
	    return !! Array.from( document.querySelectorAll(`.${className}`) ).includes(eventObject.target);
	  };	  
	  
	  m.type = eventObject.type;      //what the event was
	  m.id = eventObject.target.id;   //the id of the element where the event occurred
	  
	  m.historyReleased = [false, false, false, false, false];	
	  
	  //Shortcuts to combine similar mobile and computer events
	  m.pressed = m.type === `mousedown` || m.type === `touchstart`;
	  if(m.pressed){
	    m.stillPressed = true;
		m.timePressed = Date.now();
	  }
	  
	  m.released = m.type === `mouseup` || m.type === `touchend`;
	  if(m.released){
	    m.stillPressed = false; 			
	    //save current and prior three metaEvents of m.released, four deep (or as deep as you like):
	    m.historyReleased.unshift(m.released);
	    m.historyReleased.pop();    
	  }
	  
	  m.moved = m.type === `mousemove` || m.type === `touchmove`;
	  
	  m.sliding = m.moved && m.stillPressed;
	  
	  m.resized = m.type === `resize` ||
	        m.type === `orientationchange` ||
	        m.type === `load` ||
	        m.type === `DOMContentLoaded`;
	        
	  //save current and three prior eventObjects, four deep (or as deep as you like)
	  m.historyEventObject = [
	  	{type: "none", target: {id: "none"}},
	  	{type: "none", target: {id: "none"}},
	  	{type: "none", target: {id: "none"}},
	  	{type: "none", target: {id: "none"}},
  	  ];
	  m.historyEventObject.unshift(m.eventObject);
	  m.historyEventObject.pop();
	  
	  //save current and prior three event types, four deep (or as deep as you like)
	  m.historyType = [`noType`,`noType`,`noType`,`noType`];
	  m.historyType.unshift(m.type);
	  m.historyType.pop();
	
	  //save current and prior three ids of events, four deep (or as deep as you like)
	  m.historyId = [`noId`,`noId`,`noId`,`noId`];
	  m.historyId.unshift(m.id);
	  m.historyId.pop();
	
	  //save current and prior three sources of events, four deep (or as deep as you like)
	  m.historySource = [{}, {}, {}, {}];
	  m.historySource.unshift(m.source);
	  m.historySource.pop();
	  
	  m.dblPressed = ((released, htbe)=> {
	      const goodDelay = (htbe[0] + htbe[1]) >= m.MIN_TIME && (htbe[0] + htbe[1]) <= m.MAX_TIME;
	      return ( goodDelay && released[0] && released[2] );
	  })(m.historyReleased, m.historyTimeBetweenEvents);
	  
	  m.clientX = ((e)=>{
	      let x = 0;
	      e.changedTouches && e.changedTouches[0]
	        ? x = e.changedTouches[0].clientX
	        : x = e.clientX
	    ;
	      return x;
	  })( m.eventObject);
	
	  m.clientY = ((e)=>{
	      let y = 0;
		      e.changedTouches && e.changedTouches[0] ? 
		    	y = e.changedTouches[0].clientY
		      : y = e.clientY
	      ;
	      return y;
	  })( m.eventObject);
	  /** How about ...
	    m.clientY =  m.e.changedTouches && m.e.changedTouches[0]
	   ? m.e.changedTouches[0].clientY 
	   : m.e.clientY;
	  */
	
	  m.MIN_TIME = 25;	//milliseconds
	  m.MAX_TIME = 500;	//milliseconds	  
	
	  m.clicked = m.timeBetweenEvents <= m.MAX_TIME &&
	              m.timeBetweenEvents >= m.MIN_TIME &&
	              m.released;
	
	  //m.startCoordinates = m.startCoordinates || [0,0];
	  m.startCoordinates = (
		 m.pressed ? 
		  	( () => [m.clientX, m.clientY] )()
		 : m.startCoordinates)
	  ;
	  //et cetera ....

	},////////| end initializing model |////////////////	
	
	
	/////////////////////////////////////////////////////////////////
	/////////////////////| UPDATE META-EVENTS |////////////////
	/////////////////////////////////////////////////////////////////
	
	updateMetaEvents(eventObject){
	  if ( eventObject.type === `fixdelay` ){ return; }
		
	  let currentTime = Date.now();
	  m.timeBetweenEvents = currentTime - m.eventTime ;//time between prior event and this one
	  m.eventTime = currentTime ;
	
	  if(m.firstTime){
	    m.timeBetweenEvents = 0;
	    m.firstTime = false;
	  }
	
	  //record history of time between events
	  m.historyTimeBetweenEvents.unshift(m.timeBetweenEvents);
	  m.historyTimeBetweenEvents.pop();
	    
	  m.eventObject = eventObject;    //the event object itself
	  m.e = eventObject;				//a convenient shorthand for eventObject	    
	  m.source = eventObject.target;  //where the event occurred
	  
	  
	  m.source.includedInClass = (className) => {
	    return !! Array.from( document.querySelectorAll(`.${className}`) ).includes(eventObject.target);
	  };
	  
	  m.type = eventObject.type;      //what the event was
	  m.id = eventObject.target.id;   //the id of the element where the event occurred
	
	  //Short cuts to combine similar mobile and computer events
	  m.pressed = m.type === `mousedown` || m.type === `touchstart`;
	  if(m.pressed){
	    m.stillPressed = true;
		m.timePressed = Date.now();		
	  }
	  m.released = m.type === `mouseup` || m.type === `touchend`;
	  //save current m.released
	  m.historyReleased.unshift(m.released);
	  m.historyReleased.pop();
	
	  if(m.released){
	    m.stillPressed = false;     
	  }
	  m.moved = m.type === `mousemove` || m.type === `touchmove`;
	  
	  m.sliding = m.moved && m.stillPressed;
	  
	  m.resized = m.type === `resize` ||
	        m.type === `orientationchange` ||
	        m.type === `load` ||
	        m.type === `DOMContentLoaded`;
	        
	        
	  /*save current and three prior eventObjects, four deep (or as deep as you like)
	  m.historyEventObject = [
	  	{type: "none", target: {id: "none"}},
	  	{type: "none", target: {id: "none"}},
	  	{type: "none", target: {id: "none"}},
	  	{type: "none", target: {id: "none"}},
  	  ]
  	  */
	  m.historyEventObject.unshift(m.eventObject);
	  m.historyEventObject.pop();	        
	
	  //save current and prior three event types, four deep (or as deep as you like)
	  //m.historyType = [`noType`,`noType`,`noType`,`noType`];
	  m.historyType.unshift(m.type);
	  m.historyType.pop();
	
	  //save current and prior three sources of events, four deep (or as deep as you like)
	  //m.historyId = [`noId`,`noId`,`noId`,`noId`];
	  m.historyId.unshift(m.id);
	  m.historyId.pop();
	
	  //save current and prior three sources of events, four deep (or as deep as you like)
	  //m.historySource = [{}, {}, {}, {}];
	  m.historySource.unshift(m.source);
	  m.historySource.pop();
	
	  m.dblPressed = ((released, htbe)=> {
	      const goodDelay = (htbe[0] + htbe[1]) >= m.MIN_TIME && (htbe[0] + htbe[1]) <= m.MAX_TIME;
	      return ( goodDelay && released[0] && released[2] );
	  })(m.historyReleased, m.historyTimeBetweenEvents);
	
	
	  m.clientX = ((e)=>{
	      let x = 0;
	      e.changedTouches && e.changedTouches[0]
	        ? x = e.changedTouches[0].clientX
	        : x = e.clientX;
	      return x;
	  })( m.eventObject);
	
	  m.clientY = ((e)=>{
	      let y = 0;
	      e.changedTouches && e.changedTouches[0]
	        ? y = e.changedTouches[0].clientY
	        : y = e.clientY;
	      return y;
	  })( m.eventObject);
	
	  m.MIN_TIME = 25;	//milliseconds
	
	  m.MAX_TIME = 500;	//milliseconds
	  m.clicked = m.timeBetweenEvents <= m.MAX_TIME &&
	              m.timeBetweenEvents >= m.MIN_TIME &&
	              m.released;
	
	  //m.startCoordinates = m.startCoordinates || [0,0];
	  m.startCoordinates = m.pressed
	            ? ( () => [m.clientX, m.clientY] )()
	            : m.startCoordinates
	  ; 
	  /////////////////////////////////////
	},

	/////////////////////////////////////////////////////////	
	//sometimes a non-event needs to call a set-show pair of functions:
	setAndShow(suffix, namespace = this){
		if(typeof suffix !== `string`){
			c.log(`For c.setAndShow(suffix), suffix needs to be a string.`);
			return;
		}
		//set the first letter of suffix to uppercase
		suffix = suffix.charAt(0).toUpperCase() + suffix.slice(1);
		const setFuntionName =    `set${suffix}`;
		const showFunctionName =  `show${suffix}`;
		namespace[setFuntionName](m);
		namespace[showFunctionName](v);
	},
	////////////////////////////////

	
};
/////////////////////////////////


////////////////////////////////
export {L, s, m, v, c};

window.onload = c.initialize;