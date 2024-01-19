package dev.justinmartz.guitartech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import dev.justinmartz.guitartech.entities.Setup;
import dev.justinmartz.guitartech.repositories.SetupRepository;
import dev.justinmartz.guitartech.repositories.UserRepository;

public class SetupServiceImpl implements SetupService {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private SetupRepository setupRepo;

	@Override
	public List<Setup> findAllSetups() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Setup> findAllByUser(int userId) {
		if (userRepo.existsById(userId)) {
			List<Setup> setups = setupRepo.findByOwner_Id(userId);
			return setups;
		}

		return null;
	}
	
	@Override
	public List<Setup> findAllByUserNotDeleted(int userId) {
		if (userRepo.existsById(userId)) {
			List<Setup> setups = setupRepo.findByOwner_IdAndDeletedFalse(userId);
			return setups;
		}

		return null;
	}

}
