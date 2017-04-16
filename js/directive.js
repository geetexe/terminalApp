app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown", function (event) {
            if(event.which === 13) {
                scope.$apply(function(){
                	scope.UP = 0;
                	if(!scope.userInput==''){scope.historyLength++;}
                	if(scope.historyLength)
                		scope.targetInd = scope.historyLength - 1;
                	else
                		scope.targetInd = 0;
                    scope.$eval(attrs.myEnter);
                });
            	$(".window").animate({ scrollTop: $("#scr").height() }, 1000);
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            if(event.which === 38 || event.which === 40) {
	            	var ev = event.which===38?'UP':'DOWN';
	            	console.log("Event: "+ev);
	            	$(".window").animate({ scrollTop: $("#scr").height() }, 1000);
	                scope.$apply(function (){
	                	var arr = [];
	                	arr = scope.history;
	                    if(ev=='UP')
	                    {
	                    	if(scope.targetInd>-1)
	                    		scope.userInput = scope.history[scope.targetInd];
	                    	else
	                    		scope.userInput = scope.history[0];
	                    	scope.targetInd -= 1;
	                    	if(scope.targetInd < 0)
	                    		scope.targetInd = 0;		                    
		                    scope.UP = 1;	                    	
	                    }
	                    else
	                    {
	                    	if(scope.UP)
	                    	{
		                    	scope.targetInd  += 1;
		                    	if(scope.targetInd >= scope.historyLength)
		                    		scope.targetInd = scope.historyLength-1;
		                    	scope.userInput = scope.history[scope.targetInd];	                    		
	                    	}
	                    }	                    
	                });
	                event.preventDefault();
	                event.stopImmediatePropagation();          		
            }
        });
    };
});