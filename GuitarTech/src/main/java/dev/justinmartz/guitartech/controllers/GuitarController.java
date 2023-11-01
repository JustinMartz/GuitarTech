package dev.justinmartz.guitartech.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.justinmartz.guitartech.entities.Guitar;
import dev.justinmartz.guitartech.entities.User;
import dev.justinmartz.guitartech.services.GuitarService;
import dev.justinmartz.guitartech.services.UserService;

@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class GuitarController {

	@Autowired
	private GuitarService guitarServ;
	
	@Autowired
	private UserService userServ;
	
	@GetMapping("guitars/{guitarId}")
	public Guitar getGuitar(@PathVariable int guitarId) {
		// TODO Set headers
		return guitarServ.findGuitar(guitarId);
	}
	
	@GetMapping("guitars")
	public List<Guitar> getAllGuitars() {
		// Admin functionality. Should use principal to check if user role is admin first.
		// TODO Set headers
		return guitarServ.findAllGuitars();
	}
	
	@GetMapping("guitars/users")
	public List<Guitar> getAllGuitarsOfLoggedInUser(Principal principal, HttpServletResponse response) {
		User user = userServ.getLoggedInUser(principal.getName());
		
		if (user != null) {
			response.setStatus(200);
			return guitarServ.findAllByUserNotDeleted(user.getId());			
		} else {
			response.setStatus(404);
			return null;
		}
	}

//	TODO: Endpoint for users to get another user's guitars if profile set to public
//	@GetMapping("guitars/users/{userId}")
//	public List<Guitar> getAllGuitarsOfLoggedInUser(Principal principal, @PathVariable int userId) {
//		return guitarServ.findAllByUser(userId);
//	}
	
	@GetMapping("guitars/tunings/{tuningId}")
	public List<Guitar> getAllGuitarsTuning(@PathVariable int tuningId) {
		return guitarServ.findAllByTuning(tuningId);
	}
	
	@GetMapping("guitars/bridges/{bridge}")
	public List<Guitar> getAllGuitarsBridge(@PathVariable String bridge) {
		return guitarServ.findAllByBridge(bridge);
	}
	
	@GetMapping("guitars/colors/{color}")
	public List<Guitar> getAllGuitarsColor(@PathVariable String color, HttpServletResponse response) {
		List<Guitar> guitars = guitarServ.findAllByColor(color);
		response.setStatus(200);
		if (guitars == null) {
			response.setStatus(404);
		}
		return guitars;
	}
	
	@PostMapping("guitars")
	public Guitar createNewGuitar(@RequestBody Guitar guitar, HttpServletResponse response, HttpServletRequest request) {
		Guitar newGuitar = guitarServ.createNewGuitar(guitar);
		if (newGuitar == null) {
			response.setStatus(400);
		} else {
			response.setStatus(201);
			StringBuffer url = request.getRequestURL().append("/" + newGuitar.getId());
			response.setHeader("Location", url.toString());
		}
		
		return newGuitar;
	}
	
	@PutMapping("guitars/{guitarId}")
	public Guitar updateGuitar(@PathVariable int guitarId, @RequestBody Guitar guitar, HttpServletResponse response) {
		Guitar updatedGuitar = guitarServ.updateGuitar(guitarId, guitar);
		if (updatedGuitar == null) {
			response.setStatus(400);
		} else {
			response.setStatus(200);
		}
		
		return updatedGuitar;
	}
	
	@DeleteMapping("guitars/{guitarId}")
	public void deleteGuitar(Principal principal, @PathVariable int guitarId, HttpServletResponse response) {
		// TODO only owners of guitars can delete those guitars, except for admin

		if (guitarServ.deleteGuitar(guitarId, principal.getName())) {
			response.setStatus(204);
		} else {
			response.setStatus(400);
		}
		
	}
}
