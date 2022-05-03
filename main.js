
let Hash = document.querySelector('#event');

let artistsInfo;

let tryOuts = document.querySelector('#value1')

let tracks;
// let getTop5Albums1;
let getTracks2;
let isSmallScreen = false;

home();



//http://api.napster.com/v2.2/search?apikey=Y2ZkODIzYjItYTlhYi00MzFmLWJiY2EtMThmYTRhZDg1ODY3&query=${tryOuts.value}&type=artist
async function home() {


  let Topart = await fetch(`http://api.napster.com/v2.2/artists/top?apikey=Y2ZkODIzYjItYTlhYi00MzFmLWJiY2EtMThmYTRhZDg1ODY3`);

  let Topartist = await Topart.json();

  console.log(Topartist);

  let newArtist = Topartist.artists;

  for (let i in newArtist) {

    let homeArtist = newArtist[i];

    let homeImg = await fetch(`http://api.napster.com/v2.2/albums/${homeArtist.albumGroups.compilations[0]}/images?apikey=Y2ZkODIzYjItYTlhYi00MzFmLWJiY2EtMThmYTRhZDg1ODY3`);

    let homeImg1 = await homeImg.json();

    console.log(homeImg1);

    if (homeImg1.images.length === 0) {

      continue;
    }
    let showTop = $(`<div><p style="color:white;">${homeArtist.name}</p><img class = "rounded-circle" src = "${homeImg1.images[0].url}"></div>`);

    $(`#trackList`).append(showTop);

  }


}


async function Setup() {





  let getId = await fetch(`http://api.napster.com/v2.2/search/verbose?apikey=Y2ZkODIzYjItYTlhYi00MzFmLWJiY2EtMThmYTRhZDg1ODY3&per_type_limit=10&query=${tryOuts.value}&type=track`);

  let getID = await getId.json();

  let ArtistBio1 = await fetch(`http://api.napster.com/v2.2/search?apikey=Y2ZkODIzYjItYTlhYi00MzFmLWJiY2EtMThmYTRhZDg1ODY3&query=${getID.search.data.tracks[0].artistName}&type=artist`);

  let ArtistBio = await ArtistBio1.json();

  console.log(ArtistBio);

  if (ArtistBio.search.data.artists[0].bios !== undefined) {

    let artistsInfo = ArtistBio.search.data.artists[0].bios[0].bio;

    console.log(artistsInfo, '1');





    let artistTracks = await fetch(`http://api.napster.com/v2.2/artists/${ArtistBio.search.data.artists[0].id}/tracks/top?apikey=Y2ZkODIzYjItYTlhYi00MzFmLWJiY2EtMThmYTRhZDg1ODY3`);

    let getTracks = await artistTracks.json();

    console.log(getTracks);

    let getTracks1 = getTracks.tracks;

    for (let i in getTracks1) {
      getTracks2 = getTracks1[i];

      let albumImg = await fetch(`http://api.napster.com/v2.2/albums/${getTracks2.albumId}/images?apikey=Y2ZkODIzYjItYTlhYi00MzFmLWJiY2EtMThmYTRhZDg1ODY3`)

      let albumimg1 = await albumImg.json();

      tracks = $(`<div class = "tracks"><p>${getTracks2.name}</p><audio id="player${i}" src="${getTracks2.previewURL}"></audio><img  onclick="document.getElementById('player${i}').play()"  class = "rounded-circle" src = "${albumimg1.images[0].url}" width = "150" height = "200"></div>`);

      $(`#trackList`).append(tracks);
    }



    let artistsInfoDeploy = artistsInfo;

    $(`#artbio`).append(artistsInfoDeploy);


  } else {
    let artistTracks = await fetch(`http://api.napster.com/v2.2/artists/${ArtistBio.search.data.artists[0].id}/tracks/top?apikey=Y2ZkODIzYjItYTlhYi00MzFmLWJiY2EtMThmYTRhZDg1ODY3`);

    let getTracks = await artistTracks.json();

    console.log(getTracks);

    let getTracks1 = getTracks.tracks;

    for (let i in getTracks1) {
      getTracks2 = getTracks1[i];

      let albumImg = await fetch(`http://api.napster.com/v2.2/albums/${getTracks2.albumId}/images?apikey=Y2ZkODIzYjItYTlhYi00MzFmLWJiY2EtMThmYTRhZDg1ODY3`)

      let albumimg1 = await albumImg.json();

      let tracks = $(`<div class = "tracks"><p style="color:white;">${getTracks2.name}</p><audio id="player${i}" src="${getTracks2.previewURL}"></audio><img onclick="document.getElementById('player${i}').play()"  class = "rounded-circle" src = "${albumimg1.images[0].url}" width = "150" height = "200"></div>`);
      $(`#trackList`).append(tracks);
    }



    let artistsInfoDeploy = artistsInfo;

    $(`#artbio`).innerHTML(artistsInfoDeploy);
  }
}

Hash.addEventListener('click', function() {

  if (tracks === undefined) {

    $(`#trackList`).empty();

    Setup();

  } else {

    document.getElementById('artbio').innerHTML = "";

    $(`#trackList`).empty();

    $(`.tracks`).remove();

    Setup();
  }
});
