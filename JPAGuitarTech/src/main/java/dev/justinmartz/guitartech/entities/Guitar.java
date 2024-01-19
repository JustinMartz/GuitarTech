package dev.justinmartz.guitartech.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"setups", "deleted"})
public class Guitar {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String make;
	
	private String model;
	
	private Integer year;
	
	private String color;
	
	private Boolean deleted;
	
	@JsonIgnore
	@JoinColumn(name="user_id")
	@ManyToOne
	private User owner;
	
	@ManyToOne
	@JoinColumn(name = "tuning_id")
	private Tuning tuning;
	
	@Column(name = "scale_length")
	private Double scaleLength;
	
	@Column(name = "number_of_frets")
	private Integer numberOfFrets;
	
	@Column(name = "number_of_strings")
	private Integer numberOfStrings;
	
	private String bridge;

	@Column(name = "purchase_price")
	private Double purchasePrice;
	
	private String currency;
	
	@Column(name = "bridge_pickup")
	private String bridgePickup;
	
	@Column(name = "middle_pickup")
	private String middlePickup;
	
	@Column(name = "neck_pickup")
	private String neckPickup;
	
	@Column(name = "serial_number")
	private String serialNumber;
	
//	@OneToMany(mappedBy = "guitar")
//	private List<Setup> setups;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMake() {
		return make;
	}

	public void setMake(String make) {
		this.make = make;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public Tuning getTuning() {
		return tuning;
	}

	public void setTuning(Tuning tuning) {
		this.tuning = tuning;
	}

	public Double getScaleLength() {
		return scaleLength;
	}

	public void setScaleLength(Double scaleLength) {
		this.scaleLength = scaleLength;
	}

	public Integer getNumberOfFrets() {
		return numberOfFrets;
	}

	public void setNumberOfFrets(Integer numberOfFrets) {
		this.numberOfFrets = numberOfFrets;
	}

	public Integer getNumberOfStrings() {
		return numberOfStrings;
	}

	public void setNumberOfStrings(Integer numberOfStrings) {
		this.numberOfStrings = numberOfStrings;
	}

	public String getBridge() {
		return bridge;
	}

	public void setBridge(String bridge) {
		this.bridge = bridge;
	}

	public Double getPurchasePrice() {
		return purchasePrice;
	}

	public void setPurchasePrice(Double purchasePrice) {
		this.purchasePrice = purchasePrice;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getBridgePickup() {
		return bridgePickup;
	}

	public void setBridgePickup(String bridgePickup) {
		this.bridgePickup = bridgePickup;
	}

	public String getMiddlePickup() {
		return middlePickup;
	}

	public void setMiddlePickup(String middlePickup) {
		this.middlePickup = middlePickup;
	}

	public String getNeckPickup() {
		return neckPickup;
	}

	public void setNeckPickup(String neckPickup) {
		this.neckPickup = neckPickup;
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Guitar other = (Guitar) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Guitar [id=" + id + ", make=" + make + ", model=" + model + ", year=" + year + ", color=" + color
				+ ", deleted=" + deleted + ", scaleLength=" + scaleLength + ", numberOfFrets=" + numberOfFrets
				+ ", numberOfStrings=" + numberOfStrings + ", bridge=" + bridge + ", purchasePrice=" + purchasePrice
				+ ", currency=" + currency + ", bridgePickup=" + bridgePickup + ", middlePickup=" + middlePickup
				+ ", neckPickup=" + neckPickup + ", serialNumber=" + serialNumber + "]";
	}
	

}
