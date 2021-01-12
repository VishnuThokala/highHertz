let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let  seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Ayyappanum Koshiyum",
    artist: "Sangeethaa , Jakes Bejoy & Nanjamma",
    image: "https://images.hungama.com/c/1/1e8/e47/52502419/52502419_300x300.jpg",
    path: "https://firebasestorage.googleapis.com/v0/b/myproject-e3ab0.appspot.com/o/Thalam%20Poyi.mp3?alt=media&token=38bd42dd-66cb-49a7-9ead-55c1b991e76a"

  },

  {
    name: "Night Owl",
    artist: "Broke For Free",
        image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",

  },
  
  {
    name: "Master",
    artist: "Anirudh Ravichander",
      image: "https://images.hungama.com/c/1/1e8/e47/52502419/52502419_300x300.jpg",
      path: "https://firebasestorage.googleapis.com/v0/b/myproject-e3ab0.appspot.com/o/Vaathi%20Coming.In.mp3?alt=media&token=ef928577-9f74-4882-acdf-73ff7a484c16"

  },
  {
    name: "Emai Poyave",
    artist: "Sid Sriram",
    image: "https://a10.gaanacdn.com/images/albums/93/2273393/crop_480x480_1544451750_2273393.jpg",
    path: "https://firebasestorage.googleapis.com/v0/b/myproject-e3ab0.appspot.com/o/Emai%20Poyave.mp3?alt=media&token=5753cbba-e75a-45c2-abc9-65cff9076484"

  },
  {
    name: "Malang",
    artist: "Ved Sharma",
    image: "https://a10.gaanacdn.com/gn_img/albums/P7m3GvNKqx/7m3G0pzRWq/size_xxl_1584109422.webp",
    path: "https://firebasestorage.googleapis.com/v0/b/myproject-e3ab0.appspot.com/o/Malang.mp3?alt=media&token=46ea7a25-c3aa-44e9-b3e4-5a532b1bba4b"

  },
  
  {
    name: "Chellemma",
    artist: "Anirudh Ravichandar",
    image: "https://masstamilan.audio/wp-content/uploads/2020/07/Chellamma-song.jpg",
    path: "https://firebasestorage.googleapis.com/v0/b/myproject-e3ab0.appspot.com/o/Chellamma.mp3?alt=media&token=038768f2-653f-4a88-97c0-4e20d562f239"

  },
  {
    name: "Tare Ginn",
    artist: " A.R. Rahman",
    image: "https://media.santabanta.com/newsite/cinemascope/feed/dil-bechara3.jpg",
    path: "https://firebasestorage.googleapis.com/v0/b/myproject-e3ab0.appspot.com/o/Taare%20Ginn.mp3?alt=media&token=63e7cd0e-e85f-47d8-8748-2e392713e58f"

  },
  {
    name: "Dheera Dheera",
    artist: "Ravi Basrur",
    image: "https://www.deccanherald.com/sites/dh/files/articleimages/2020/07/01/Yash-1593586320.jpg",
    path: "https://firebasestorage.googleapis.com/v0/b/myproject-e3ab0.appspot.com/o/Dheera%20Dheera.mp3?alt=media&token=b997747b-638d-4db2-bd3f-5b283cabb120"

  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
  },
  {
    name: "Theri Mitti",
    artist: " B Praak ",
    image: "https://a10.gaanacdn.com/gn_img/albums/01A3mrWNQX/1A3mJkGnWN/size_m_1552901436.jpg",
    path: "  https://firebasestorage.googleapis.com/v0/b/myproject-e3ab0.appspot.com/o/Teri-Mitti-b-Kesari.mp3?alt=media&token=83dae832-398c-4c4c-aec3-d0016982c748"

  },
  {
    name: "Sher Aaya Sher",
    artist: "‎Divine ",
    image: "https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/gully-boy.jpg?itok=CvmBTha5",
    path: "https://firebasestorage.googleapis.com/v0/b/myproject-e3ab0.appspot.com/o/Sher-Aaya-Sher.mp3?alt=media&token=f16828b9-0ccb-49f0-92b6-add17d6e62f4"

  },
  
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
