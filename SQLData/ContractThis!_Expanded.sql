USE [master]



IF db_id('ContractThis') IS NULL
	CREATE DATABASE [ContractThis]
GO

USE [ContractThis]
GO


DROP TABLE IF EXISTS [Project];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [SubContractor];
DROP TABLE IF EXISTS [ProjectComponent];
DROP TABLE IF EXISTS [ProjectComponentImages];
DROP TABLE IF EXISTS [SubContractorBid];
DROP TABLE IF EXISTS [SubContractorType];
DROP TABLE IF EXISTS [SubContractorJobType];
GO

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserFirstName] nvarchar(25) NOT NULL,
  [UserLastName] nvarchar(25) NOT NULL,
  [UserScreenName] nvarchar(25) NOT NULL,
  [UserEmail] nvarchar(25) NOT NULL,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [UserImageUrl] nvarchar(255),
  [IsSubcontractor] bit,

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [Project] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [ProjectName] nvarchar(25) NOT NULL,
  [LocationName] nvarchar(50),
  [LocationAddress] nvarchar(50),
  [ProjectDiscription] nvarchar(255) NOT NULL,
  [Budget] integer,
  [DateComplete] datetime,
  [ProjectImagUrl] nvarchar(255),

  CONSTRAINT [FK_User_Project] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),

)
GO



CREATE TABLE [SubContractor] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT Null,
  [SubContractorBusinessName] nvarchar(25),
  [SubContractorImageUrl] nvarchar(255),

  CONSTRAINT [FK_User_IsSubcontractor] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
)
GO

CREATE TABLE [ProjectComponent] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(25) NOT NULL,
  [ComponentDiscription] nvarchar(255) NOT NULL,
  [ProjectId] integer,
  [SubContractorId] integer,
  [DateComplete] datetime,
  [MaterialCost] integer,

  CONSTRAINT [FK_Project_Component] FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([Id]),
  CONSTRAINT [FK_Project_SubContractor] FOREIGN KEY ([SubContractorId]) REFERENCES [SubContractor] ([Id]),
)
GO

CREATE TABLE [ProjectComponentImages] (
  [Id] integer PRIMARY KEY IDENTITY,
  [ProjectComponentId] integer,
  [ProjectComponentImageUrl] nvarchar(255)
)
GO

CREATE TABLE [SubContractorBid] (
  [Id] integer PRIMARY KEY IDENTITY,
  [ProjectComponentId] integer,
  [SubContractorId] integer,
  [UserProfileId] integer,
  [Fee] integer,
  [SubAccepted] datetime,
  [OwnerComment] nvarchar(255),

  CONSTRAINT [FK_Bid_SubContractor] FOREIGN KEY ([SubContractorId]) REFERENCES [SubContractor] ([Id]),
  CONSTRAINT [FK_Bid_Owner] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Bid_Project] FOREIGN KEY ([ProjectComponentId]) REFERENCES [ProjectComponent] ([Id]),
)
GO

CREATE TABLE [SubContractorType] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Speciality] nvarchar(25)
)
GO

CREATE TABLE [SubContractorJobType] (
  [Id] integer PRIMARY KEY IDENTITY,
  [SubContractorTypeId] integer,
  [SubContractorId] integer

  CONSTRAINT [FK_SubJobType_SubContractor] FOREIGN KEY ([SubContractorId]) REFERENCES [SubContractor] ([Id]),
  CONSTRAINT [FK_SubJobType_Type] FOREIGN KEY ([SubContractorTypeId]) REFERENCES [SubContractorType] ([Id]),
)
GO

CREATE TABLE [ComponentMaterial] (
	[Id] integer PRIMARY KEY IDENTITY,
	[ProjectComponentId] integer, 
	[MaterialName] nvarchar(25),
	[Cost] integer,
	[QuantityOnHand] integer,
	[QuantityRequired] integer,
	[QuantityUsed] integer,
	[Notes] nvarchar(25)
)
GO

