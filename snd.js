
// var bg = new Audio()
// bg.src = './snd/bg.mp3';
// bg.loop = 'true';

const sounds = ['la','ti', 'do','re','mi','fa','sol', //0-6
                'tbeat1', 'tbeat2', 'tbeat3', 'tbeat4', 'tbeat5', //7-11
                'totem1', 'totem2', 'totem3', 'totem4', 'totem5', //12-16
                'start', 'walk', 'win']; //17
                let buffers = [];

//to call sound by name if feeling lazy
function selectSound(x)
{
    for(let i = 0; i < sounds.length; i++ )
    { 
        if(sounds[i] == x)
        {
            loadSnd(i);
            playSnd(i);
        }
    }
}

function loadSnd(index) {
    const request = new XMLHttpRequest();
    request.open("GET", `./snd/${sounds[index]}.mp3`);
    request.responseType = "arraybuffer";
    request.onload = function() {
    let undecodedAudio = request.response;
    audioCtx.decodeAudioData(undecodedAudio, (data) => buffers[index] = data);
    };
    request.send();
};

function playSnd(index) {
    const source = audioCtx.createBufferSource();
    source.buffer = buffers[index];
    source.connect(audioCtx.destination);
    source.start(audioCtx.currentTime); // play the source immediately
};

var bgbuff = null;

const loadBg = () => {
	const request = new XMLHttpRequest();
	request.open("GET", "./snd/bg.mp3");
	request.responseType = "arraybuffer";
	request.onload = function() {
	let undecodedAudio = request.response;
	audioCtx.decodeAudioData(undecodedAudio, (data) => bgbuff = data);
	};
	request.send();
};

const playBg = () => {
	bg.buffer = bgbuff;
	bg.loop=true;
	bg.connect(audioCtx.destination);
	bg.start(audioCtx.currentTime); // play the source immediately
};