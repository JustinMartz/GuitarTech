package dev.justinmartz.guitartech.services;

import java.util.List;

import dev.justinmartz.guitartech.entities.Guitar;

public interface GuitarService {
	public Guitar findGuitar(int id);
	public List<Guitar> findAllGuitars();
	public List<Guitar> findAllByTuning(int tuningId);
	public List<Guitar> findAllByBridge(String bridge);
	public List<Guitar> findAllByColor(String color);
	public Guitar createNewGuitar(Guitar guitar);
	public Guitar updateGuitar(int guitarId, Guitar guitar);
	public boolean deleteGuitar(int guitarId);
}
