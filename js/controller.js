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

app.factory("jokeApi", function($http){
  var apiurl = "https://api.chucknorris.io/jokes/random";
  return {
    getData: function(){
      $http.get(apiurl)
      .then(function(response){
		$("#appendhere").append(""+response.data.value+"<br>");
      }, function(error){
				console.log(error);
				var appendError = '<span class="white">Error!</span><br>';
				$("#appendhere").append(appendError);
			});    
    }  
  };
});

app.controller("terminalController", function($scope,$http, jokeApi, $rootScope){
	$scope.UP = 0;
	$scope.busy = 0;
	$scope.toggling = 0;
	$scope.history = [];
	$scope.historyLength = $scope.history.length;
	$scope.processInput = function()
	{

		if($scope.userInput == undefined){
			//to be handled.
		}

		if($scope.userInput == 'sudo joke'){
			$scope.busy=1;
			jokeApi.getData();
		}

		if($scope.userInput!='')
			$scope.history.push($scope.userInput);

		var appendthis = '<span class="console-user">geet</span><span>@</span><span class="red">w4rm4chn13:</span>'+' '+$scope.userInput+'<br>';
		$("#appendhere").append(appendthis);

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
				var appendWeather = '<span class="white">Error!:</span><br>'+' '+$scope.s1+'<br>';
				$("#appendhere").append(appendWeather);
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
			var appendThis = '<span class="white">Rotated by </span><br>'+' '+deg+'<br>';
			$("#appendhere").append(appendThis);

		}

		if($scope.userInput == "whoami"){
			$scope.busy = 1;
			
			var appendId = '<span class="white">You\'re '+'Geet.</span><br>';
			$("#appendhere").append(appendId);

		}

		if($scope.userInput == "sudo geet"){
			$scope.busy = 1;
            var part1 = "G E e T";                                  
            var part2 = "G e e T";                                  
            var part3 = "G e E t";                                  
            var part4 = "g E E t";                                  
            var part5 = "g e e t";                                  
            var part6 = "g E E T";                                  
            var part7 = "G e e t";                                  
            var part8 = "g e E T";                                  
            var part9 = "G E E T";                                  
			var parts = [part1,part2,part3,part4,part5,part6,part7,part8,part9];
			var i = 0;
			var appendId = '<span class="white">Here we go.</span><br><div class="parentanim"><span class="sudoGeet"></span></div>';
			$("#appendhere").append(appendId);
			$(".parentanim").css("height", "13px").css("overflow", "hidden")
			setInterval(function(){
				if(i== parts.length){i=0;}
				$(".sudoGeet").append(parts[i]+"<br>");
				setTimeout(function(){ $(".sudoGeet").empty(); }, 300);
				i++;
			}, 500);
			
			/*var appendId = '<span class="white">You\'re '+'Geet.</span><br>';
			$("#appendhere").append(appendId);*/

		}

		if($scope.userInput == "sudo blackout"){
			$scope.toggling++;
			var st = $scope.toggling%2==0? ' removed.':' applied.';
			$(".contain").toggleClass("vmc");
			
			var appendStat = '<span class="red">w4rm4chn13:</span>'+' '+'<span class="white">Blackout'+' '+st+'</span><br>';
				$("#appendhere").append(appendStat);
			$scope.busy = 1;
		}
		if($scope.userInput == "sudo hide menu"){
			
			$(".top-header").hide();
			
			var appendStat = '<span class="red">w4rm4chn13:</span>'+' '+'<span class="white">Top header is now hidden.</span><br>';
				$("#appendhere").append(appendStat);
			$scope.busy = 1;
		}
		if($scope.userInput == "sudo show menu"){
			
			$(".top-header").show();
			
			var appendStat = '<span class="red">w4rm4chn13:</span>'+' '+'<span class="white">Top header is now visible.</span><br>';
				$("#appendhere").append(appendStat);
			$scope.busy = 1;
		}

		if($scope.userInput == "help"){
			var sudohelp = "<span>sudo joke</span><br/><span>sudo blackout</span><br/><span>sudo weather [city]</span><span><br/><span>sudo show menu</span><br/><span>sudo hide menu</span><br/><span>sudo flip [degrees (only digits)]</span><br/>";
			var appendStat = '<span class="red">w4rm4chn13:</span>'+' '+'<span class="white">You can issue the following commands to the terminal:</span><br>'+sudohelp;
				$("#appendhere").append(appendStat);
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