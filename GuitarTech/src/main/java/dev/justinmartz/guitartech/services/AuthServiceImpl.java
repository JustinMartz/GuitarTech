package dev.justinmartz.guitartech.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.justinmartz.guitartech.entities.*;
import dev.justinmartz.guitartech.repositories.*;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User register(User user) {
		User newUser = new User();
		String encrypted = encoder.encode(user.getPassword());
		
		if (userRepo.findByUsername(user.getUsername()) != null) {
			return null;
		}
			
		newUser.setUsername(user.getUsername());
		newUser.setPassword(encrypted);
		newUser.setActive(true);
		
		if (user.getRole() == null) {
			newUser.setRole("player");
		}
		
		userRepo.saveAndFlush(newUser);
		return user;
	}

	@Override
	public User getUserByUsername(String username) {
		return userRepo.findByUsername(username);
	}

}
