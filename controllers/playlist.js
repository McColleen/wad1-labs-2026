'use strict';

import logger from '../utils/logger.js';
import playlistStore from '../models/playlist-store.js';

const playlist = {
  createView(request, response) {
    const playlistId = request.params.id;
    logger.debug(`Playlist id = ${playlistId}`);

    const singlePlaylist = playlistStore.getPlaylist(playlistId);
    
    const viewData = {
      title: 'Playlist',
      singlePlaylist,
    };
    response.render('playlist', viewData);
  },
  addSong(request, response) {
    const playlistId = request.params.id;
    const newSong = {
      id: Date.now().toString(),
      title: request.body.title,
      artist: request.body.artist
    };

    if (
      newSong.title && newSong.title.trim().length > 0 &&
      newSong.artist && newSong.artist.trim().length > 0
    ) {
      newSong.title = newSong.title.trim();
      newSong.artist = newSong.artist.trim();
      logger.debug(`Adding Song ${newSong.title} to Playlist ${playlistId}`);
      playlistStore.addSong(playlistId, newSong);
    }

    response.redirect('/playlist/' + playlistId);
  },
  deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song  $(songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId, songId);
    response.redirect('/playlist/' + playlistId);
},
updateSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug("updating song " + songId);
    const updatedSong = {
      id: songId,
      title: request.body.title,
      artist: request.body.artist
    };
    playlistStore.editSong(playlistId, songId, updatedSong);
    response.redirect('/playlist/' + playlistId);
  }
};

export default playlist;



