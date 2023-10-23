package dev.justinmartz.guitartech.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SetupTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Setup setup;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAGuitarTech");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		setup = em.find(Setup.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		setup = null;
	}

	@Test
	void test_Setup_basic_mappings() {
		assertNotNull(setup);
		assertEquals("10-46", setup.getStringGauge());
		assertEquals(2023, setup.getDateOfSetup().getYear());
	}
	
	@Test
	void test_Setup_relational_mappings() {
		assertNotNull(setup.getGuitar());
		assertEquals("Les Paul Custom", setup.getGuitar().getModel());
		assertNotNull(setup.getTuning());
		assertEquals("Eb Standard", setup.getTuning().getName());
	}

}
