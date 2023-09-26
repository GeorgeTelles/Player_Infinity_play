const songname = document.getElementById("music_name");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const bandname = document.getElementById("band_name");
const cover = document.getElementById("cover");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentprogress = document.getElementById("current-progress")
const progresscontainer = document.getElementById("progress-container")
const shuffleButton = document.getElementById("shuffle");
const repeat = document.getElementById("repeat");
const songtime = document.getElementById("song-time")
const totaltime = document.getElementById("total-time")
const like = document.getElementById("like")
const volume = document.getElementById("volume-bar")


const Candyshop = {
    songname : "Candy Shop",
    artist : "50 Cent",
    file : "Candy_shop",
    liked: false
};

const Smackthat = {
    songname : "Smack That",
    artist : "Akon",
    file : "Smack_That",
    liked: false
};

const Still = {
    songname : "Stil",
    artist : "Snoop Dog",
    file : "Still",
    liked: false
};

const originalplaylist = JSON.parse(localStorage.getItem("playlist")) ?? [Candyshop, Smackthat, Still];
let sortedPlaylist = [...originalplaylist];
let index = 0;

let isPlaying = false;
let isShuffled = false;
let isRepeat = false



function playsong(){
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");
    song.play();
    isPlaying = true;
}

function pausesong(){
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
    play.querySelector(".bi").classList.add("bi-play-circle-fill");
    song.pause();
    isPlaying = false;
}

function playpause(){
    if(isPlaying === true){
        pausesong();
    } 
    else{
        playsong();
    }
}

function Initializesong(){
    cover.src = `assets/img/${sortedPlaylist[index].file}.jpg`;
    song.src = `assets/songs/${sortedPlaylist[index].file}.mp3`;
    songname.innerText = sortedPlaylist[index].songname;
    bandname.innerText = sortedPlaylist[index].artist;
    likefunctionrender();
}

function previoussong(){
    if (index === 0){
        index = sortedPlaylist.length - 1;
    }
    else{
    index -= 1;
    }
    Initializesong();
    playsong();
}

function nextsong(){
    if (index === sortedPlaylist.length - 1){
        index = 0;
    }
    else{
    index += 1;
    }

    Initializesong();
    playsong();
}

function Updateprogress(){
    song.currentTime
    song.duration
    const barWidth = (song.currentTime/song.duration)*100;
    currentprogress.style.setProperty("--progress",`${barWidth}%`)
    songtime.innerText = toHHMMSS(song.currentTime);
}

function jumpto(event){
    const width = progresscontainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumptotime = (clickPosition/width)*song.duration;
    song.currentTime = jumptotime;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    
}

function shufflefunction(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add("button-active");
    }    
    else{
        isShuffled = false;
        sortedPlaylist = [...originalplaylist];
        shuffleButton.classList.remove("button-active");
    }
    }

function repeatfunction(){
    if (isRepeat === false){
        isRepeat = true;

    
    repeat.classList.add("button-active");
    }
    else{
        isRepeat = false;
    repeat.classList.remove("button-active");
    }
}

function NextOrRepeat(){
    if (isRepeat === false){
        nextsong();
    }
    else{
        playsong();
    }
}

function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);
  
    return `${hours.toString().padStart(2, '0')}:${min
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  function updatetotaltime() {
    totaltime.innerText = toHHMMSS(song.duration);
  }

function likefunctionrender(){
    if(sortedPlaylist[index].liked === true){
        like.querySelector(".bi").classList.remove("bi-heart");
        like.querySelector(".bi").classList.add("bi-heart-fill");
        like.classList.add("button-active");
    }    
    else{
        like.querySelector(".bi").classList.remove("bi-heart-fill");
        like.querySelector(".bi").classList.add("bi-heart");
        like.classList.remove("button-active");
    }
}

function likefunction(){
    if(sortedPlaylist[index].liked === false){
        sortedPlaylist[index].liked = true;
    }
    else{
        sortedPlaylist[index].liked = false;
    }
    likefunctionrender();
    localStorage.setItem("playlist", JSON.stringify(originalplaylist));
}

function volumefunction(event){
    const width = volume.clientWidth;
    const clickPosition = event.offsetX;
    const confvolume = (clickPosition/width)*1;
    song.volume = confvolume;
}


Initializesong();

play.addEventListener("click",playpause);
previous.addEventListener("click",previoussong);
next.addEventListener("click",nextsong);
song.addEventListener("timeupdate",Updateprogress);
song.addEventListener("ended",NextOrRepeat);
progresscontainer.addEventListener("click", jumpto);
shuffleButton.addEventListener("click", shufflefunction);
repeat.addEventListener("click", repeatfunction);
song.addEventListener("loadedmetadata", updatetotaltime);
like.addEventListener("click",likefunction);
volume.addEventListener("click",volumefunction);