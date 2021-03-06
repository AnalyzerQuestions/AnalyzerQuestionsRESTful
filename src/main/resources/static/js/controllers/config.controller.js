aqtApp.controller("configController", function($scope, aqtConfig, questionService, userService, growl) {

	$scope.config = {};
	$scope.clicked = {};
	var isUpdated = false;
	var isClicked = false;
	var previusMotive = "";

	$scope.suggestions = [];
	$scope.suggestion = {};
	var previusSuggestion = {};
	
	/**
	 * 
	 */
	aqtConfig.getConfig().then(function(response) {
		$scope.config = response.data;
	});

	/**
	 * 
	 */
	$scope.openModal = function(motive, isUp, isCli) {
		isUpdated = isUp;
		isClicked = isCli;
		if (isUp) {
			previusMotive = motive;
			$scope.clicked.motive = motive;
		} else {
			reset();
		}
	};

	/**
	 * 
	 */
	$scope.saveMotive = function() {
		if(isClicked){
			if (!isUpdated) {
				saveMotiveClicked($scope.clicked.motive);
			} else {
				updateMotiveClicked($scope.clicked.motive);
			}
		}else{
			if (!isUpdated) {
				saveMotiveChosen($scope.clicked.motive);
			} else {
				updateMotiveChosen($scope.clicked.motive);
			}
		}
		reset();
	};
	
	/**
	 * 
	 */
	var saveMotiveClicked = function(motive){
		if(!$scope.config.optionsQuestionsClicked) {
			$scope.config.optionsQuestionsClicked = [];
		}
		$scope.config.optionsQuestionsClicked.push(motive);
		$('#optionModal').modal('hide');
	};

	/**
	 * 
	 */
	$scope.removeMotiveClicked = function(motive) {
		var index = $scope.config.optionsQuestionsClicked.indexOf(motive);
		$scope.config.optionsQuestionsClicked.splice(index, 1);
	};

	/**
	 * 
	 */
	var updateMotiveClicked = function(motive) {
		var index = $scope.config.optionsQuestionsClicked.indexOf(previusMotive);
		$scope.config.optionsQuestionsClicked[index] = motive;
		$('#optionModal').modal('hide');
	};
	
	/**
	 * 
	 */
	var saveMotiveChosen = function(motive){
		if(!$scope.config.optionsQuestionsChosen) {
			$scope.config.optionsQuestionsChosen = [];
		}
		$scope.config.optionsQuestionsChosen.push(motive);
		$('#optionModal').modal('hide');
	};
	
	/**
	 * 
	 */
	$scope.removeMotiveChosen = function(motive) {
		var index = $scope.config.optionsQuestionsChosen.indexOf(motive);
		$scope.config.optionsQuestionsChosen.splice(index, 1);

	};
	
	/**
	 * 
	 */
	var updateMotiveChosen= function(motive) {
		var index = $scope.config.optionsQuestionsChosen.indexOf(previusMotive);
		$scope.config.optionsQuestionsChosen[index] = motive;
		$('#optionModal').modal('hide');
	};

	/**
	 * 
	 */
	$scope.update = function() {
		aqtConfig.updateTime($scope.config).then(function(response) {
			$scope.config = response.data;
			growl.success("Configurações salvas");
			reset();
		});
	};
	
	/**
	 * 
	 */
	var getSuggestions = function() {
		aqtConfig.getSuggestions().then(function(response) {
			$scope.suggestions = response.data;
		});
	};
	/**
	 * 
	 */
	$scope.saveSuggestion = function(){
		aqtConfig.removeAllSuggestions();
		
		aqtConfig.generateSuggestions().forEach(function(sug) {
			aqtConfig.saveSuggestion(sug).then(function(response){
				getSuggestions();
			});
		})
	};
	
	/**
	 * 
	 */
	$scope.openModalSuggestion = function(suggestion){
		$scope.suggestion = suggestion;
		previusSuggestion = suggestion;
		
	};
	
	/**
	 * 
	 */
	$scope.updateSuggestion = function(){
		aqtConfig.updateSuggestion($scope.suggestion).then(function(response){
			$('#suggestionModal').modal('hide');
		});
	};
	
	/**
	 * 
	 */
	var reset = function() {
		$scope.clicked = angular.copy($scope.clicked = {});
		motive = "";
		isUpdated = false;
	};
	
	getSuggestions();
});