contract Refugee{

	event LogRefugeePersonalData(string indexed firstName, string indexed lastName, string indexed documentId,address contractAddress);
    event LogRefugeeCountryRating(address indexed name_lastName, string indexed country, string indexed rating,address contractAddress);
  
  	event LogAction(address indexed contractAddress,address modifier,string action,string details,string dateAdded )
	
	enum Status {
        Rejected,
        Created,
        Investigation,
        Approved
    }

    Status status;
	
	struct Personal {
        string firstName;
		string lastName;
		string city;
		string countryOrigin;
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
		
	struct Camp {
        string name;
		string country;
		string municipality;
		string tent;
		string bed;
		}
	
	Country[] countryList;
	Municipality[] municipalityList;
	Rating[] ratingList;
	Camp[] campList;

	Personal personalData;

    function Refugee( string _firstName,
		string _lastName,
		string _city,
		string _gender,
		string _blood,
		string _birthDate,
		string _countryOrigin,
        string _civilStatus,
		string _documentType,
		string _documentId,
		string _fingerprintHash,
		string _photoHash) 
	{
        ratingList.
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

		personalData.status=Status.Created
        
		LogRefugeePersonalData(personalData.firstName,  personalData.lastName, personalData.documentId, this);
	}

	function getRefugeePersonalData()  constant returns (string,string,string,string,string,string,string,string,
	string,string,string,string,Status)
	{
		return(
        personalData.firstName,
		personalData.lastName,
	    personalData.city,
		personalData.gender,
		personalData.bloodGroup,
		personalData.birthDate,
        personalData.civilStatus,
		personalData.countryOrigin,
		personalData.documentType,
		personalData.documentId,
		personalData.fingerprintHash,
		personalData.photoHash,
		status);
	}


	 function setRatingdata( string _rating,
		string _rater,
		string _details,
		string _dateAdded) 
	{
	 	ratingList.push(Rating({
                    rating: _rating,
                    rater: _rater,
                    details: _details,
					dateAdded: _dateAdded
                }));
        
		
  	 	LogAction(this,msg.sender, "Rating",_details,_dateAdded)
	}

	function getLastRatingData() constant returns (string, string, string, string)
	{
	 	uint256 lastIndex=ratingList.length-1;		
		if(lastIndex>-1)
		{
			return(ratingList[lastIndex].rating,ratingList[lastIndex].rater,ratingList[lastIndex].details,ratingList[lastIndex].dateAdded);
		}
		else
		{
			return("","","","","");
		}
	}




}