package dev.justinmartz.guitartech.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.justinmartz.guitartech.entities.Guitar;
import dev.justinmartz.guitartech.entities.GuitarPicture;
import dev.justinmartz.guitartech.entities.Setup;
import dev.justinmartz.guitartech.entities.Tuning;
import dev.justinmartz.guitartech.repositories.GuitarPictureRepository;
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

	@Autowired
	private GuitarPictureRepository guitarPictureRepo;

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
	public List<Guitar> findAllByTuning(int tuningId, int userId) {
		System.out.println("*** Getting passed tuningId: " + tuningId);
		// only return guitars owned by user
		// TODO: need to do this for color too
		if (userRepo.existsById(userId)) {
			if (tuningRepo.existsById(tuningId)) {
				System.out.println("*** Tuning " + tuningId + " exists!");
				List<Guitar> guitars = guitarRepo.findByTuning_IdAndOwner_Id(tuningId, userId);
				for (Guitar g : guitars)
					System.out.println("*** " + g.getMake() + " " + g.getModel());
				return guitars;
			} else {
				System.out.println("*** Guitar with tuning " + tuningId + " not found :(");
			}
			
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
	public Guitar createNewGuitar(Guitar guitar, String username) {
		if (guitar != null && !guitarRepo.existsById(guitar.getId())) {
			if (guitar.getMake() == null || "".equals(guitar.getMake())) {
				return null;
			}

			if (guitar.getModel() == null || "".equals(guitar.getModel())) {
				return null;
			}

			if (tuningRepo.existsById(guitar.getTuning().getId())) {
				Optional<Tuning> tuningOpt = tuningRepo.findById(guitar.getTuning().getId());
				guitar.setTuning(tuningOpt.get());	
			} else if (guitar.getTuning() == null) {
				Tuning tuning = new Tuning();
				tuning.setId(1);
				tuning.setName("E Standard");
				guitar.setTuning(tuning);
			}

			if ("".equals(guitar.getCurrency()) || guitar.getCurrency() == null) {
				guitar.setCurrency("USD");
			}
			
			guitar.setOwner(userRepo.findByUsername(username));
			guitar.setDeleted(false);

			return guitarRepo.saveAndFlush(guitar);
		}

		return null;
	}

	@Override
	public Guitar updateGuitar(int guitarId, Guitar updatedGuitar, String username) {
		if (guitarRepo.existsById(guitarId)) {
			Optional<Guitar> existingOpt = guitarRepo.findById(guitarId);
			Guitar existingGuitar = existingOpt.get();

			if (existingGuitar.getOwner().getUsername().equals(username)) {
				if (updatedGuitar.getMake() != null || !"".equals(updatedGuitar.getMake())) {
					existingGuitar.setMake(updatedGuitar.getMake());
				}
				if (updatedGuitar.getModel() != null || !"".equals(updatedGuitar.getModel())) {
					existingGuitar.setModel(updatedGuitar.getModel());
				}
				if (updatedGuitar.getYear() != null) {
					existingGuitar.setYear(updatedGuitar.getYear());
				}
				if (updatedGuitar.getColor() != null || !"".equals(updatedGuitar.getColor())) {
					existingGuitar.setColor(updatedGuitar.getColor());
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
				if (updatedGuitar.getBridge() != null || !"".equals(updatedGuitar.getBridge())) {
					existingGuitar.setBridge(updatedGuitar.getBridge());
				}
				if (updatedGuitar.getPurchasePrice() != null) {
					existingGuitar.setPurchasePrice(updatedGuitar.getPurchasePrice());
				}
				if (updatedGuitar.getCurrency() != null || !"".equals(updatedGuitar.getCurrency())) {
					existingGuitar.setCurrency(updatedGuitar.getCurrency());
				}
				if (updatedGuitar.getBridgePickup() != null || !"".equals(updatedGuitar.getBridgePickup())) {
					existingGuitar.setBridgePickup(updatedGuitar.getBridgePickup());
				}
				if (updatedGuitar.getMiddlePickup() != null || !"".equals(updatedGuitar.getMiddlePickup())) {
					existingGuitar.setMiddlePickup(updatedGuitar.getMiddlePickup());
				}
				if (updatedGuitar.getNeckPickup() != null || !"".equals(updatedGuitar.getNeckPickup())) {
					existingGuitar.setNeckPickup(updatedGuitar.getNeckPickup());
				}
				if (updatedGuitar.getSerialNumber() != null || !"".equals(updatedGuitar.getSerialNumber())) {
					existingGuitar.setSerialNumber(updatedGuitar.getSerialNumber());
				}
				return guitarRepo.saveAndFlush(existingGuitar);
			}
		}

		return null;
	}

	@Override
	public boolean deleteGuitar(int guitarId, String username) {
		// if setup(s) exist for this guitar, delete those first
		List<Setup> setups = setupRepo.findByGuitar_Id(guitarId);
		if (setups.size() > 0) {
			for (Setup setup : setups) {
				// delete em all
				setupRepo.delete(setup);
			}
		}
		// delete pictures too
		List<GuitarPicture> pictures = guitarPictureRepo.findByGuitar_Id(guitarId);
		if (pictures.size() > 0) {
			for (GuitarPicture picture : pictures) {
				guitarPictureRepo.delete(picture);
			}
		}

		Optional<Guitar> guitarOpt = guitarRepo.findById(guitarId);
		if (guitarOpt.isPresent()) {
			Guitar guitar = guitarOpt.get();
			if (guitar.getOwner().getUsername().equals(username)) {
				System.out.println("Deleting guitar: " + guitar.getId());
				guitarRepo.deleteById(guitarId);
				if (!guitarRepo.existsById(guitarId)) {
					System.out.print("Guitar " + guitarId + " is deleted!");
					return true;
				}
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
