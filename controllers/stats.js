'use strict';

import logger from '../utils/logger.js';
import playlistStore from '../models/playlist-store.js';

const stats = {
  createView(request, response) {
    logger.info('Stats page loading!');

    const playlists = playlistStore.getAllPlaylists();
    const numPlaylists = playlists.length;
    const numSongs = playlists.reduce((total, playlist) => total + playlist.songs.length, 0);
    const average = numPlaylists > 0 ? (numSongs / numPlaylists).toFixed(2) : 0;

    const totalRating = playlists.reduce(
      (total, playlist) => total + (parseInt(playlist.rating, 10) || 0),
      0
    );
    const avgRating = numPlaylists > 0 ? totalRating / numPlaylists : 0;

    const maxRating = numPlaylists > 0
      ? Math.max(...playlists.map((playlist) => parseInt(playlist.rating, 10) || 0))
      : 0;
    const maxRated = playlists.filter(
      (playlist) => (parseInt(playlist.rating, 10) || 0) === maxRating
    );
    const favTitles = maxRated.map((item) => item.title);

    const statistics = {
      displayNumPlaylists: numPlaylists,
      displayNumSongs: numSongs,
      displayAverage: average,
      displayAvgRating: avgRating.toFixed(2),
      highest: maxRating,
      displayFav: favTitles
    };

    response.render('stats', {
      title: 'Statistics',
      statistics: statistics
    });
  }
};

export default stats;
