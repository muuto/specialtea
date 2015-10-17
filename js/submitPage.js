function dispTitleTextarea(){
	var title  = document.fm.title.value;
	return title;
}

function dispHashTextarea(){
	var hash  = document.fm.hash.value;
	return hash;
}

function dispSolTextarea(){
	var sol  = document.fm.sol.value;
	return sol;
}

function submit(){
	var title = dispTitleTextarea();
	var hash = dispHashTextarea();
	var sol = dispSolTextarea();
}


