create table comments
(
	comment_id int identity,
	author varchar(20) not null,
	text varchar(500) not null,
	parent_id int not null,
	is_subComment bit not null
)
go

create unique index comments_comment_id_uindex
	on comments (comment_id)
go

alter table comments
	add constraint comments_pk
		primary key nonclustered (comment_id)
go

create table posts
(
	post_id int identity,
	title varchar(100) not null,
	text varchar(max) not null,
	author varchar(20)
)
go

create unique index posts_post_id_uindex
	on posts (post_id)
go

alter table posts
	add constraint posts_pk
		primary key nonclustered (post_id)
go

create table users
(
	user_id int identity,
	username varchar(20) not null,
	password varchar(120) not null,
	salt varchar(18) not null
)
go

create unique index users_user_id_uindex
	on users (user_id)
go

alter table users
	add constraint users_pk
		primary key nonclustered (user_id)
go


