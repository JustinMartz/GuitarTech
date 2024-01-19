package dev.justinmartz.guitartech.services;

import java.util.List;
import dev.justinmartz.guitartech.entities.Setup;

public interface SetupService {
	public List<Setup> findAllSetups();
	public List<Setup> findAllByUser(int userId);
	public List<Setup> findAllByUserNotDeleted(int userId);
}
