app.controller("myController", function($scope){
	$scope.name = "Geet Trivedi";
	console.log($scope);
});

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {

            	//console.log(scope.userInput);
            	$(".window").animate({ scrollTop: $("#scr").height() }, 1000);
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });


                event.preventDefault();
            }
            if(event.which === 38) {

            	console.log("up key pressed!");
            	$(".window").animate({ scrollTop: $("#scr").height() }, 1000);
                scope.$apply(function (){
                    console.log(scope);
                    scope.$eval(attrs.myEnter);
                });


                event.preventDefault();
            }
        });
    };
});


app.controller("theader", function($scope, $rootScope){
	
	$rootScope.getFocus = function($event){
		//var target = angular.element($event.currentTarget);
		/*$('input#focushere').attr("autofocus", "true");*/
		/*target.on('click', function(event) { 
			
			console.log('ab aya')
		});*/
	}

	$scope.initHead = function(){
		$(".sidebar").toggleClass("active");
		$(".anim").toggleClass("click");
	//});
	}
});

app.controller("joke", function($scope,$http){
	$scope.busy = 0;
	$scope.toggling = 0;
	$scope.history = [];
	$scope.tellMeaJoke = function(){
$scope.history.push($scope.userInput);
console.log($scope)
//console.log($scope);

		var appendthis = '<span class="console-user">geet</span><span>@</span><span class="red">w4rm4chn13:</span>'+' '+$scope.userInput+'<br>';
		$("#appendhere").append(appendthis);

		if($scope.userInput == "sudo joke"){
			$scope.userInput='';
			$scope.busy = 1;
			$http.get("https://api.chucknorris.io/jokes/random")
			.then(function(response){
				$scope.str = response.data.value;
				$scope.s1 = $scope.str.replace("Chuck Norris", "Lokendra") || $scope.str.replace("chuck norris", "Lokendra") || $scope.str.replace("Chuck Norris'", "Lokendra's");
				console.log($scope.str);
				var appendjoke = '<span class="white">LJG says:</span><br>'+' '+$scope.s1+'<br>';
				$("#appendhere").append(appendjoke);
			
			}, function(error){
				var err = "Error.";
				console.log("response: "+ error)
				$scope.str = err;
				$scope.s1 = $scope.str; //.replace("Chuck Norris", "Lokendra") || $scope.str.replace("chuck norris", "Lokendra") || $scope.str.replace("Chuck Norris'", "Lokendra's");
				console.log($scope.str);
				var appendjoke = '<span class="white">Error!:</span><br>'+' '+$scope.s1+'<br>';
				$("#appendhere").append(appendjoke);
			});
		}
		//http://api.openweathermap.org/data/2.5/weather?q=jaipur&appid=f4ef0931edd7df0498dd3b62d27c0ff6
		if($scope.userInput.indexOf("weather")>-1){
			var cin = ("sudo weather ").length;
			var city = $scope.userInput.slice(cin,$scope.userInput.length);
			console.log(city);
			$scope.userInput = '';
			$scope.busy = 1;
			$http.get("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=f4ef0931edd7df0498dd3b62d27c0ff6&units=metric")
			.then(function(response){
				console.log(response)
				$scope.str = response.data.main.temp;
				$scope.s1 = $scope.str; //.replace("Chuck Norris", "Lokendra") || $scope.str.replace("chuck norris", "Lokendra") || $scope.str.replace("Chuck Norris'", "Lokendra's");
				console.log($scope.str);
				var n = "Temperature in "+response.data.name+": "
				var appendjoke = '<span class="white">'+n+'</span><br>'+' '+$scope.s1+'&deg;C'+'<br>';
				$("#appendhere").append(appendjoke);
			
			}, function(error){
				var err = error.status===-1 ? "CORS issue." : "Error.";
				console.log("response: "+ error)
				$scope.str = err;
				$scope.s1 = $scope.str; //.replace("Chuck Norris", "Lokendra") || $scope.str.replace("chuck norris", "Lokendra") || $scope.str.replace("Chuck Norris'", "Lokendra's");
				console.log($scope.str);
				var appendjoke = '<span class="white">Error!:</span><br>'+' '+$scope.s1+'<br>';
				$("#appendhere").append(appendjoke);
			}
			);
		}


		if($scope.userInput.indexOf("flip")>-1){
			$scope.busy = 1;
			var startIndex = ("sudo flip ").length;
			var endIndex = $scope.userInput.length;
			var degrees = $scope.userInput.slice(startIndex,endIndex);
			console.log("to rotate by: "+Number(degrees)+" degrees");
			console.log(typeof Number(degrees));
			var deg = Number(degrees);
			var c = "rotateY(" +deg+ "deg)";
			$("#scr").css("transform",c);
			var appendjoke = '<span class="white">Rotated by </span><br>'+' '+deg+'<br>';
			$("#appendhere").append(appendjoke);

		}

		if($scope.userInput == "whoami"){
			$scope.busy = 1;
			
			var appendjoke = '<span class="white">You\'re '+'geet</span><br>';
			$("#appendhere").append(appendjoke);

		}


		if($scope.userInput == "sudo joke suna"){
			$scope.userInput = '';
			$scope.busy = 1;
			$http.get("http://tambal.azurewebsites.net/joke/random")
			.then(function(response){
				console.log("response: "+ response)
				$scope.str = response.data;
				$scope.s1 = $scope.str; //.replace("Chuck Norris", "Lokendra") || $scope.str.replace("chuck norris", "Lokendra") || $scope.str.replace("Chuck Norris'", "Lokendra's");
				console.log($scope.str);
				var appendjoke = '<span class="white">Le sun:</span><br>'+' '+$scope.s1+'<br>';
				$("#appendhere").append(appendjoke);
			
			}, function(error){
				var err = error.status===-1 ? "CORS issue." : "error.";
				console.log("response: "+ error)
				$scope.str = err;
				$scope.s1 = $scope.str; //.replace("Chuck Norris", "Lokendra") || $scope.str.replace("chuck norris", "Lokendra") || $scope.str.replace("Chuck Norris'", "Lokendra's");
				console.log($scope.str);
				var appendjoke = '<span class="white">Error!:</span><br>'+' '+$scope.s1+'<br>';
				$("#appendhere").append(appendjoke);
			}
			);
		}
		if($scope.userInput == "sudo vikas"){
			$scope.toggling++;
			var st = $scope.toggling%2==0? ' removed.':' applied.';
			$(".contain").toggleClass("vmc");
			
			var appendjoke = '<span class="red">w4rm4chn13:</span>'+' '+'<span class="white">Vikas effect'+' '+st+'</span><br>';
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
			
			//$(".top-header").show();
			var sudohelp = "<span>sudo joke</span><br/><span>sudo vikas</span><br/><span>sudo weather [city]</span><span><br/><span>sudo show menu</span><br/><span>sudo hide menu</span><br/><span>sudo flip [degrees (only digits)]</span><br/>";
			
			var appendjoke = '<span class="red">w4rm4chn13:</span>'+' '+'<span class="white">You can issue the following commands to the terminal:</span><br>'+sudohelp;
				$("#appendhere").append(appendjoke);
			$scope.busy = 1;
		}
		
		if($scope.userInput == "clr"){
			//$('div[ng-controller="joke"]').text("");
			$("input#focushere").prev().prevAll().remove();
		}
		else{
			if(!$scope.busy){
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
		console.log("hey!");
		//$(".sidemenu").click(function(){
		$(".sidebar").toggleClass("active");
		$(".anim").toggleClass("click");
	//});
	}
});

app.controller("newController", function($scope){
	// $scope.rating = function(){

		$scope.rating1 = '';
	var x = 0;
	var rating = 0;
	//$("#stat").text( x );
	$(".rating > span").hover(function(){
		x = target.attr('class');
		$("#stat").text( x );
		//console.log( target.attr('class') );
	});
	$(".rating").mouseleave(function(){
		if(!rating)
			x=0;
		$("#stat").text( '' );
	});

	$scope.statUpdate = function($event){
		
		//var target1 = angular.element($event.currentTarget);
		$scope.rating1 = $event.path[0].className ;
		console.log($scope.rating1);
		// $scope.rating1;
	}

	$scope.rate = function($event){

		var target = angular.element($event.currentTarget);
		rating = target.attr('class');
		target.css("color", "red");
		$('.'+rating).nextAll("span").css("color", "red");
		//target.css("color", "red");
		$('.'+rating).prevAll("span").css("color", "#000");
		$("#rating").text( "You've rated: "+rating );
		var w = rating*20 + "%";
		//console.log(w+"%");
		$(".progress").width(w);
		$(".cent").text(w);
	}
	

	



	// }
});