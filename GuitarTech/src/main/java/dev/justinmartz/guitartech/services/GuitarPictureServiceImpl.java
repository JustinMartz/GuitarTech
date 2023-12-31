package dev.justinmartz.guitartech.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.justinmartz.guitartech.entities.Guitar;
import dev.justinmartz.guitartech.entities.GuitarPicture;
import dev.justinmartz.guitartech.entities.User;
import dev.justinmartz.guitartech.repositories.GuitarPictureRepository;
import dev.justinmartz.guitartech.repositories.GuitarRepository;
import dev.justinmartz.guitartech.repositories.UserRepository;

@Service
public class GuitarPictureServiceImpl implements GuitarPictureService {

	@Autowired
	private GuitarPictureRepository guitarPictureRepo;
	
	@Autowired
	private GuitarRepository guitarRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<GuitarPicture> findAllByGuitarAndOwner(int guitarId, String username) {
		Optional<Guitar> guitarOpt = guitarRepo.findById(guitarId);
		
		if (guitarOpt.isPresent()) {
			// if guitar belongs to logged-in user
			Guitar guitar = guitarOpt.get();
			if (guitar.getOwner().getUsername() == username) {
				return guitarPictureRepo.findByGuitar_Id(guitarId);				
			}
		}
		
		return null;
	}

	@Override
	public GuitarPicture findById(int guitarPictureId) {
		if (guitarPictureRepo.existsById(guitarPictureId)) {
			Optional<GuitarPicture> pictureOpt = guitarPictureRepo.findById(guitarPictureId);
			GuitarPicture picture = pictureOpt.get();
			return picture;
		}
		
		return null;
	}

	@Override
	public List<GuitarPicture> findAllByOwner(String username) {
		User owner = userRepo.findByUsername(username);
		List<GuitarPicture> pictures = guitarPictureRepo.findByGuitar_Owner(owner);
		return pictures;
	}
		
}
