package dev.justinmartz.guitartech.services;

import java.util.List;

import dev.justinmartz.guitartech.entities.GuitarPicture;

public interface GuitarPictureService {
	public List<GuitarPicture> findAllByGuitar(int guitarId);
	public GuitarPicture findById(int guitarPictureId);
}
