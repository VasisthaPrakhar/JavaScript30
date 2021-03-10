/* get our Elements */
const player =document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const screenButton = player.querySelector('.screen_button');
const icon = document.querySelector('.fas fa-expand-arrows-alt');

/* Build out functions */
function togglePlay(){
	const method = video.paused ? 'play' : 'pause';
	// if(video.paused){
	// 	video.play();
	// }else{
	// 	video.pause();
	// }
	video[method]();

}
function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
	console.log('Update the Button');

}
function handleRange(){
	video[this.name] = this.value;
}

function skip() {
	console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}
function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
	console.log(e);
}

function update(){
	// icon.classList.toggle("fas fa-compress");
	if (screenButton.innerHTML === `<i class="fas fa-compress"></i>`){
		screenButton.innerHTML = `<i class="fas fa-expand-arrows-alt"></i>`
		full();
	}else{
	screenButton.innerHTML = `<i class="fas fa-compress"></i>`;
	full();
	}
	console.log(screenButton);
}

function full(){
	player.classList.toggle("playerFull");
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

screenButton.addEventListener('click', update);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(button => button.addEventListener('change', handleRange));
ranges.forEach(button => button.addEventListener('mousemove', handleRange));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown=true);
progress.addEventListener('mouseup', () => mousedown=false);

