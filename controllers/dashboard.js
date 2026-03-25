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

    const sortField = request.query.sort;
    const order = request.query.order === "desc" ? -1 : 1;

    let sorted = playlists;

    if (sortField) {
      sorted = playlists.slice().sort((a, b) => {
        if (sortField === "title") {
          return a.title.localeCompare(b.title) * order;
        }

        if (sortField === "rating") {
          return (a.rating - b.rating) * order;
        }

        return 0;
      });
    }

    const viewData = {
      title: "Playlist App Dashboard",
      playlists: sortField ? sorted : playlists,
      search: searchTerm,
      titleSelected: request.query.sort === "title",
      ratingSelected: request.query.sort === "rating",
      ascSelected: request.query.order === "asc",
      descSelected: request.query.order === "desc",
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


