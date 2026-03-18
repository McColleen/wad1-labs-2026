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
};

export default playlist;



