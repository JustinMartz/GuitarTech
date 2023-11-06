package dev.justinmartz.guitartech.services;

import java.util.List;

import dev.justinmartz.guitartech.entities.GuitarPicture;

public interface GuitarPictureService {
	public List<GuitarPicture> findAllByGuitarAndOwner(int guitarId, String username);
	public GuitarPicture findById(int guitarPictureId);
}
