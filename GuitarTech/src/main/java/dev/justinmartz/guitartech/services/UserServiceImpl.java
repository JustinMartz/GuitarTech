package dev.justinmartz.guitartech.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.justinmartz.guitartech.entities.User;
import dev.justinmartz.guitartech.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public User getLoggedInUser(String username) {
		User user = userRepo.findByUsername(username);
		
		return user;
	}

}
