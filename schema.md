User
---
username: string,
email: string,
profileId: int,
lastLogin: time

Profile
---
userId: int,
locationId: int,

photo: text,

about: text,
talents: array[text]
favorites: array[text],
whyMe: text

gender: string,
age: integer
maritalStatus: string,
height: integer,
bodyType: string,
children: integer,
occupation: string,
pets: string


Location
----
city: string
state_id: integer,
country_id: integer,
zip: string,
distance: integer


State
----
longName: string,
shortName: string,


Country
---
name: string




