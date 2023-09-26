package dev.justinmartz.guitartech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.justinmartz.guitartech.entities.*;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findByUsername(String username);
}
