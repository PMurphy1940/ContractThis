
    const LocalUserProvider = {
        userId() { return JSON.parse(sessionStorage.getItem("userProfile")).id},
        userFirstName() { return JSON.parse(sessionStorage.getItem("userProfile")).firstName},
        userLastName() { return JSON.parse(sessionStorage.getItem("userProfile")).lastName},
        userImageLoc() { return JSON.parse(sessionStorage.getItem("userProfile")).imageLocation},
        userDisplayName() { return JSON.parse(sessionStorage.getItem("userProfile")).screenName},
        isSubcontractor() { return JSON.parse(sessionStorage.getItem("userProfile")).isSubcontractor},
        subcontractorId() {return JSON.parse(sessionStorage.getItem("userProfile")).contractor.id },
        subcontractorBusinessName() {return JSON.parse(sessionStorage.getItem("userProfile")).contractor.subcontractorBusinessName }

}

export default LocalUserProvider