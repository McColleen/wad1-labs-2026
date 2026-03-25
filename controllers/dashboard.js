'use strict';

import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");

    const searchTerm = request.query.searchTerm || "";

    const playlists = searchTerm
      ? playlistStore.searchPlaylist(searchTerm)
      : playlistStore.getAllPlaylists();

    const viewData = {
      title: "Playlist App Dashboard",
      playlists: playlists,
      search: searchTerm
    };

    logger.debug(viewData.playlists);

    response.render("dashboard", viewData);
  },
  addPlaylist(request, response) {
    const timestamp = new Date();
    const parsedRating = parseInt(request.body.rating, 10);
    const safeRating = Number.isNaN(parsedRating) ? 1 : Math.min(5, Math.max(1, parsedRating));

    const newPlaylist = {
      id: Date.now().toString(),
      title: request.body.title,
      date: timestamp,
      rating: safeRating,
      songs: []
    };

    if (newPlaylist.title && newPlaylist.title.trim().length > 0) {
      newPlaylist.title = newPlaylist.title.trim();
      logger.debug(`Creating a new Playlist ${newPlaylist.title}`);
      playlistStore.addPlaylist(newPlaylist);
    }

    response.redirect('/dashboard');
  },
  deletePlaylist(request, response) {
    const playlistId = request.params.id;
    logger.debug(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect("/dashboard");
  },

};

export default dashboard;


