package dev.justinmartz.guitartech.services;

import java.util.List;

import dev.justinmartz.guitartech.entities.Guitar;

public interface GuitarService {
	public Guitar findGuitar(int id);
	public List<Guitar> findAllGuitars();
	public List<Guitar> findAllByUser(int userId);
	public List<Guitar> findAllByUserNotDeleted(int userId);
	public List<Guitar> findAllByTuning(int tuningId);
	public List<Guitar> findAllByBridge(String bridge);
	public List<Guitar> findAllByColor(String color);
	public Guitar createNewGuitar(Guitar guitar, String username);
	public Guitar updateGuitar(int guitarId, Guitar guitar, String username);
	public boolean deleteGuitar(int guitarId, String username);
}
