app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown", function (event) {
            if(event.which === 13) {
            	$(".window").animate({ scrollTop: $("#scr").height() }, 1000);
                scope.$apply(function(){
                	scope.UP = 0;
                	if(!scope.userInput==''){scope.historyLength++;}

                	if(scope.historyLength)
                		scope.targetInd = scope.historyLength - 1;
                	else
                		scope.targetInd = 0;

                    scope.$eval(attrs.myEnter);
                });
                
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
	                    //console.log(scope.history);
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


app.controller("theader", function($scope, $rootScope){

	$scope.initHead = function(){
		$(".sidebar").toggleClass("active");
		$(".anim").toggleClass("click");
	}
});

app.controller("terminalController", function($scope,$http){
	$scope.UP = 0;
	$scope.fetchHistory = 0;
	$scope.busy = 0;
	$scope.toggling = 0;
	$scope.history = [];
	$scope.historyLength = $scope.history.length;
	$scope.processInput = function()
	{

		if($scope.userInput == undefined){
			//to be handled.
		}

		if($scope.userInput!='')
			$scope.history.push($scope.userInput);

		var appendthis = '<span class="console-user">geet</span><span>@</span><span class="red">w4rm4chn13:</span>'+' '+$scope.userInput+'<br>';
		$("#appendhere").append(appendthis);

		if($scope.userInput == "sudo joke"){
			$scope.userInput='';
			$scope.busy = 1;
			$http.get("https://api.chucknorris.io/jokes/random")
			.then(function(response){
				$scope.str = response.data.value;
				$scope.appendjoke = '<span class="white">CNJG says:</span><br>'+' '+$scope.str+'<br>';
				$("#appendhere").append($scope.appendjoke);
			
			}, function(error){
				console.log("response: "+ error);
				$scope.appendjoke = '<span class="white">Error!:</span><br>'+'<br>';
				$("#appendhere").append($scope.appendjoke);
			});
			
		}

		if($scope.userInput.indexOf("weather")>-1){
			var cin = ("sudo weather ").length;
			var city = $scope.userInput.slice(cin,$scope.userInput.length);
			
			$scope.userInput = '';
			$scope.busy = 1;
			$http.get("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=f4ef0931edd7df0498dd3b62d27c0ff6&units=metric")
			.then(function(response){
				
				$scope.str = response.data.main.temp;
				$scope.des = response.data.weather[0].description;
				$scope.s1 = $scope.str;
				
				var n = "Temperature in "+response.data.name+": "
				var appendjoke = '<span class="white">'+n+'</span><br>'+' '+$scope.s1+'&deg;C <br>'+$scope.des+'<br>';
				$("#appendhere").append(appendjoke);
			}, function(error){
				var err = error.status===-1 ? "CORS issue." : "Error.";
				console.log("response: "+ error)
				$scope.str = err;
				$scope.s1 = $scope.str;
				//console.log($scope.str);
				var appendjoke = '<span class="white">Error!:</span><br>'+' '+$scope.s1+'<br>';
				$("#appendhere").append(appendjoke);
			});
		}


		if($scope.userInput.indexOf("flip")>-1){
			$scope.busy = 1;
			var startIndex = ("sudo flip ").length;
			var endIndex = $scope.userInput.length;
			var degrees = $scope.userInput.slice(startIndex,endIndex);
			
			var deg = Number(degrees);
			var c = "rotateY(" +deg+ "deg)";
			$("#scr").css("transform",c);
			var appendjoke = '<span class="white">Rotated by </span><br>'+' '+deg+'<br>';
			$("#appendhere").append(appendjoke);

		}

		if($scope.userInput == "whoami"){
			$scope.busy = 1;
			
			var appendjoke = '<span class="white">You\'re '+'Geet.</span><br>';
			$("#appendhere").append(appendjoke);

		}

		if($scope.userInput == "sudo blackout"){
			$scope.toggling++;
			var st = $scope.toggling%2==0? ' removed.':' applied.';
			$(".contain").toggleClass("vmc");
			
			var appendjoke = '<span class="red">w4rm4chn13:</span>'+' '+'<span class="white">Blackout'+' '+st+'</span><br>';
				$("#appendhere").append(appendjoke);
			$scope.busy = 1;
		}
		if($scope.userInput == "sudo hide menu"){
			
			$(".top-header").hide();
			
			var appendjoke = '<span class="red">w4rm4chn13:</span>'+' '+'<span class="white">Top header is now hidden.</span><br>';
				$("#appendhere").append(appendjoke);
			$scope.busy = 1;
		}
		if($scope.userInput == "sudo show menu"){
			
			$(".top-header").show();
			
			var appendjoke = '<span class="red">w4rm4chn13:</span>'+' '+'<span class="white">Top header is now visible.</span><br>';
				$("#appendhere").append(appendjoke);
			$scope.busy = 1;
		}

		if($scope.userInput == "help"){
			var sudohelp = "<span>sudo joke</span><br/><span>sudo blackout</span><br/><span>sudo weather [city]</span><span><br/><span>sudo show menu</span><br/><span>sudo hide menu</span><br/><span>sudo flip [degrees (only digits)]</span><br/>";
			var appendjoke = '<span class="red">w4rm4chn13:</span>'+' '+'<span class="white">You can issue the following commands to the terminal:</span><br>'+sudohelp;
				$("#appendhere").append(appendjoke);
			$scope.busy = 1;
		}

		
		
		else{
			if(!$scope.busy)
			{
				$scope.s1 = "Invalid command. Type 'help' for more info."
				var appenderror = '<span class="red">w4rm4chn13:</span>'+' '+$scope.s1+'<br>';
					$("#appendhere").append(appenderror);
			}
		}

		$scope.busy = 0;
		$scope.userInput= '';
	}
	
});

app.controller("sidemenucontroller", function($scope){
	$scope.logg = function(){
		$(".sidebar").toggleClass("active");
		$(".anim").toggleClass("click");
	}
});

app.controller("newController", function($scope){
	$scope.rating1 = '';
	var x = 0;
	var rating = 0;
	$(".rating > span").hover(function(){
		x = target.attr('class');
		$("#stat").text( x );
	});
	$(".rating").mouseleave(function(){
		if(!rating)
			x=0;
		$("#stat").text( '' );
	});

	$scope.statUpdate = function($event){
		$scope.rating1 = $event.path[0].className;
	}

	$scope.rate = function($event){
		var target = angular.element($event.currentTarget);
		rating = target.attr('class');
		target.css("color", "red");
		$('.'+rating).nextAll("span").css("color", "red");
		$('.'+rating).prevAll("span").css("color", "#000");
		$("#rating").text( "You've rated: "+rating );
		var w = rating*20 + "%";
		$(".progress").width(w);
		$(".cent").text(w);
	}
	
});