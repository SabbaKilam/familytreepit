import {L, s, m, v, c} from './INITIALIZE.js';

c.update = (eventObject)=>{
	c.updateMetaEvents(eventObject);  //update metaEvents first 
  
	c.updateModelAndView({		
		/*============================================================*/		
		/*==========| event handlers and their qualifiers|============*/
		/*============================================================*/
		//cameoVideoChatPrompt
		showVideoChatWindow:[m.source.includedInClass(`cameoVideoChatPrompt`), m.pressed],
		hideVideoChatWindow:[m.source === v.exitVideoChat, m.pressed],
		
		inviteToVideoChat:	[m.source.includedInClass(`commAnchor`), m.pressed ],
		
		handleResize:		[m.resized],
		
		handleUnload:		[m.type === `beforeunload`],
		
		hideAndClearVeil:	[m.source === v.exitVeil, m.released],
		
		handleReleased:		[m.released],
		reloadPage:			[m.source === v.reloadButton, m.pressed],

		startPopupTimer:	[m.source.includedInClass(`cameo`), m.pressed ],		
		enlargeCameo:		[m.source.includedInClass(`cameo`), m.type ===`mouseover`],
		restoreCameoSize:	[m.source.includedInClass(`cameo`), m.type ===`mouseout`],
		readyDragSource:	[m.source.includedInClass(`cameo`), m.type===`dragstart`],
		slideCameo:			[m.source.includedInClass(`cameo`), m.sliding ],
		fingerDropCameo:	[m.source.includedInClass(`cameo`), m.type === `touchend` ],
		
		readyDragTarget:	[m.source.includedInClass(`circle`), m.type === `dragover`],
		handleDrop:			[m.source.includedInClass(`circle`), m.type===`drop`],
		restoreCircleColor: [m.type === `dragleave`],
		
		runSelectedTest:	[m.source === v.testSelector, m.type === `change`],
		runRecentTest:		[m.source === v.btnLog, m.clicked],
		getConsoleTest:		[m.source === v.btnNewLog, m.clicked],
		showConsoleLog:		[m.historyType[1] === `keyup`, m.type === `wheel`],
		hideConsoleLog:		[m.source === v.logger, m.clicked ],	
		uploadImage:		[m.source === v.fileElement, m.type === `change`],
		
		//startComm:			[m.source.includedInClass(`commAnchor`), m.pressed],
		
		checkPassword:		[m.source === v.loginBox, m.type===`keyup`],

		showInfo:			[1],
		
		/*============================================================
		handlerName: [m.source === v.whatever, m.type === 'whatever'] 
		============================================================*/    
	});
};
//////////////| handlers defined here |//////////////////////////////////////////////
c.showVideoChatWindow = ()=> {
	if (m.source.includedInClass(`cameoVideoChatPrompt`) ) { 
		
		console.log( Object.keys(m.source))
		
		m.source.style.visibility = `hidden`;
		//m.source.css(`visibility: hidden`);// css reported as not a method (??)
		v.videoChatWindow.css(`
			visibility: visible;
			opacity: 1;
		`);
	}
};
/////////////////////////////
c.hideVideoChatWindow = ()=> {
	v.videoChatWindow.css(`
		visibility: hidden;
		opacity: 0;
	`);	
};

/////////////////////////////
c.handleUnload = ()=> {
	
	console.log("unloading");
	c.logout();
};
////////
c.inviteToVideoChat = async ()=> {
	let firstname = m.familyInfo[m.selectedCameo.id].firstname
	let envelope = new FormData();
	console.log( "inviting to video chat", firstname );
	envelope.append("firstname", firstname);
	
	let response = await fetch( `php/inviteToVideoChat.php`, {method: "POST", body: envelope} );
	let result = await response.text();
	
	console.log(result);
	
} 
//////
c.checkPassword = async () => {
	let keyCode = m.eventObject.key || m.eventObject.code;
	if (keyCode !== 13  && keyCode !== `Enter`) {return;}

	let envelope = new FormData();
	envelope.append( `loginName`, v.loginBox.value.trim() );
	m.whoIsLoggedIn = v.loginBox.value.trim();
	v.loginBox.value = ``;
	let response = await fetch( `php/checkPassword.php`, {method: `POST`, body: envelope} );
	let result = await response.text();
	m.loginStatus = result;
	console.log( m.loginStatus );
	c.getFamilyInfoServer()
		.then(r=>{
			if(r){
				///////|loop calls |/////////////////
				//This function is called when onresize is triggered.
				//L.loopCall( c.recordCircleLocations, 300 );
				L.loopCall( c.makeAndShowCameos, 1000 );
				L.loopCall( c.getChatInvitations, 1000 );
				////////////////////////////////////				
			}
		})
	
	if ( m.loginStatus === `allow` ){
		v.passwordWall.css(`visibility: hidden; opacity: 0`);
		v.whoIsLoggedInSpan.innerText = m.whoIsLoggedIn;
	}
	else if ( m.loginStatus === `deny`) {
		v.passwordWall.css(`visibility: visible; opacity: 1`);
		m.whoIsLoggedIn = `foobar`;		
	}
};

///////////////////////////
c.startComm = () => {
	console.log(m.id);	
	/*
	setTimeout(function(){
		m.id === `commEmail` ?

			v.emailAnchor.href = `mailto: ${ m.familyInfo[ m.selectedCameo.id ].firstname } ${ m.familyInfo[ m.selectedCameo.id ].lastname } <${ m.familyInfo[ m.selectedCameo.id ].email }>`
			
		: m.id === `commEmail` ?

			v.phoneAnchor.href=`tel: ${ m.familyInfo[ m.selectedCameo.id ].phone}`
			
		: m.id === `commChat` ?

			alert(`Chat is under construction`)
			
		: null
		
	}, 200);
	*/
};

/////////////////////
c.fingerDropCameo = ()=>{
	if ( ! m.inSliding ){ return; }
	
	c.restoreCircleColor();
	
	m.inSliding = false;
	m.source.css(`transition: all 0.5s ease`);	
	m.source.css(`opacity: 1`);
	
	//don't drop at origin:
	if ( m.fingerDropTarget && m.fingerDropTarget !== m.cameoOrigin	){
		m.fingerDropTarget.appendChild(m.source);
		//update familyInfo
		m.familyInfo[m.id].holderName = m.fingerDropTarget.id;
		c.makeAndShowCameos();
		console.log(m.familyInfo);
		//save familyInfo to server
		c.saveFamilyInfoServer();
		
		m.cameoOrigin.innerHTML = ``;
		m.fingerDropTarget = null;		
	} 
	else {
		m.cameoOrigin.appendChild(m.source);
	}
};
/////////////////////
c.handleResize = ()=>{
	c.recordCircleLocations();	
};
/////////////////////
c.showAndFillVeil = ()=>{
	c.showVeil( c.fillVeilKinInfo );
};
/////////////////////
c.hideAndClearVeil = () => {
	c.hideVeil( c.clearVeilInfo );
};
/////////////////////
c.handleReleased = ()=>{
	if ( m.selectedCameo ) {
		c.restoreCameoSize();
	}
};
/////////////////////
c.reloadPage = ()=>{
	if ( confirm( `OK to Logout?  \( Otherwise, Cancel \)`) ){
		//logout of session, then reload page
		c.logout().then( loginStatus => {
			m.loginStatus = loginStatus;
			console.log( `m.loginStatus(from page reload): ${m.loginStatus}` );
			window.location.reload( true );			
		})
	}	
};
/////////////////////
c.restoreCircleColor = ()=>{
	document.querySelectorAll(`.circle`).forEach(circle=>{
		circle.css(`background-color: ${m.circleColor}`);		
	});
	document.querySelectorAll(`.cameo`).forEach(cameo=>{
		cameo.css(`border: none`);		
	});
	
};
/////////////////////
c.startPopupTimer = ()=>{
  m.selectedCameo = m.source;	
  c.enlargeCameo();
  
  m.popupTimer = setTimeout(()=>{
	if ( m.eventObject.touches && m.eventObject.touches.length > 1 || m.inSliding )	{ 
		console.log("two many touches");	
		return; 
	}
	c.showVeil( c.fillVeilKinInfo );  
  }, m.DELAY_VEIL);
};
/////////////////////
c.enlargeCameo = ()=>{
	
	m.selectedCameo = m.source;
	c.showName( true );	
	m.source.css(`height: ${m.cameoLarge}vw; width: ${m.cameoLarge}vw`);
	
	/* show names
	m.source.firstChild.style.opacity = "0.85";
	m.source.firstChild.style.visibility = "visible";	
	m.source.firstChild.style.fontSize = "1.75rem";
	*/

};
/////////////////////
c.restoreCameoSize = ()=>{
	
	//m.selectedCameo = m.source;
	c.showName( false );	
	document.querySelectorAll(`.cameo`).forEach( cameo=>{
		cameo.css(s.cameoStyle);
		cameo.css( `height: ${m.cameoSmall}vw; width:${m.cameoSmall}vw` );	
	});
	document.querySelectorAll(`.circle`).forEach( circle=>{	
		circle.css(`height: ${m.circleSize}vw; width:${m.circleSize}vw`);	
	});
	
	/* hide names
	m.selectedCameo.firstChild.style.opacity = "0";
	m.selectedCameo.firstChild.style.visibility = "hidden";	
	m.selectedCameo.firstChild.style.fontSize = "1rem";	
	*/
	
	c.recordCircleLocations();
};
/////////////////////

c.handleDrop = ()=>{
  m.eventObject.preventDefault();
  clearTimeout(m.popupTimer);
  c.restoreCircleColor();

  if(m.source.childNodes.length === 0){
    m.dragParent.innerHTML = ``;  
	c.restoreCameoSize();	
    m.source.appendChild(m.dragSource);
	//update familyInfo
	m.familyInfo[m.dragSource.id].holderName = m.source.id; // or just m.id
	console.log(m.familyInfo);
	//save familyInfor to server
	c.saveFamilyInfoServer();
	
  }	
};
/////////////
c.readyDragSource = ()=>{
  m.dragSource = m.source;
  m.dragParent = m.source.parentNode;
  /////////  
  let size = m.source.getBoundingClientRect().width;
  
  let x = size / 2;
  let y = size / 2 ;  

  m.eventObject.dataTransfer && m.eventObject.dataTransfer.setDragImage(m.source, x, y);
  m.eventObject.dataTransfer && m.eventObject.dataTransfer.setData('text/html', m.source); 	
};
///////////////////////////////
c.readyDragTarget = ()=>{
	m.eventObject.preventDefault();
	m.source.css(`background-color: magenta`);
};
//////////

c.slideCameo = ()=> {
	let timeNow = Date.now()

	clearTimeout(m.popupTimer);  	
	if ( m.type !== `touchmove` || m.veilShowing ) { return; } 
	
	if ( m.eventObject.touches && m.eventObject.touches.length > 1 )	{ 
		console.log("two many touches");
		return; 
	}
	
	if ( timeNow - m.timePressed < m.DELAY_SLIDE ) { return;}
	
	m.inSliding = true;
	
	m.source.css(`transition: all 0 ease`)
	
	console.clear();
	if (m.eventObject.touches){
		console.log(`sliding: ${m.eventObject.touches.length}`);
	}	

	moveSource();
	///////////////| Helpers |///////////
	function moveSource(){
		m.source.css(`opacity: 0.63`);
		//let dy = 0.5 * m.source.getBoundingClientRect().width;
		let dy = 0.25 * m.source.getBoundingClientRect().width;
		//let dy = 0;
		
		let left = 
		console.log(`X : ${m.clientX}`, `Y: ${m.clientY} `);	
			if ( ! c.getBodyIdArray().includes(m.id) ) {
				console.log(m.id)
				m.cameoOrigin = m.source.parentNode;
				document.body.appendChild(m.source);
			}
			let fingerX = m.clientX - dy;
			let fingerY = m.clientY - dy
			m.source.css(`
				position: absolute;
				left: ${fingerX}px;
				top: ${fingerY}px;
				z-index: 5;
			`);
		m.fingerDropTarget = null;	
		
		c.recordCircleLocations();		
		let targetIdArray = Object.keys(m.circleLocations);
		//////////////////////////////////////////////////////////////////////
		for ( let i = 0; i< targetIdArray.length; i++){
			m.cameoSize = m.source.getBoundingClientRect();
			let cameoWidth = m.cameoSize.width;
			console.log(`cameoWidth: ${cameoWidth}`)
			let circleWidth = m.circleSize;
			
			//upper left corner data  
			let cameoXulc = m.cameoSize.x;
			let cameoYulc = m.cameoSize.y; 
			let circleXulc = m.circleLocations[ targetIdArray[i] ] [0];
			let circleYulc = m.circleLocations[ targetIdArray[i] ] [1];
		
			let deltaXulc = circleXulc - cameoXulc;			
			let deltaYulc = circleYulc - cameoYulc;
      
   			
			//lower right corner data
			let cameoXlrc = cameoXulc + cameoWidth;
			let cameoYlrc = cameoYulc + cameoWidth;
			let circleXlrc = circleXulc + circleWidth;
			let circleYlrc = circleYulc + circleWidth;
 
			let deltaXlrc = cameoXlrc - circleXlrc;
			let deltaYlrc = cameoYlrc - circleYlrc; 
   
			
			let inValidDropZone = (
       
				( circleYulc > cameoYulc ) &&   //TOP: circle Y > cameo Y
				( circleXulc > cameoXulc ) &&   //LEFT: circle X > cameo X
				( cameoYlrc > circleYlrc ) &&   //BOTTOM: cameo Y > circle Y
				( cameoXlrc > circleXlrc ) &&   //RIGHT: cameo X > circle X				
				! v[ targetIdArray[i] ].hasChildNodes() //Target has to be empty        
			);
      
			if ( inValidDropZone ) {
				m.fingerDropTarget = v[ targetIdArray[i] ];
				
				m.source.css(`border: 5px dashed magenta`);				
				m.fingerDropTarget.css( `background-color: magenta;`);

				console.log(`valid target: ${m.fingerDropTarget.id}`);
				break; //crucial!				
			}
			else {
				c.restoreCircleColor();				
				m.fingerDropTarget = null;	
			}			
		}
		/////////////////////////////////////////////////////////////////////
	}	
};

//////////
c.runRecentTest = () => {
  clearTimeout(m.popupTimer);  
	c.runSelectedTest();
};

///////////////////////////////////////////////
c.runSelectedTest = () => {
  try{
    let index = v.testSelector.selectedIndex;
    let jsString = v.testSelector[index].innerText;
    console.log (eval(jsString));	
  }
  catch(e){
    console.log(`Error:\n${e}`);
  }

};

////////////////////////////////////////////////////////////////
c.getConsoleTest = ()=>{
	let mostRecentTest = m.testBank[m.testBank.length - 1];
	try{
    let promptString = (
	    	m.testBank[0] ?
	    		mostRecentTest
	    	: `console.clear()`	
    	)
    ;
		let jsString = prompt(`type your test`,  promptString).trim();
		if ( ! m.testBank.includes(jsString) ){
			m.testBank.push(jsString);
		}
		c.fillTestSelector();
		console.log (eval(jsString));
	}
	catch(e){
		console.log(`Error \n${e}`);
	}

};

/////////////////////////////////
c.fillTestSelector = ()=> {
	v.testSelector.innerHTML = ``;
	m.testBank.forEach(test => {
		let option = document.createElement(`option`);
		option.innerText = test;
		v.testSelector.appendChild(option);
	});	
};

/////////////////////////////////
c.showConsoleLog =()=>{
	let ESC = 27;
	if ( m.historyEventObject[1].keyCode != ESC ){ return; }	
	v.logger.css(s.loggerVisibleStyle);	
};

///////////////////////////////////////
c.hideConsoleLog =()=>{
	v.logger.css(s.loggerHiddenStyle);
};

///////////////////////////////////////
c.setUploadImage = (m)=>{};
c.showUploadImage = (v)=>{
	if ( m.source.files && m.source.files[0] ){
		alert(m.source.files[0].name);	
	}
};

c.clickFileButton = (m)=>{
	alert(`released`);
	v.fileElement.click();
	
};

////////////////////////////
c.clearVeilInfo = ()=>{
  setTimeout( ()=>{
	 if ( v.partialCameo ){
		v.partialCameo.css(`background-image: none; visibility: hidden`)	
		v.cameoCommBox.css(`visibility: hidden; opacity: 0`)   		
	 }
  }, 500 )
}

///////////////////////////////
c.hideVeil = (callback)=>{
  m.veilShowing = false;
  c.clearVeilInfo();
  if (m.dragSource.css){
    m.dragSource.css(`height: ${m.cameoSmall}vw;  width: ${m.cameoSmall}vw`);
  }
	v.veil.css(`
		opacity: 0;
		visibility: hidden;
	`);
  if (typeof callback === `function`){ callback() }  
};

///////////////////////////////
c.showVeil = (callback)=>{ //callback usually fills the veil with information and controls
	m.veilShowing = true;
	c.restoreCameoSize();
	v.veil.css(`
		opacity:  1;
		visibility: visible;
	`);
  if (typeof callback === `function`){ callback() }
};

///////////////////////////////
c.fillVeilKinInfo = () => {
   L.attachNewElement('div', 'partialCameo', v);
   v.partialCameo.attribs('class', 'circle');
   let partial = -0.26 * 2* m.cameoLarge;// position of "half-hidden" (25% off screen) cameo in the veil
   v.partialCameo.css(s.partialCameoStyle);
   v.partialCameo.css(`
      top: ${partial}vw;
      left: ${partial}vw;
      height:  ${2*m.cameoLarge}vw;
      width: ${2*m.cameoLarge}vw; 
      background-image: url( ${m.familyInfo[m.selectedCameo.id].pictureURL} ); 
   `);
	v.veil.appendChild(v.partialCameo);
	v.cameoCommBox.css(`visibility: visible; opacity: 1`) 
	v.commName.innerHTML = m.familyInfo[ m.selectedCameo.id ].firstname + " " +m.familyInfo[ m.selectedCameo.id ].lastname 
	v.commPhone.innerHTML = m.familyInfo[ m.selectedCameo.id ].phone
	v.commEmail.innerHTML = m.familyInfo[ m.selectedCameo.id ].email
	//////////////
	v.phoneAnchor.href=`tel: ${ m.familyInfo[ m.selectedCameo.id ].phone}`
	v.emailAnchor.href = `mailto: ${ m.familyInfo[ m.selectedCameo.id ].firstname } ${ m.familyInfo[ m.selectedCameo.id ].lastname } <${ m.familyInfo[ m.selectedCameo.id ].email }>`	
}

///////////////////////
c.showInfo = () => {
	let info = `${m.id} ${m.type} ${m.type === 'wheel' ? L.wheelDelta(m.eventObject) : ''} ${m.sliding ? "sliding":""}` ;
	if ( !!v.info ){
		v.info.innerText = info;		
	}
};

c.getBodyIdArray = function(){
	return [...document.body.childNodes].filter(node=>{ if(node.id){ return true} } ).map(node=> node.id)
}

///////////////////////////////////////////////////
c.recordCircleLocations = ()=>{

	document.querySelectorAll(`.circle`).forEach( circle => {
		let x = circle.getBoundingClientRect().x;
		let y = circle.getBoundingClientRect().y;
		m.circleLocations [circle.id] = [x,y];
	} )
};


/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////| HELPER FUNCTIONS  |///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
c.showName = (boolean = true) => {
	console.log( `selected cameo`, m.selectedCameo.id );
	if( boolean  ){
		//show name
		m.selectedCameo.firstChild.style.opacity = "0.85";
		m.selectedCameo.firstChild.style.visibility = "visible";	
		m.selectedCameo.firstChild.style.fontSize = "1.75rem";		
	}
	else {
		//hide name
		m.selectedCameo.firstChild.style.opacity = "0";
		m.selectedCameo.firstChild.style.visibility = "hidden";	
		m.selectedCameo.firstChild.style.fontSize = "1rem";			
	}

}
/////////////////////
c.showVideoChatPrompt = (boolean = true) => {
	console.log( `selected cameo`, m.selectedCameo.id );
	if( boolean  ){
		//show video chat prompt
		
	}
	else {
		//hide video chat prompt
		
	}

}
////////////////////
c.saveFamilyInfoServer = async () => {
	let sender = new XMLHttpRequest();
	let info = JSON.stringify( m.familyInfo );
	sender.open( `POST`, `php/saveFamilyInfo.php`);
	sender.send(info);
	///////////
	sender.onload = () => {
		if ( sender.status === 200 ){
			//console.log( `result of saving family data: ${sender.responseText}` );
			console.log("Success reported saving to server", sender.responseText)
		}
		else {
			console.log( `Trouble saving at the server`, sender.responseText );
			alert(`Trouble saving at the server: ${sender.responseText}` );
		}
	}
	sender.onerror = () => {
			console.log( `Trouble connecting to server to save info` );
			alert( `Trouble connecting to server to save info.` );		
	}
}
//////////////////////////////////////////////
c.getFamilyInfoServer = async () => {
	let success = false;
	let returnValue = false;
	let response = await fetch(`php/getFamilyInfo.php`);
	let familyInfo = await response.json();
	if (typeof familyInfo === 'object') {
		success = true;
		m.familyInfo = familyInfo;
	}
	return success;
}
//////////////////////////////////////////////////////

c.makeAndShowCameos = async () => {
	
	let cameoIdArray = Object.keys(m.familyInfo);
	let onlineUsers = await c.getOnlineUsers();

	cameoIdArray.forEach(cameoId => {
		
		L.attachNewElement("div", cameoId, v);
		v[cameoId].attribs(`class=cameo`)(`draggable=true`);
		v[cameoId].css(s.cameoStyle);
		let pictureURL = m.familyInfo[cameoId].pictureURL
		v[cameoId].css( `background-image: url( ${pictureURL} )` );
		let holderName = m.familyInfo[cameoId].holderName;
		
		let oldOnline = null;
		let oldId = null;
		let firstname = m.familyInfo[cameoId].firstname.trim();
		let chatInvitation = m.familyInfo[cameoId].chatInvitation;
		
		
		L.attachNewElement("div", `${cameoId}${firstname}`, v);
		v[`${cameoId}${firstname}`].attribs(`class=cameoFirstname`)
		v[`${cameoId}${firstname}`].innerText = firstname
		v[cameoId].appendChild( v[`${cameoId}${firstname}`] )
		
		
		L.attachNewElement("div", `${cameoId}videoChatPrompt`, v);
		v[`${cameoId}videoChatPrompt`]
			.attribs(`class=cameoVideoChatPrompt`)
					(`title=Video Chat Request`)

							
		v[cameoId].appendChild( v[`${cameoId}videoChatPrompt`] )
		
		if( chatInvitation ) {
			
			v[`${cameoId}videoChatPrompt`].css(`visibility: visible`);
		}
		
		if ( onlineUsers.includes( firstname ) ) {
			
			v[cameoId]['data-online'] = true;
			v[cameoId].css(s.loggedInStyle);
			v[cameoId].innerHTML +="<span>Online</span>";
		} else {
			
			v[cameoId]['data-online'] = false;
		}
		
		let newId = v[cameoId]['id'];
		let newOnline = v[cameoId]['data-online'];
		
		if( v[holderName].childNodes[0] ) {
			
			oldId = v[holderName].childNodes[0]['id'];
			newId = v[cameoId]['id'];
			oldOnline = v[holderName].childNodes[0]['data-online'];
			newOnline = v[cameoId]['data-online'];
		}
		
		if (  oldId !== newId || oldOnline !== newOnline ) {
			
			v[holderName].innerHTML = '';
			v[holderName].appendChild( v[cameoId] );			
		}

	})
}
////////////////////////

///////| create login "key-value pair" for custom family trees |///////
c.createCustomLogins = async (arrayOfNames) => {
	
	let md5Array = await c.stringsToMd5s(arrayOfNames);
	let userFamilyInfo = {};
	md5Array.forEach(codedName => {
		userFamilyInfo[codedName] = m.standardFamilyInfo;
	});
	let result = await c.saveUserFamilyInfoServer(userFamilyInfo);
	
	return result;
	
}
/////////
c.stringsToMd5s = async (stringArray) => {
	
	let md5Promises = stringArray.map( name => c.getMD5(name) );
	let md5Array = await Promise.all(md5Promises);
	return md5Array;
}
/////////
c.saveUserFamilyInfoServer = async (userFamilyInfo) => {
	
	let jsonUserFamilyInfo = JSON.stringify(userFamilyInfo);
	let envelope = new FormData();
	envelope.append(`jsonUserFamilyInfo`, jsonUserFamilyInfo);
	let response = await fetch(`php/saveUserFamilyInfo.php`, {method: `POST`, body: envelope});
	let result = await response.text();
	
	return result;
}
///////////////////////
c.getMD5 = async (string) => {
	
	let envelope = new FormData();
	envelope.append('string', string);
	let response = await fetch( `php/getMD5.php`, {method: `POST`, body: envelope} );
	let md5 = await response.text();
	
	return `${md5}`
}
///////////////////////////
c.confirmLogin = async () => {
	//check server for logged in status
	let response = await fetch(`php/getLoginStatus.php`);
	m.loginStatus = await response.text();
	if ( m.loginStatus === `deny`){
		v.loginBox.focus();
		v.passwordWall.css(`visibility: visible; opacity: 1`);
	}
	else if (m.loginStatus === `allow`) {
		v.loginBox.blur();
		v.passwordWall.css(`visibility: hidden; opacity: 0`);
	}
}
//////////
c.getChatInvitations = async () => {
	
	let cameo = m.loginNameToCameo[m.whoIsLoggedIn];
	let envelope = new FormData();
	envelope.append('cameo', cameo);
	let response = await fetch(`php/getChatInvitations.php`, {method: `POST`, body: envelope});
	let result = await response.json()
	m.chatInvitationsArray = result;
	console.log(m.chatInvitationsArray);
	return(m.chatInvitationsArray);
}
///////////
c.saveStandardFamilyInfo = async () => {
	
	let envelope = new FormData();
	envelope.append(`standardFamilyInfo`, JSON.stringify( m.standardFamilyInfo ) );
	let response = await fetch(`php/saveStandardFamilyInfo.php`, {method: `POST`, body: envelope});
	let result = await response.text()
	return result
}
//////////
c.logout = async () => {
	
	let response = await fetch(`php/logout.php`);
	let result = await response.text()
	
	console.log( response, result );
	return result;
}
/////////
c.getOnlineUsers = async () => {
	let response = await fetch(`php/getOnlineUsers.php`);
	let result = await response.json();
	//console.log(typeof result, result);
	
	return result;
}
//////////////
