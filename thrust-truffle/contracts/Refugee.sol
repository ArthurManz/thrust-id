contract Refugee{

	event LogRefugeePersonalData(string indexed name, string indexed lastName, string indexed documentId,address contractAddress);
    event LogRefugeeCountryRating(address indexed contractAddress, string indexed country, string indexed rating,address contractAddress,string name, string lastName, string docId,string photo);
  
	
	enum Status {
        Rejected,
        Created,
        Investigation,
        Approved
    }

    Status status;
	
	struct Personal {
        string name;
		string lastName;
		string city;
		string gender;
		string blood;
		string birthDate;
        string civilStatus;
		string docType;
		string documentId;
		string finger;
		string photo;
    }

	struct Country {
        string name;
		string status;
		string dateAdded;
		string dateUpdated;
		}
		
		
	struct Municipality {
        string name;
		string country;
		string status;
		string dateAdded;
		string dateUpdated;
		}
		
		
	struct Rating {
        string rating;
		string rater;
		string details;
		string dateAdded;
		}
		
	Country[] countryList;
	Municipality[] municipalityList;
	Rating[] ratingList;
	Personal personalData;
	
	
	function Refugee() 
	{
	}

    function setPersonal( string _name,
		string _lastName,
		string _city,
		string _gender,
		string _blood,
		string _birthDate,
        string _civilStatus,
		string _docType,
		string _documentId,
		string _finger,
		string _photo) 
	{
        name=_name;
		lastName=_lastName;
	    city=_city;
		gender=_gender;
		blood=_blood;
		birthDate=_birthDate;
        civilStatus=_civilStatus;
		docType=_docType;
		documentId=_documentId;
		finger=_finger;
		photo=_photo;
		status=Status.Created
        RegisterRefugee(name,  lastName, documentId, this, name,  lastName,  docId, photo);
	}



}