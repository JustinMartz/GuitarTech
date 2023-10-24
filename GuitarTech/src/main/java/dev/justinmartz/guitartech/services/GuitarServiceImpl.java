package dev.justinmartz.guitartech.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.justinmartz.guitartech.entities.Guitar;
import dev.justinmartz.guitartech.entities.Setup;
import dev.justinmartz.guitartech.entities.Tuning;
import dev.justinmartz.guitartech.repositories.GuitarRepository;
import dev.justinmartz.guitartech.repositories.SetupRepository;
import dev.justinmartz.guitartech.repositories.TuningRepository;
import dev.justinmartz.guitartech.repositories.UserRepository;

@Service
public class GuitarServiceImpl implements GuitarService {

	@Autowired
	private GuitarRepository guitarRepo;
	
	@Autowired
	private SetupRepository setupRepo;
	
	@Autowired
	private TuningRepository tuningRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public Guitar findGuitar(int id) {
		Guitar guitar = null;
		Optional<Guitar> guitarOpt = guitarRepo.findById(id);
		
		if (guitarOpt.isPresent()) {
			guitar = guitarOpt.get();
		}
		
		return guitar;
	}

	@Override
	public List<Guitar> findAllGuitars() {
		return guitarRepo.findAll();
	}

	@Override
	public List<Guitar> findAllByTuning(int tuningId) {
		System.out.println("*** Getting passed tuningId: " + tuningId);
		
		// needs to be: if tuning exists by id, not guitar
		if (tuningRepo.existsById(tuningId)) {
			System.out.println("*** Tuning " + tuningId + " exists!");
			List<Guitar> guitars = guitarRepo.findByTuning_Id(tuningId);
			for (Guitar g : guitars)
				System.out.println("*** " + g.getMake() + " " + g.getModel());
			return guitars;
		} else {
			System.out.println("*** Guitar with tuning " + tuningId + " not found :(");
		}
		
		return null;
	}

	@Override
	public List<Guitar> findAllByBridge(String bridge) {
		if (bridge != null) {
			bridge = "%" + bridge + "%";
			return guitarRepo.findByBridgeLike(bridge);
		}
		
		return null;
	}

	@Override
	public List<Guitar> findAllByColor(String color) {
		if (color != null) {
			color = "%" + color + "%";
			return guitarRepo.findByColorLike(color);
		}
		
		return null;
	}

	@Override
	public Guitar createNewGuitar(Guitar guitar) {
		System.out.println("**********************************");
		System.out.println(guitar);
		if (guitar != null && !guitarRepo.existsById(guitar.getId())) {
			if (guitar.getMake().equals("") || guitar.getMake() == null) {
				return null;
			}
			
			if (guitar.getModel().equals("") || guitar.getModel() == null) {
				return null;
			}
			
			if (guitar.getTuning() == null) {
				// FIXME use tuningRepo to pull existing tuning entity
				Tuning tuning = new Tuning();
				tuning.setId(1);
				tuning.setName("E Standard");
				guitar.setTuning(tuning);
			}
			
			if (guitar.getCurrency() == null || guitar.getCurrency().equals("")) {
				guitar.setCurrency("USD");
			}
			
			return guitarRepo.saveAndFlush(guitar);
		}
		
		return null;
	}

	@Override
	public Guitar updateGuitar(int guitarId, Guitar updatedGuitar) {
		if (guitarRepo.existsById(guitarId)) {
			Optional<Guitar> existingOpt = guitarRepo.findById(guitarId);
			Guitar existingGuitar = existingOpt.get();
			
			if (!updatedGuitar.getMake().equals("") || updatedGuitar.getMake() != null) {
				existingGuitar.setMake(updatedGuitar.getMake());
			}
			
			if (!updatedGuitar.getModel().equals("") || updatedGuitar.getMake() != null) {
				existingGuitar.setModel(updatedGuitar.getModel());
			}
			
			if (updatedGuitar.getYear() != null) {
				existingGuitar.setYear(updatedGuitar.getYear());
			}
			
			if (!updatedGuitar.getColor().equals("") || updatedGuitar.getColor() != null) {
				existingGuitar.setColor(updatedGuitar.getColor());
			}
			
			if (updatedGuitar.getDeleted() != null) {
				existingGuitar.setDeleted(updatedGuitar.getDeleted());
			}
			
			if (updatedGuitar.getTuning() != null) {
				existingGuitar.setTuning(updatedGuitar.getTuning());
			}
			
			if (updatedGuitar.getScaleLength() != null) {
				existingGuitar.setScaleLength(updatedGuitar.getScaleLength());
			}
			
			if (updatedGuitar.getNumberOfFrets() != null) {
				existingGuitar.setNumberOfFrets(updatedGuitar.getNumberOfFrets());
			}
			
			if (updatedGuitar.getNumberOfStrings() != null) {
				existingGuitar.setNumberOfStrings(updatedGuitar.getNumberOfStrings());
			}
			
			if (!updatedGuitar.getBridge().equals("") || updatedGuitar.getBridge() != null) {
				existingGuitar.setBridge(updatedGuitar.getBridge());
			}
			
			if (updatedGuitar.getPurchasePrice() != null) {
				existingGuitar.setPurchasePrice(updatedGuitar.getPurchasePrice());
			}
			
			if (!updatedGuitar.getCurrency().equals("")  || updatedGuitar.getCurrency() != null) {
				existingGuitar.setCurrency(updatedGuitar.getCurrency());
			}
			
			if (!updatedGuitar.getBridgePickup().equals("") || updatedGuitar.getBridgePickup() != null) {
				existingGuitar.setBridgePickup(updatedGuitar.getBridgePickup());
			}
			
			if (!updatedGuitar.getMiddlePickup().equals("") || updatedGuitar.getMiddlePickup() != null) {
				existingGuitar.setMiddlePickup(updatedGuitar.getMiddlePickup());
			}
			
			if (!updatedGuitar.getNeckPickup().equals("") || updatedGuitar.getNeckPickup() != null) {
				existingGuitar.setNeckPickup(updatedGuitar.getNeckPickup());
			}
			
			if (!updatedGuitar.getSerialNumber().equals("") || updatedGuitar.getSerialNumber() != null) {
				existingGuitar.setSerialNumber(updatedGuitar.getSerialNumber());
			}
			
			return guitarRepo.saveAndFlush(existingGuitar);
		}
		
		return null;
	}

	@Override
	public boolean deleteGuitar(int guitarId) {
		// if setup(s) exist for this guitar, delete those first
		List<Setup> setups = setupRepo.findByGuitar_Id(guitarId);
		if (setups.size() > 0) {
			for (Setup setup : setups) {
				// delete em all
				setupRepo.delete(setup);
			}
		}
		if (guitarRepo.existsById(guitarId)) {
			guitarRepo.deleteById(guitarId);
			if (!guitarRepo.existsById(guitarId)) {
				System.out.print("Guitar " + guitarId + " is deleted!");
				return true;
			}
		}
		return false;
	}

	@Override
	public List<Guitar> findAllByUser(int userId) {
		if (userRepo.existsById(userId)) {
			List<Guitar> guitars = guitarRepo.findByOwner_Id(userId);
			return guitars;
		}
		
		return null;
	}

	@Override
	public List<Guitar> findAllByUserNotDeleted(int userId) {
		if (userRepo.existsById(userId)) {
			List<Guitar> guitars = guitarRepo.findByOwner_IdAndDeletedFalse(userId);
			return guitars;
		}
		
		return null;
	}
	
	
	
}
