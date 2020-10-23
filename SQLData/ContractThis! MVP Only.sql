CREATE TABLE [project] (
  [id] integer,
  [userProfileId] int,
  [projectName] varcharacter NOT NULL,
  [locationName] varcharacter,
  [address] varcharacter,
  [projectDiscription] varcharacter,
  [budget] double,
  [dateComplete] datetime,
  [projectImagUrl] varcharacter
)
GO

CREATE TABLE [userProfile] (
  [id] integer,
  [userFirstName] varcharacter(15),
  [userLastName] varcharacter(15),
  [userScreenName] varcharacter(15),
  [userEmail] varcharacter(25),
  [userFirebaseId] varcharacter,
  [userImageUrl] varcharacter,
  [isSubcontactor] bit
)
GO

CREATE TABLE [subContractor] (
  [id] integer,
  [userProfileId] integer,
  [subContractorBusinessName] varcharacter,
  [subContractorImageUrl] varcharacter
)
GO

CREATE TABLE [projectComponent] (
  [id] integer,
  [name] varcharacter(25),
  [componentDiscription] varcharacter,
  [projectId] integer,
  [subContractorId] integer,
  [dateComplete] datetime,
  [materialCost] double
)
GO

CREATE TABLE [projectComponentImages] (
  [id] integer,
  [projectComponentId] integer,
  [projectComponentImageUrl] varcharacter
)
GO

CREATE TABLE [subContractorBid] (
  [id] integer,
  [projectComponentId] integer,
  [subContractorId] integer,
  [userProfileId] integer,
  [fee] double,
  [subAccepted] datetime,
  [ownerComment] varcharacter
)
GO

CREATE TABLE [subContractorType] (
  [id] integer,
  [speciality] varcharacter(25)
)
GO

CREATE TABLE [subContractorJobType] (
  [id] integer,
  [subContractorType] integer,
  [subContractorId] integer
)
GO

ALTER TABLE [userProfile] ADD FOREIGN KEY ([id]) REFERENCES [project] ([userProfileId])
GO

ALTER TABLE [projectComponent] ADD FOREIGN KEY ([projectId]) REFERENCES [project] ([id])
GO

ALTER TABLE [subContractor] ADD FOREIGN KEY ([id]) REFERENCES [subContractorBid] ([subContractorId])
GO

ALTER TABLE [subContractor] ADD FOREIGN KEY ([id]) REFERENCES [projectComponent] ([subContractorId])
GO

ALTER TABLE [projectComponent] ADD FOREIGN KEY ([id]) REFERENCES [subContractorBid] ([projectComponentId])
GO

ALTER TABLE [projectComponent] ADD FOREIGN KEY ([id]) REFERENCES [projectComponentImages] ([projectComponentId])
GO

ALTER TABLE [userProfile] ADD FOREIGN KEY ([id]) REFERENCES [subContractorBid] ([userProfileId])
GO

ALTER TABLE [subContractor] ADD FOREIGN KEY ([id]) REFERENCES [subContractorJobType] ([subContractorId])
GO

ALTER TABLE [subContractorType] ADD FOREIGN KEY ([id]) REFERENCES [subContractorJobType] ([subContractorType])
GO

ALTER TABLE [userProfile] ADD FOREIGN KEY ([id]) REFERENCES [subContractor] ([userProfileId])
GO
