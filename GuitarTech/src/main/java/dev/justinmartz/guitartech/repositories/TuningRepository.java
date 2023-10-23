package dev.justinmartz.guitartech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.justinmartz.guitartech.entities.Tuning;

public interface TuningRepository extends JpaRepository<Tuning, Integer> {
	
}
