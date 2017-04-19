app.controller("theader", function($scope){
	$scope.initHead = function(){
		$(".sidebar").toggleClass("active");
		$(".anim").toggleClass("click");
	}
});

app.controller("terminalController", function($scope,$http, jokeAPI, weatherAPI, $rootScope, quoteAPI){
	$scope.UP = 0;
	$scope.busy = 0;
	$scope.menu = 0;
	$scope.toggling = 0;
	$scope.history = [];
	$scope.historyLength = $scope.history.length;

	$scope.scdown = function(){
		$(".window").animate({ scrollTop: $("#appendhere").height() }, 1000);
	}

	$scope.processInput = function()
	{
		if($scope.userInput == 'sudo joke'){
			$scope.busy=1;
			jokeAPI.getData();
		}
		if($scope.userInput == 'sudo quote'){
			$scope.busy=1;
			quoteAPI.getData();
		}
		if($scope.userInput!='')
			$scope.history.push($scope.userInput);
		if($scope.userInput === undefined)
			$scope.userInput = '';
		var appendthis = '<span class="console-user">geet</span><span>@</span><span class="red">w4rm4chn13:</span>'+' '+$scope.userInput+'<br>';
		$("#appendhere").append(appendthis);
		if($scope.userInput.indexOf("weather")>-1){
			var cin = ("sudo weather ").length;
			$rootScope.city = $scope.userInput.slice(cin,$scope.userInput.length);
			$scope.userInput = '';
			$scope.busy = 1;
			weatherAPI.getData();
		}
		if($scope.userInput.indexOf("bg-url")>-1){
			$scope.busy = 1;
			var urlLength = ("sudo bg-url ").length;
			var bg = 'url("'+$scope.userInput.slice(urlLength,$scope.userInput.length)+'")';
			$(".bg").css("background",bg);
			$scope.userInput = '';
			var appendThis = '<span class="white">Custom wallpaper url accepted.</span><br>';
			$("#appendhere").append(appendThis);
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
		if($scope.userInput.indexOf("skew")>-1){
			$scope.busy = 1;
			if($scope.userInput.indexOf("-x")>-1){
				var startIndex = ("sudo skewx ").length;
				var endIndex = $scope.userInput.length;
				var degrees = $scope.userInput.slice(startIndex,endIndex);
				var deg = Number(degrees);
				var c = "skewX(" +deg+ "deg)";
				$("#scr").css("transform",c);
				var appendThis = '<span class="white">Skewed on X by </span><br>'+' '+deg+' degrees.<br>';
				$("#appendhere").append(appendThis);
			}
			if($scope.userInput.indexOf("-y")>-1){
				var startIndex = ("sudo skewx ").length;
				var endIndex = $scope.userInput.length;
				var degrees = $scope.userInput.slice(startIndex,endIndex);
				var deg = Number(degrees);
				var c = "skewY(" +deg+ "deg)";
				$("#scr").css("transform",c);
				var appendThis = '<span class="white">Skewed on Y by </span><br>'+' '+deg+' degrees.<br>';
				$("#appendhere").append(appendThis);
			}
		}
		if($scope.userInput == "whoami"){
			$scope.busy = 1;
			var appendId = '<span class="white">You\'re '+'Geet.</span><br>';
			$("#appendhere").append(appendId);
		}
		var bg = [
			"http://s1.picswalls.com/wallpapers/2015/09/20/beautiful-hd-wallpaper-2015_111526537_269.jpg",
			"https://s-media-cache-ak0.pinimg.com/originals/25/b7/f3/25b7f3b7fb56e6d0f457a1f02eb88782.jpg",
			"https://wallpprs.media/preview/negative-space_wallpprs.com_.jpg",
			"http://www.hdwallpapers.in/walls/amanda_seyfried_7-wide.jpg",
			"http://wallpaperclicker.com/storage/wallpaper/Beautiful-American-Hollywood-Actress-Anne-Hathaway-in-Blue-Dress-on-Sofa-HD-Photos-80766344.jpg",
			"http://wallpapercave.com/wp/AUMdHwh.jpg",
			"/images/bg.jpg",
			"https://images.unsplash.com/photo-1464983953574-0892a716854b?dpr=1&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=&bg=",
			"https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?dpr=1&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=&bg=",
			"https://images.unsplash.com/photo-1432866589724-ad10bb528bfa?dpr=1&auto=format&fit=crop&w=1080&h=719&q=80&cs=tinysrgb&crop=&bg=",
			"https://images.unsplash.com/photo-1484627147104-f5197bcd6651?dpr=1&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=&bg="
		];
		if($scope.userInput == 'sudo slideshow'){
			$scope.busy=1;
			console.log(bg)
			var rnd1;
			setInterval(function(){
				rnd1 = Math.floor((Math.random() * bg.length) + 1);
				if(rnd1 == bg.length)
					rnd1 = 0;
				$('.bg').css('background', 'url('+bg[rnd1]+')');	
			}, 2000);
			
			var appendId = '<span class="white">Slideshow initiated.</span><br>';
			$("#appendhere").append(appendId);
		}
		if($scope.userInput == "sudo change bg"){
			$scope.busy = 1;
			var rnd = Math.floor((Math.random() * bg.length) + 1);
			if(rnd == bg.length)
				rnd = 0;
			$('.bg').css('background', 'url('+bg[rnd]+')');
			var appendId = '<span class="white">Background changed.</span><br>';
			$("#appendhere").append(appendId);
		}
		if($scope.userInput == "sudo blackout"){
			$scope.toggling++;
			var st = $scope.toggling%2==0? ' removed.':' applied.';
			$(".contain").toggleClass("vmc");
			var appendStat = '<span class="red">w4rm4chn13:</span>'+' '+'<span class="white">Blackout'+' '+st+'</span><br>';
				$("#appendhere").append(appendStat);
			$scope.busy = 1;
		}
		if($scope.userInput == 'sudo toggle menu'){
			$scope.busy = 1;
			var toggle = $scope.menu%2;
			var status = toggle?'shown':'hidden';
			if(toggle)
				$(".top-header").show();
			else
				$(".top-header").hide();
			var appendStat = '<span class="red">w4rm4chn13:</span>'+' '+'<span class="white">Menu is now'+' '+status+'.</span><br>';
			$("#appendhere").append(appendStat);
			$scope.menu++;
		}
		if($scope.userInput == "help"){
			var sudohelp = "<span>sudo joke</span><br/><span>sudo bg-url [url]</span><br/><span>sudo change bg</span><br/><span>sudo quote</span><br/><span>sudo toggle menu</span><br/><span>sudo blackout</span><br/><span>sudo weather [city]</span><span><br/><span>sudo flip [degrees (only digits)]</span><br/><span>sudo skew-x [degrees (only digits)]</span><br/><span>sudo skew-y [degrees (only digits)]</span><br/>";
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
		$scope.scdown();
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

app.controller("myController", function($scope){
	$scope.name = 'Geet'
});