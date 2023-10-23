package dev.justinmartz.guitartech.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.justinmartz.guitartech.entities.Guitar;

public interface GuitarRepository extends JpaRepository<Guitar, Integer> {
	public List<Guitar> findByTuning_Id(int tuningId);
	public List<Guitar> findByBridgeLike(String bridge);
	public List<Guitar> findByColorLike(String color);
}
