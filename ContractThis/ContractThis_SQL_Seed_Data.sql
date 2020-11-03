USE [ContractThis];
GO

set identity_insert [Project] on
insert into Project (Id, UserProfileId, ProjectName, LocationName, LocationAddress, ProjectDiscription, Budget, DateComplete, ProjectImagUrl) values (1, 1, 'Back Porch', 'Murphy Home', '123 Main Street', 'Full tear down of existing deck. Rebuild covered Victorian Style porch using salvage from Acadia Plantation', 48000, NULL, 'https://picsum.photos/200');
insert into Project (Id, UserProfileId, ProjectName, LocationName, LocationAddress, ProjectDiscription, Budget, DateComplete, ProjectImagUrl) values (2, 1, 'Boat', 'Magnolia', '123 Main Street', 'Fresh varnish on the Magnolia', 120, NULL, 'https://picsum.photos/200');
set identity_insert [Project] off

set identity_insert [UserProfile] on
insert into [UserProfile] (Id, UserFirstName, UserLastName, UserScreenName, UserEmail, FirebaseUserId, UserImageUrl, IsSubcontactor) values (1, 'Patrick', 'Murphy', 'PMurphy', 'patrick@me.comx', 'IitCAP9zu2R6LY0X9TYyY8LFwaY2', 'https://picsum.photos/200', 0);
insert into [UserProfile] (Id, UserFirstName, UserLastName, UserScreenName, UserEmail, FirebaseUserId, UserImageUrl, IsSubcontactor) values (2, 'Mark', 'Electric', 'BugZapper', 'mark@electric.com', 'fTyWq39O89b5LTltmA4gwGPzhDS2', 'https://picsum.photos/200', 1);
insert into [UserProfile] (Id, UserFirstName, UserLastName, UserScreenName, UserEmail, FirebaseUserId, UserImageUrl, IsSubcontactor) values (3, 'Henry', 'Jones', 'Builderguy', 'build@build.com', 'boWpW8zxGzVygRU8kymvIS11wXe2', 'https://picsum.photos/200', 1);
insert into [UserProfile] (Id, UserFirstName, UserLastName, UserScreenName, UserEmail, FirebaseUserId, UserImageUrl, IsSubcontactor) values (4, 'John', 'Thompson', 'Plumberguy', 'plumber@plumber.com', 'knLuKwCfvKVSFtS6XDrwN6qwo2L2', 'https://picsum.photos/200', 1);
insert into [UserProfile] (Id, UserFirstName, UserLastName, UserScreenName, UserEmail, FirebaseUserId, UserImageUrl, IsSubcontactor) values (5, 'Tom', 'Shingles', 'TheRooferGuy', 'roofs@notwet.comx', 'RRzikp6iqnN671yeSbD2Dg2MDUT2', 'https://picsum.photos/200', 1);

set identity_insert [UserProfile] off

set identity_insert [ProjectComponent] on
insert into [ProjectComponent] (Id, [Name], ComponentDiscription, ProjectId, SubContractorId, DateComplete, MaterialCost) values (1, 'Lighting and Electric', 'Run electric and new breakers. Install lighting and fans', 1, Null, Null, 1100);
insert into [ProjectComponent] (Id, [Name], ComponentDiscription, ProjectId, SubContractorId, DateComplete, MaterialCost) values (2, 'Railings and details', 'Install railings and Victorian elements', 1, Null, Null, 750);
insert into [ProjectComponent] (Id, [Name], ComponentDiscription, ProjectId, SubContractorId, DateComplete, MaterialCost) values (3, 'Roof', 'Install roof onto porch', 1, 1, '2019-08-01', 13500);
insert into [ProjectComponent] (Id, [Name], ComponentDiscription, ProjectId, SubContractorId, DateComplete, MaterialCost) values (4, 'Structure', 'Pour concrete footings and build support structure', 1, 1, '2019-06-019', 11500);
set identity_insert [ProjectComponent] off

set identity_insert [SubContractor] on
insert into [SubContractor] (Id, UserProfileId, SubContractorBusinessName, SubContractorImageUrl) values (1, 2, 'NoShocks', Null);
insert into [SubContractor] (Id, UserProfileId, SubContractorBusinessName, SubContractorImageUrl) values (2, 3, 'Frames-R-Us', Null);
insert into [SubContractor] (Id, UserProfileId, SubContractorBusinessName, SubContractorImageUrl) values (3, 4, 'FlushAway', Null);
insert into [SubContractor] (Id, UserProfileId, SubContractorBusinessName, SubContractorImageUrl) values (4, 5, 'NotWet', Null);

set identity_insert [SubContractor] off

set identity_insert [ProjectComponentImages] on
insert into [ProjectComponentImages] (Id, ProjectComponentId, ProjectComponentImageUrl) values (1, 2, 'https://picsum.photos/200');
set identity_insert [ProjectComponentImages] off

set identity_insert [SubContractorBid] on
insert into [SubContractorBid] (Id, ProjectComponentId, SubContractorId, UserProfileId, Fee, SubAccepted, OwnerComment) values (1, 1, 1, 1, 800, '2019-08-01', 'I need Wiring and lights installed on my porch');
set identity_insert [SubContractorBid] off

set identity_insert [SubContractorType] on
insert into [SubContractorType] (Id, Speciality) values (1, 'Electrician');
insert into [SubContractorType] (Id, Speciality) values (2, 'Plumber');
insert into [SubContractorType] (Id, Speciality) values (3, 'Roofer');
insert into [SubContractorType] (Id, Speciality) values (4, 'Carpenter');
set identity_insert [SubContractorType] off

set identity_insert [SubContractorJobType] on
insert into [SubContractorJobType] (Id, SubContractorId, SubContractorTypeId) values (1, 1, 1);
insert into [SubContractorJobType] (Id, SubContractorId, SubContractorTypeId) values (2, 2, 4);
insert into [SubContractorJobType] (Id, SubContractorId, SubContractorTypeId) values (3, 3, 2);
insert into [SubContractorJobType] (Id, SubContractorId, SubContractorTypeId) values (4, 4, 3);

set identity_insert [SubContractorJobType] off

