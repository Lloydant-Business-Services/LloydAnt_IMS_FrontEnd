export const Roles = {
    SuperAdmin : 1,
    HRAdmin : 2,
    Staff : 3,
    Regularization : 4,
    Dean : 5,
    VC : 6,
    HOD : 7,
    Personnel : 9,
    PersonnelGen:10,
    PersonnelDocumentation:11,
    PersonnelSaps:12,
    Vice_Chancellor : 6,
    DeputyRegistrar:13,
    Personnel_Mailing_Staff:15,
    Personnel_Secretarial:14,
    Personnel_Statistics:9,
    Personnel_Documentation:11,

    //Production
    VC_IncomingMailOfficer: 16,
    VC_OutgoingMailOfficer: 17,
    VC_Secretary: 18,
    
    //Local
    // VC_IncomingMailOfficer: 16,
    // VC_OutgoingMailOfficer: 19,
    // VC_Secretary: 18,

    // Personnel:20008
}

export const ActionType = {
    //Forward:1,
    AcknowledgeAndFoward:3,
    AcknowledgeAndClose:1,
    RejectAndClose:2,
    ReturnToOriginator:5,
    Acknowledge:1
}
// Acknowledged = 1,
// Rejected = 2,
// AcknowledgeAndForward = 3