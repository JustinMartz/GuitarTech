package dev.justinmartz.guitartech.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.justinmartz.guitartech.entities.GuitarPicture;
import dev.justinmartz.guitartech.entities.User;

public interface GuitarPictureRepository extends JpaRepository<GuitarPicture, Integer> {
	public List<GuitarPicture> findByGuitar_Id(int guitarId);
	public List<GuitarPicture> findByGuitar_Owner(User owner);
}
