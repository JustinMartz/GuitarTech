package dev.justinmartz.guitartech.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.justinmartz.guitartech.entities.GuitarPicture;
import dev.justinmartz.guitartech.services.GuitarPictureService;

@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class GuitarPictureController {
	
	@Autowired
	private GuitarPictureService guitarPictureServ;
	
	@GetMapping("guitars/pictures/guitar/{guitarId}")
	public List<GuitarPicture> getAllByGuitar(@PathVariable int guitarId, HttpServletResponse response) {
		List<GuitarPicture> pictures = guitarPictureServ.findAllByGuitar(guitarId);
		
		if (pictures == null) {
			response.setStatus(404);
			return pictures;
		}
		
		response.setStatus(200);
		return pictures;
	}
	
	@GetMapping("guitars/pictures/{pictureId}")
	public GuitarPicture getPictureById(@PathVariable int pictureId, HttpServletResponse response) {
		GuitarPicture picture = guitarPictureServ.findById(pictureId);
		
		if (picture == null) {
			response.setStatus(404);
			return picture;
		}
		
		response.setStatus(200);
		return picture;
	}
}
