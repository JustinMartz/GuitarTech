package dev.justinmartz.guitartech.services;

import dev.justinmartz.guitartech.entities.User;

public interface UserService {
	public User getLoggedInUser(String username);
}
