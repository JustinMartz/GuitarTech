package dev.justinmartz.guitartech.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.justinmartz.guitartech.entities.Setup;

public interface SetupRepository extends JpaRepository<Setup, Integer>{
	public List<Setup> findAll();
	public List<Setup> findByTuning_Id(int tuningId);
	public List<Setup> findByGuitar_Id(int guitarId);
	public List<Setup> findByGuitar_IdOrderByDateOfSetupDesc(int guitarId);
//	public List<Setup> findByOwner_Id(int userId);
	public List<Setup> findByDeletedFalseAndGuitar_Owner_Id(int userId);
	public List<Setup> findByDeletedFalseAndGuitar_Owner_IdOrderByDateOfSetupDesc(int userId);
}
