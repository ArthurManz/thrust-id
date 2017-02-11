pragma solidity ^0.4.0;
contract Refugee {


	enum Status {
        Rejected,
        Created,
        Investigation,
        Approved
    }



	struct Personal {
        string firstName;
		string lastName;
		string city;
		string countryOrigin;
		string gender;
		string bloodGroup;
		string birthDate;
        string civilStatus;
		string documentType;
		string documentId;
		string fingerprintHash;
		string photoHash;
    }

	struct Country {
        string name;
		Status status;
		string dateCreated;
		}


	struct Municipality {
        string name;
		string country;
		Status status;
		string dateCreated;
		}


	struct Rating {
        string rating;
		string rater;
		string details;
		string dateCreated;
		}

	struct Camp {
        string name;
		string country;
		string municipality;
		string tent;
		string bed;
		string dateCreated;
		}


    Status status;
    string dateCreated;
	Country country;
	Municipality municipality;
	Rating rating;
	Camp camp;
	Personal personalData;

	event LogRefugeePersonalData(string indexed firstName, string indexed lastName, string indexed documentId,address contractAddress);
    event LogRefugeeCountryRating(address indexed name_lastName, string indexed country, string indexed rating,address contractAddress);
  	event LogAction(address indexed contractAddress,address sender,string action,string details,string dateAdded);

    event RegisterRefugeePersonalData1(address indexed contractAddress,
        string firstName,
		string lastName,
		string city,
		string gender,
		string bloodGroup,
		string birthDate);

    event RegisterRefugeePersonalData2(address indexed contractAddress,
        string countryOrigin,
        string civilStatus,
		string documentType,
		string documentId,
		string fingerprintHash,
		string photoHash);

	event RegisterRefugeeRating(address indexed contractAddress,
        string rating,
        string rater,
		string details,
		string dateCreated);


    event RegisterRefugeeCountry(address indexed contractAddress,
        string name,
        Status status,
        string dateCreated);


    event RegisterRefugeeMunicipality(address indexed contractAddress,
        string name,
        string country,
        Status status,
        string dateCreated);



    event RegisterRefugeeCamp(address indexed contractAddress,
        string name,
        string country,
        string municipality,
        string tent,
        string bed,
        string dateCreated);

    function setPersonalData( string _firstName,
		string _lastName,
		string _city,
		string _gender,
		string _bloodGroup,
		string _birthDate,
		string _countryOrigin,
        string _civilStatus,
		string _documentType,
		string _documentId,
		string _fingerprintHash,
		string _photoHash,
		string _dateCreated,
		string _details)
	{
		personalData.firstName=_firstName;
		personalData.lastName=_lastName;
	    personalData.city=_city;
		personalData.gender=_gender;
		personalData.bloodGroup=_bloodGroup;
		personalData.birthDate=_birthDate;
        personalData.civilStatus=_civilStatus;
		personalData.countryOrigin=_countryOrigin;
		personalData.documentType=_documentType;
		personalData.documentId=_documentId;
		personalData.fingerprintHash=_fingerprintHash;
		personalData.photoHash=_photoHash;
		dateCreated=_dateCreated;

		status=Status.Created;

        LogAction(this,msg.sender, "Create",_details,_dateCreated);
		LogAction(this,msg.sender, "Status","Created",_dateCreated);
		RegisterRefugeePersonalData1(this,personalData.firstName,personalData.lastName,personalData.city,personalData.gender,personalData.bloodGroup,personalData.birthDate);
		RegisterRefugeePersonalData2(this,personalData.countryOrigin,personalData.civilStatus,personalData.documentType,personalData.documentId,personalData.fingerprintHash,personalData.photoHash);

	}


	 function setRatingData( string _rating,
		string _rater,
		string details,
		string _dateCreated,
		string _details)
	{
	 	rating.rating=_rating;
	 	rating.rater=_rater;
	 	rating.details=details;
	 	rating.dateCreated=_dateCreated;

  	 	LogAction(this,msg.sender, "Rating",_details,_dateCreated);
  	 	RegisterRefugeeRating(this,_rating,_rater,_details,_dateCreated);

	}

	function setCountry (string _name, Status _status , string _dateCreated, string _details) {

	  status= _status;
      country.name = _name;
      country.status = _status;
      country.dateCreated = _dateCreated;
      LogAction(this,msg.sender, "Country",_details,_dateCreated);
	  LogAction(this,msg.sender, "Status",_details,_dateCreated);
      RegisterRefugeeCountry(this,country.name, country.status, country.dateCreated);
    }

    function setMunicipality (string _name, string _country, Status _status, string _dateCreated, string _details) {
	  status= _status;
      municipality.name = _name;
      municipality.country = _country;
      municipality.status = _status;
      municipality.dateCreated = _dateCreated;
      LogAction(this,msg.sender, "Municipality",_details,_dateCreated);
	  LogAction(this,msg.sender, "Status",_details,_dateCreated);
      RegisterRefugeeMunicipality(this,municipality.name, municipality.country,municipality.status, municipality.dateCreated);
    }

    function setCamp (string _name, string _country, string _municipality, string _tent, string _bed, string _dateCreated, string _details) {
      camp.name = _name;
      camp.country = _country;
      camp.municipality = _municipality;
      camp.tent = _tent;
      camp.bed = _bed;
      LogAction(this,msg.sender, "Camp",_details,_dateCreated);
      RegisterRefugeeCamp(this,camp.name, camp.country, camp.municipality,camp.tent, camp.bed, camp.dateCreated);
    }


}
