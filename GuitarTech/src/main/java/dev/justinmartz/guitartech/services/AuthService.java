package dev.justinmartz.guitartech.services;

import dev.justinmartz.guitartech.entities.*;

public interface AuthService {
	public User register(User user);
	public User getUserByUsername(String username);
}
