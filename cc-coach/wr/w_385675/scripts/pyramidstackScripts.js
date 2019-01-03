var btnClicked = "-1";
var finalScale;

var isPresenter = false;
function getWidgetIFrame(){
	if(isPresenter){
		return window.parent.document.getElementById(window.name);
	}else{
		var cpWidget = window.parent.document.getElementsByClassName("cp-widget");
		for(i=0;i<cpWidget.length;i++){
			for(j=0;j<cpWidget[i].children.length;j++){
				if(cpWidget[i].children[j].children[0] != undefined){
					if(cpWidget[i].children[j].children[0].contentDocument.getElementById("pyramidstackwdgt") != null){
						myFrameName = window.name;
						return window.parent.document.getElementById(window.name);
					}
				}
			}
		}
	}
}

function resizeInteractionPresenter(thewidth,theheight) {
	var scale = 0;
	thewidth = String(thewidth).replace("px","");
	theheight = String(theheight).replace("px","");

	if(thewidth<320){
		thewidth = 320
	}
	if(theheight<320){
		theheight = 320
	}
	
	/**********************/
	//Modification made for Presenter same logic holds good for Captivate
	//iframe width and Height
	var scaleW = thewidth / (700);
	var scaleH = theheight/ (498);
	
	if(scaleW<scaleH){
		scale = scaleW
	}else{
		scale = scaleH
	}
	
	myWidgetiFrame.style.width = parseInt(parseInt(750*scaleW))+"px"
	myWidgetiFrame.style.height = parseInt(parseInt(550*scaleH))+"px"
	
	var iframewidth = String(myWidgetiFrame.style.width).replace("px","");
	var iframeheight = String(myWidgetiFrame.style.height).replace("px","");
	
	/*********************/
	
	//Resize fonts
	var fontscaleW = thewidth / (800);
	var fontscaleH = theheight/ (600);
	if(fontscaleW<fontscaleH){
		fontscale = fontscaleW
	}else{
		fontscale = fontscaleH
	}
		
	contentStyles.size = contentStylessize*fontscale;
	buttonStyles.size = buttonStylessize*fontscale;
	headerStyles.size = headerStylessize*fontscale;
	instStyles.size = instStylessize*fontscale;
	
	setupStyle("#intTitle", headerStyles)
	setupStyle("#intInstructions", instStyles)
	setupStyle(".tab_content", contentStyles)
	setupStyle(".theovertext", buttonStyles)
	
	var marginsW
	
	var headerActiveSize;
	if (generalStyles.headerActive == 2) {
		headerActiveSize = -20
	}else{
		headerActiveSize = $('#headerColor').height();
	}
	var neutVal = 0;
	if(iframewidth>=1024){
		marginsW = Math.round((27+scaleW) * scaleW);
		neutVal = -2;
	}else if(iframewidth>= 768){
		marginsW = Math.round((25+scaleW) * scaleW);
		neutVal = 0
	}else if(iframewidth>= 360){
		marginsW = Math.round((19+scaleW) * scaleW);
		neutVal = 4
	}else{
		marginsW = Math.round((12+scaleW) * scaleW);
		neutVal = 4
	}
	marginsW = Math.round(30 * scaleW);
	var marginsH = Math.round(25 * scaleH);
	
	$('#reveal').css('width',(680*scaleW));
	$('#reveal').css('height',(470*scaleH));
	$('#reveal').css('margin-left', marginsW+"px");
	$('#reveal').css('margin-top', marginsH+"px");
	
	var revealHeight = parseInt(String($('#reveal').css('height').replace("px","")));
	var revealWidth = parseInt(String($('#reveal').css('width').replace("px","")));
	
	var contentBg = document.getElementById("content_bg");
	//contentBg.style.width = ((revealHeight-headerActiveSize)-40)+"px"
	contentBg.style.height = ((revealHeight-headerActiveSize)-40)+"px"
	//$("#content_bg").hide();
	
	var contentBgHeight = parseInt(String($('#content_bg').css('height').replace("px","")));
	var contentBgWidth = parseInt(String($('#content_bg').css('width').replace("px","")));
	
	//display matrix
	var divSlideWidth = $(divSlide).width();
	var divSlideHeight = $(divSlide).height();
	//Adjust width and height positions
	layer.setScale(scale);
	stage.add(layer);
	$("#pyramidHolder").css("width",350*scale)
	$("#pyramidHolder").css("height",350*scale)
	
	
	var pyramidHolderW = parseInt(String($('#pyramidHolder').css('width').replace("px","")));
	var pyramidHolderH = parseInt(String($('#pyramidHolder').css('height').replace("px","")));
	
	//Adjust top and left positions
	var pyramidTop = ((contentBgHeight/2)-(pyramidHolderH/2)+(headerActiveSize))-(10*scaleH);
	var pyramidLeft = ((contentBgWidth/2)-(pyramidHolderW/2)-(160*scaleW));
	$("#pyramidHolder").css("margin-top",pyramidTop);
	$("#pyramidHolder").css("margin-left",pyramidLeft);
	
	//$("#overs").css("top",pyramidTop);
	//Resize and display content
	$(".scroll-pane").css('height',(revealHeight-headerActiveSize)-(80*scale));
	$(".scroll-pane").css('width',((revealWidth-pyramidHolderW))-(80*scale));
	$(".scroll-pane").css('top',(headerActiveSize+(50*scale)));
	$(".scroll-pane").css('left',(pyramidHolderW+(75*scale)))
	
	var pyHeight = (pyramidHolderH/textArray.length)-29;
	
	var brw;
	var bbw;
	var tempBaseWidth;
	var tempWidth;
	var gutterSpace
	if(textArray.length ==2){
		brw = 84;
		bbw = 136;
		tempBaseWidth = 100
		tempWidth = 87
		gutterSpace = 3
	}else if(textArray.length ==3){
		brw = 56;
		bbw = 89;
		tempBaseWidth = 126
		tempWidth = 57
		gutterSpace = 3
	}else if(textArray.length ==4){
		brw = 40.5;
		bbw = 66.5;
		tempBaseWidth = 140
		tempWidth = 43
		gutterSpace = 3;
	}else if(textArray.length ==5){
		brw = 32;
		bbw = 52;
		tempBaseWidth = 145
		tempWidth = 35
		gutterSpace = 3
	}else if(textArray.length ==6){
		brw = 24.5;
		bbw = 42.5;
		tempBaseWidth = 156
		tempWidth = 28
		gutterSpace = 3
	}
	
	for(i=1;i<=textArray.length;i++){
		var index = i;	
		var theWidth = (tempBaseWidth*scaleW)+ ((index * tempWidth)*scale);// + theX;
		var theHeight = (index * 55)*scaleH;// + theX;
		bright = 25;
			
		$('#over'+i).css("width",(theWidth));

		$('#over'+i).css("border-right-width",(brw*scale)+i+"px");
		$('#over'+i).css("border-bottom-width",(bbw*scale)+i+"px");
		
		//console.log((pyHeight*scaleH)-(30*scaleH),(pyHeight*scaleH))
		
		var overH = parseInt(String($('#over'+1).css("border-bottom-width")));
		var tempH = ((contentBgHeight/2)-(pyramidHolderH/2))+(headerActiveSize*scaleH);
		var theY;
		var theY1;
		if(i==1){
			theY = pyramidTop+(133+(10.5*scale))
			theY1 =  theY;
		}else{
			theY = (theY1+(overH*(i-1)))+((gutterSpace*(i-1))*scale);
		}
		
		$('#over'+i).css("left",bright+(10*scaleW));
		$('#over'+i).css("top",theY);
		
		$('#overtext'+i).css("width",(theWidth));
		$('#overtext'+i).css("height",overH);
		
		$('#overtext'+i).css("left",bright+(10*scaleW));
		$('#overtext'+i).css("top",theY);
	}
	
	$($(myWidgetiFrame).parent().parent()).css("top",(myWidgetiFrameTop+(-19*scaleH)))
	$($(myWidgetiFrame).parent().parent()).css("left",(myWidgetiFrameLeft+(-25*scaleW)))
	$(myWidgetiFrame).show();
}

function resizeInteraction(thewidth,theheight) {
	if(isPresenter)
		return resizeInteractionPresenter(thewidth, theheight);
	var scale = 0;
	thewidth = String(thewidth).replace("px","");
	theheight = String(theheight).replace("px","");

	if(thewidth<320){
		thewidth = 320
	}
	if(theheight<320){
		theheight = 320
	}
	
	/**********************/
	//Modification made for Presenter same logic holds good for Captivate
	//iframe width and Height
	var scaleW = thewidth / (700);
	var scaleH = theheight/ (498);
	
	if(scaleW<scaleH){
		scale = scaleW
	}else{
		scale = scaleH
	}
	
	myWidgetiFrame.style.width = parseInt(parseInt(750*scaleW))+"px"
	myWidgetiFrame.style.height = parseInt(parseInt(550*scaleH))+"px"
	
	var iframewidth = String(myWidgetiFrame.style.width).replace("px","");
	var iframeheight = String(myWidgetiFrame.style.height).replace("px","");
	
	
	/*********************/
	
	//Resize interaction
	//Resize fonts
	//scalefont = false;
	if(scalefont=="true"){
		//Content font size
		if(contentStylessize>=12){
			if(thewidth>=1024){
				contentStyles.size = contentStylessize;
			}else if(thewidth>= 768){
				var tempNum = Math.round(contentStylessize-2);
				if(tempNum>=12){
					contentStyles.size = tempNum
				}else{
					contentStyles.size = 12
				}
			}else if(thewidth>= 360){
				contentStyles.size = 12
			}else{
				contentStyles.size = 10
			}
			
			var tempcontentStylessize = contentStyles.size*scaleW;
			if(tempcontentStylessize>=12 && tempcontentStylessize<=contentStylessize){
				contentStyles.size = tempcontentStylessize;
			}
			
		}
		
		
		//Button font size
		if(buttonStylessize>=12){
			if(thewidth>=1024){
				buttonStyles.size = buttonStylessize;
			}else if(thewidth>= 768){
				var tempNum = Math.round(buttonStylessize-2);
				if(tempNum>=12){
					buttonStyles.size = tempNum
				}else{
					buttonStyles.size = 12
				}
			}else if(thewidth>= 360){
				buttonStyles.size = 12
			}else{
				buttonStyles.size = 10
			}
			
			var tempbuttonStylessize = buttonStyles.size*scaleW;
			if(tempbuttonStylessize>=12 && tempbuttonStylessize<=buttonStylessize){
				buttonStyles.size = tempbuttonStylessize;
			}
			
		}
		
		
		//Header font size
		if(headerStylessize>=16){
			if(thewidth>=1024){
				headerStyles.size = headerStylessize;
			}else if(thewidth>= 768){
				var tempNum = Math.round(headerStylessize-2);
				if(tempNum>=16){
					headerStyles.size = tempNum
				}else{
					headerStyles.size = 16
				}
			}else if(thewidth>= 360){
				headerStyles.size = 16
			}else{
				headerStyles.size = 14
			}
			
			var tempheaderStylessize = headerStyles.size*scaleW;
			if(tempheaderStylessize>=16 && tempheaderStylessize<=headerStylessize){
				headerStyles.size = tempheaderStylessize;
			}
			
		}
		
		//Instructions font size
		if(instStylessize>=12){
			if(thewidth>=1024){
				instStyles.size = instStylessize;

			}else if(thewidth>= 768){
				var tempNum = Math.round(instStylessize-2);
				if(tempNum>=12){
					instStyles.size = tempNum
				}else{
					instStyles.size = 12
				}
			}else if(thewidth>= 360){
				instStyles.size = 12
			}else{
				instStyles.size = 10
			}
			
			var tempinstStylessize = instStyles.size*scaleW;
			if(tempinstStylessize>=12 && tempinstStylessize<=instStylessize){
				instStyles.size = tempinstStylessize;
			}

		}

		setupStyle("#intTitle", headerStyles)
		setupStyle("#intInstructions", instStyles)
		setupStyle(".tab_content", contentStyles)
		setupStyle(".theovertext", buttonStyles)
	}else{
		
		contentStyles.size = contentStylessize;
		buttonStyles.size = buttonStylessize;
		headerStyles.size = headerStylessize;
		instStyles.size = instStylessize;
		
		if(theheight <= 360 || thewidth <= 360){
			contentStyles.size = 10;
			buttonStyles.size = 10;
			headerStyles.size = 14;
			instStyles.size = 10;
		}
		
		setupStyle("#intTitle", headerStyles)
		setupStyle("#intInstructions", instStyles)
		setupStyle(".tab_content", contentStyles)
		setupStyle(".theovertext", buttonStyles)
	}
	
	var marginsW
	
	var headerActiveSize;
	if (generalStyles.headerActive == 2) {
		headerActiveSize = -20
	}else{
		headerActiveSize = $('#headerColor').height();
	}
	var neutVal = 0;
	if(iframewidth>=1024){
		marginsW = Math.round((27+scaleW) * scaleW);
		neutVal = -2;
	}else if(iframewidth>= 768){
		marginsW = Math.round((25+scaleW) * scaleW);
		neutVal = 0
	}else if(iframewidth>= 360){
		marginsW = Math.round((19+scaleW) * scaleW);
		neutVal = 4
	}else{
		marginsW = Math.round((12+scaleW) * scaleW);
		neutVal = 4
	}
	
	var marginsH = Math.round(30 * scaleH);
	
	$('#reveal').css('width',(680*scaleW));
	$('#reveal').css('height',(470*scaleH));
	$('#reveal').css('margin-left', marginsW+"px");
	$('#reveal').css('margin-top', marginsH+"px");
	
	var revealHeight = parseInt(String($('#reveal').css('height').replace("px","")));
	var revealWidth = parseInt(String($('#reveal').css('width').replace("px","")));
	
	var contentBg = document.getElementById("content_bg");
	//contentBg.style.width = ((revealHeight-headerActiveSize)-40)+"px"
	contentBg.style.height = ((revealHeight-headerActiveSize)-40)+"px"
	//$("#content_bg").hide();
	
	var contentBgHeight = parseInt(String($('#content_bg').css('height').replace("px","")));
	var contentBgWidth = parseInt(String($('#content_bg').css('width').replace("px","")));
	
	//display matrix
	var divSlideWidth = $(divSlide).width();
	var divSlideHeight = $(divSlide).height();
	//Adjust width and height positions
	if(parseInt(thewidth)>=parseInt(theheight)){
		layer.setScale(scale);
    	stage.add(layer);
		$("#pyramidHolder").css("width",350*scale)
		$("#pyramidHolder").css("height",350*scale)
		
		
		var pyramidHolderW = parseInt(String($('#pyramidHolder').css('width').replace("px","")));
		var pyramidHolderH = parseInt(String($('#pyramidHolder').css('height').replace("px","")));
		
		//Adjust top and left positions
		var pyramidTop = ((contentBgHeight/2)-(pyramidHolderH/2)+(headerActiveSize))-(40+(10*scaleH));
		var pyramidLeft = ((contentBgWidth/2)-(pyramidHolderW/2)-(160*scaleW));
		$("#pyramidHolder").css("margin-top",pyramidTop);
		$("#pyramidHolder").css("margin-left",pyramidLeft);
		
		//$("#overs").css("top",pyramidTop);
		//Resize and display content
		$(".scroll-pane").css('height',(revealHeight-headerActiveSize)-(80*scale));
		$(".scroll-pane").css('width',((revealWidth-pyramidHolderW))-(80*scale));
		$(".scroll-pane").css('top',(headerActiveSize+(50*scale)));
		$(".scroll-pane").css('left',(pyramidHolderW+(75*scale)))
		
		var pyHeight = (pyramidHolderH/textArray.length)-29;
		
		var brw;
		var bbw;
		var tempBaseWidth;
		var tempWidth;
		var gutterSpace
		if(textArray.length ==2){
			brw = 84;
			bbw = 136;
			tempBaseWidth = 100
			tempWidth = 87
			gutterSpace = 3
		}else if(textArray.length ==3){
			brw = 56;
			bbw = 89;
			tempBaseWidth = 126
			tempWidth = 57
			gutterSpace = 3
		}else if(textArray.length ==4){
			brw = 40.5;
			bbw = 66.5;
			tempBaseWidth = 140
			tempWidth = 43
			gutterSpace = 3;
		}else if(textArray.length ==5){
			brw = 32;
			bbw = 52;
			tempBaseWidth = 145
			tempWidth = 35
			gutterSpace = 3
		}else if(textArray.length ==6){
			brw = 24.5;
			bbw = 42.5;
			tempBaseWidth = 156
			tempWidth = 28
			gutterSpace = 3
		}
		
		for(i=1;i<=textArray.length;i++){
			var index = i;	
			var theWidth = (tempBaseWidth*scaleW)+ ((index * tempWidth)*scale);// + theX;
			var theHeight = (index * 55)*scaleH;// + theX;
			bright = 25;
				
			$('#over'+i).css("width",(theWidth));
	
			$('#over'+i).css("border-right-width",(brw*scale)+i+"px");
			$('#over'+i).css("border-bottom-width",(bbw*scale)+i+"px");
			
			//console.log((pyHeight*scaleH)-(30*scaleH),(pyHeight*scaleH))
			
			var overH = parseInt(String($('#over'+1).css("border-bottom-width")));
			var tempH = ((contentBgHeight/2)-(pyramidHolderH/2))+(headerActiveSize*scaleH);
			var theY;
			var theY1;
			if(i==1){
				theY = pyramidTop+(133+(10.5*scale))
				theY1 =  theY;
			}else{
				theY = (theY1+(overH*(i-1)))+((gutterSpace*(i-1))*scale);
			}
			
			$('#over'+i).css("left",bright+(10*scaleW));
			$('#over'+i).css("top",theY);
			
			$('#overtext'+i).css("width",(theWidth));
			$('#overtext'+i).css("height",overH);
			
			$('#overtext'+i).css("left",bright+(10*scaleW));
			$('#overtext'+i).css("top",theY);
		}
	}else{
	
		var fscaleW = thewidth / (600);
		var fscaleH = theheight/ (398);
		
		var tfscale = fscaleW
		
		if(fscaleW<fscaleH){
			tfscale = fscaleW
		}else{
			tfscale = fscaleH
		}
		
		var fscale = "scale(" + tfscale + ")";
		
		layer.setScale(tfscale);
    	stage.add(layer);
			
		$("#pyramidHolder").css("width",350*scale)
		$("#pyramidHolder").css("height",350*scale)
		
		
		var pyramidHolderW = parseInt(String($('#pyramidHolder').css('width').replace("px","")));
		var pyramidHolderH = parseInt(String($('#pyramidHolder').css('height').replace("px","")));
		
		//Adjust top and left positions
		var pyramidTop = headerActiveSize-(50*fscaleH);
		var pyramidLeft = (contentBgWidth/2)-(pyramidHolderW/2)-(60*scaleW)
		$("#pyramidHolder").css("margin-left",pyramidLeft);
		
		$(".scroll-pane").css('width',((revealWidth))-(80*scale));
		$(".scroll-pane").css('left',((55*scale)))
		
		var diffval = 0;
		if(thewidth<=414){
			diffval = 40*tfscale
			$("#pyramidHolder").css("margin-top",pyramidTop-diffval);
			$(".scroll-pane").css('height',(revealHeight-headerActiveSize)-pyramidHolderH-(120*scale));
			$(".scroll-pane").css('top',(headerActiveSize+(410*scale)));
		}else{
			$("#pyramidHolder").css("margin-top",pyramidTop);
			$(".scroll-pane").css('height',(revealHeight-headerActiveSize)-pyramidHolderH-(80*scale));
			$(".scroll-pane").css('top',(headerActiveSize+(400*scale)));
		}
		//$("#overs").css("top",pyramidTop);
		//Resize and display content
		
		var pyHeight = (pyramidHolderH/textArray.length)-29;
		
		var brw;
		var bbw;
		var tempBaseWidth;
		var tempWidth;
		var gutterSpace
		if(textArray.length ==2){
			brw = 84;
			bbw = 136;
			tempBaseWidth = 180
			tempWidth = 87
			gutterSpace = 3
		}else if(textArray.length ==3){
			brw = 56;
			bbw = 89;
			tempBaseWidth = 206
			tempWidth = 57
			gutterSpace = 3
		}else if(textArray.length ==4){
			brw = 40.5;
			bbw = 66.5;
			tempBaseWidth = 220
			tempWidth = 43
			gutterSpace = 3;
		}else if(textArray.length ==5){
			brw = 32;
			bbw = 52;
			tempBaseWidth = 225
			tempWidth = 35
			gutterSpace = 3
		}else if(textArray.length ==6){
			brw = 24.5;
			bbw = 42.5;
			tempBaseWidth = 236
			tempWidth = 28
			gutterSpace = 3
		}
		
		for(i=1;i<=textArray.length;i++){
			var index = i;	
			var theWidth = (tempBaseWidth*fscaleW)+ ((index * tempWidth)*tfscale);// + theX;
			var theHeight = (index * 55)*fscaleH;// + theX;
			bright = 25;
				
			$('#over'+i).css("width",(theWidth));
	
			$('#over'+i).css("border-right-width",(brw*tfscale)+i+"px");
			$('#over'+i).css("border-bottom-width",(bbw*tfscale)+i+"px");
			
			//console.log((pyHeight*scaleH)-(30*scaleH),(pyHeight*scaleH))
			
			var overH = parseInt(String($('#over'+1).css("border-bottom-width")));
			var tempH = ((contentBgHeight/2)-(pyramidHolderH/2))+(headerActiveSize*fscaleH);
			var theY;
			var theY1;
			if(i==1){
				theY = pyramidTop+(133+(10.5*tfscale))
				theY1 =  theY;
			}else{
				theY = (theY1+(overH*(i-1)))+((gutterSpace*(i-1))*tfscale);
			}
			
			$('#over'+i).css("left",bright+(10*fscaleW));
			$('#over'+i).css("top",theY-diffval);
			
			$('#overtext'+i).css("width",(theWidth));
			$('#overtext'+i).css("height",overH);
			
			$('#overtext'+i).css("left",bright+(10*fscaleW));
			$('#overtext'+i).css("top",theY-diffval);
		}
	}
	
	if(isResponsiveProject){
		$($(myWidgetiFrame).parent().parent()).css("top",(myWidgetiFrameTop+(-19*scaleH)))
		$($(myWidgetiFrame).parent().parent()).css("left",(myWidgetiFrameLeft+(-25*scaleW)))
	}else{
		if(firstLoad){
			$($(myWidgetiFrame).parent().parent()).css("top",(myWidgetiFrameTop+(-19*scaleH)))
			$($(myWidgetiFrame).parent().parent()).css("left",(myWidgetiFrameLeft+(-25*scaleW)))
		}
	}
}

//$(document).ready(function() {
function addClickHandlers() {
	$("#reveal").show();
	$("#pyramidHolder").show();
	$(myWidgetiFrame).show();
}

/*var theSnd = null;

function pauseSound() {
	if(theSnd != null) // && theSnd.src != wavePath)
	{ theSnd.pause();}
}

function play_sound(url){
	theSnd = new Audio(url);
	theSnd.load();
	theSnd.play();	
}*/

//Modifying the sound function - Audio load and play is now handled by captivate: IF it does not handle the audio revert to old code.
//This fix was mainly  implemented for IPAD.
var isDevice = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	isDevice = true
}
//var isDevice = navigator.userAgent.match(/iPad/i) != null;
var theSnd = null;
var theSndURL = null;

function pauseSound() {
	if(isDevice){
		if(!this.handle)
		return;
		
		if(!this.handle.stopWidgetAudio(theSndURL)){
			if(theSnd != null){ 
				theSnd.pause();
			}
		}else{
			this.handle.stopWidgetAudio(theSndURL)
		}
	} else {
		if(theSnd != null) // && theSnd.src != wavePath)
		{ theSnd.pause();}
	}
}

function play_sound(url){
	if(isDevice){
		if(!this.handle)
		return;
		
		theSndURL = url;
		if(!this.handle.playWidgetAudio(url)){	
			theSnd = new Audio(url);
			theSnd.load();
			theSnd.play();
		}else{
			this.handle.playWidgetAudio(url)
		}
	}else{
		theSnd = new Audio(url);
		theSnd.load();
		theSnd.play();	
	}
}
////////////////////////////////////////////////////////


function setupCustomStyles() {
	

/*pyramid color

	var _canvasColor='#FFFFFF';
_pyramidColor='#ffffff';
_circleColor='#FFF';
_pyramidOverColor='#cccccc';
_pyramidDownColor='#eeeeee';
*/
//alert(generalStyles.btnColorUp);
//alert(generalStyles.contentBodyColor);
	generalStyles.headerColor = formatColor(generalStyles.headerColor); //generalStyles.headerColor.substring(2);
//_canvasColor = '#111111'//formatColor(generalStyles.contentBodyColor);
	_pyramidColor = formatColor(generalStyles.btnColorUp);
	_pyramidOverColor = formatColor(generalStyles.btnColorOver);
	_pyramidDownColor = formatColor(generalStyles.btnColorDown);

	//generalStyles.headerColor = formatColor(generalStyles.headerColor); //generalStyles.headerColor.substring(2);
	generalStyles.contentBodyColor = formatColor(generalStyles.contentBodyColor); //"#" + generalStyles.contentBodyColor.substring(2);
	generalStyles.bodyColor = formatColor(generalStyles.bodyColor); //"#" + generalStyles.bodyColor.substring(2);
	
	
		if (currentTheme != 3 && currentTheme != 11 && currentTheme != 16) {
			$('#headerColor').css('background-color', generalStyles.headerColor)//generalStyles.headerColor);
		} else {
			$('#headerColor').css('background-color', generalStyles.bodyColor)//generalStyles.headerColor);
			
		}
		
	$('.theovertext').css('padding-left', '10px');
	$('.theovertext').css('padding-top', '10px');


//	$('#headerColor').css('background-image', 'none');
	$('#textBox').css('background-color', generalStyles.contentBodyColor);
	$('#content_bg').css('background-color', generalStyles.bodyColor);
	
	$('#reveal').css('background-color', generalStyles.bodyColor);
	$('.theover').css('border-right', generalStyles.btnColorDown);
	
	
	$('#pyramidHolder').css("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	

	if (generalStyles.headerActive == 2) {
		$('#headerColor').css('display', 'none');
	}
	
}