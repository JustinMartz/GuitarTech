package dev.justinmartz.guitartech.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.justinmartz.guitartech.entities.Guitar;
import dev.justinmartz.guitartech.entities.Setup;
import dev.justinmartz.guitartech.repositories.GuitarRepository;
import dev.justinmartz.guitartech.repositories.SetupRepository;
import dev.justinmartz.guitartech.repositories.TuningRepository;
import dev.justinmartz.guitartech.repositories.UserRepository;

@Service
public class SetupServiceImpl implements SetupService {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private SetupRepository setupRepo;
	
	@Autowired
	private GuitarRepository guitarRepo;
	
	@Autowired
	private TuningRepository tuningRepo;

	@Override
	public List<Setup> findAllSetups() {
		// TODO Auto-generated method stub
		return null;
	}

//	@Override
//	public List<Setup> findAllByUser(int userId) {
//		if (userRepo.existsById(userId)) {
//			List<Setup> setups = setupRepo.findByOwner_Id(userId);
//			return setups;
//		}
//
//		return null;
//	}
	
	@Override
	public List<Setup> findAllByUserNotDeleted(int userId) {
		if (userRepo.existsById(userId)) {
			List<Setup> setups = setupRepo.findByDeletedFalseAndGuitar_Owner_Id(userId);
			return setups;
		}

		return null;
	}

	@Override
	public Setup createNewSetup(Setup setup, String username) {
		if (setup != null && !setupRepo.existsById(setup.getId())) {
			if (setup.getGuitar() == null) {
				return null;
			}
			
			if (!guitarRepo.existsById(setup.getGuitar().getId())) {
				return null;
			} else {
				Optional<Guitar> guitarOpt = guitarRepo.findById(setup.getGuitar().getId());
				Guitar guitar = guitarOpt.get();
				if (username.equals(guitar.getOwner().getUsername())) {
					// if username creating setup for guitar actually owns the guitar
					setup.setGuitar(guitar);
				} else {
					// then username must not own the guitar
					return null;
				}
			}
			
			if (setup.getTuning() == null) {
				return null;
			}
			
			setup.setDeleted(false);
			
			return setupRepo.saveAndFlush(setup);
		}
		
		return null;
	}

	@Override
	public List<Setup> findAllSorted(int userId) {
		if (userRepo.existsById(userId)) {
			List<Setup> setups = setupRepo.findByDeletedFalseAndGuitar_Owner_IdOrderByDateOfSetupDesc(userId);
			return setups;
		}
		
		return null;
	}

	@Override
	public List<Setup> findByTuningAndUser(int tuningId, int userId) {
		System.out.println("*** Getting passed tuningId: " + tuningId);
		// only return guitars owned by user
		// TODO: need to do this for color too
		if (userRepo.existsById(userId)) {
			if (tuningRepo.existsById(tuningId)) {
				List<Setup> setups = setupRepo.findByTuning_IdAndGuitar_Owner_Id(tuningId, userId);
				return setups;
			} else {
				System.out.println("*** Setup with tuning " + tuningId + " not found :(");
			}
			
		}
		
		return null;
	}

}
