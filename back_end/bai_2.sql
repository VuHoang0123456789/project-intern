create database QLSINHVIEN;

use QLSINHVIEN;

create table Student(
	student_id int identity(1,1) not null,
	student_code varchar(100) not null,
	student_name nvarchar(200) not null,
	birth_day date not null default getdate(),
	geneder varchar(20) not null,
	factulty_id int not null,
);

create table Factulty(
	factulty_id int identity(1,1) not null,
	factulty_code varchar(10) not null,
	factulty_name nvarchar(200) not null
);

alter table Student
add constraint pk_student primary key(student_id);

alter table Student
add constraint uq_student unique(student_code);

alter table Factulty
add constraint pk_factulty primary key(factulty_id);

alter table Factulty
add constraint uq_factulty unique(factulty_code);

alter table Student
add constraint fk_factulty foreign key(factulty_id) references Factulty(factulty_id);

alter table Student
add constraint check_geneder check(geneder = 'male' or geneder = 'female' or geneder = 'orther');

/*add factulty data*/
insert into Factulty(factulty_code, factulty_name) values ('cntt', N'Công nghệ thông tin'), ('dtvt', N'Điện tử viễn thông');

/*add student data */
insert into Student(student_code, student_name, birth_day, geneder, factulty_id) values 
('1912111001', N'Nguyễn Mạnh Chính', '2001-01-01', 'male', 1), ('1912111002', N'Lê Duy Quang', '2001-01-02', 'male', 1),
('1912111003', N'Nguyễn Tuấn Hùng', '2001-01-03', 'male', 1), ('1912111004', N'Bùi Công Duy', '2001-01-04', 'male', 1),
('1912111005', N'Phạm Thị Ngọc Anh', '2001-01-04', 'female', 1), ('1912111006', N'Lương Thị Thuỷ', '2001-01-05', 'female', 1),
('1912111007', N'Nguyễn Đình Quyết', '2001-01-06', 'male', 1), ('1912111008', N'Vũ Huy Hoàng', '2001-06-12', 'male', 1),
('1912111009', N'Vũ Hoài Nam', '2001-01-08', 'male', 1), ('1912111010', N'Bùi Đức Thắng', '2000-01-09', 'male', 1),
('1912111011', N'Nguyễn Thanh Hoàng', '2001-01-10', 'male', 1), ('1912111012', N'Phạm Nhật Hoàng', '2001-01-11', 'male', 1),
('1912111013', N'Nguyễn Văn Lương', '2001-01-13', 'male', 1), ('1912111014', N'Trần Văn Kiên', '2001-01-14', 'male', 1),
('1912111015', N'Phạm Thành Long', '2001-01-15', 'male', 1), ('1912111016', N'Nguyễn Quyền Linh', '2001-01-16', 'male', 2),
('1912111017', N'Nguyễn Tuấn Anh', '2001-01-17', 'male', 2), ('1912111018', N'Vũ Tuấn Anh', '2001-01-18', 'male', 2),
('1912111019', N'Cao Thành Minh', '2001-01-19', 'male', 2), ('1912111020', N'Phạm Mạnh Chính', '2001-01-20', 'male', 2);

/*query*/
select count(*) as student_count from Student;/*get student count*/

/*get student count with factulty_name*/
select factulty_name, count(factulty_name) as student_count
from Student inner join Factulty on Student.factulty_id = Factulty.factulty_id
group by Factulty.factulty_name;

/*get student with factulty_name = Công nghệ thôn tin*/
select student_code, student_name, birth_day, geneder, factulty_name
from Student inner join Factulty on Student.factulty_id = Factulty.factulty_id
where factulty_name = N'Công nghệ thông tin';

/*get student with factulty_name = Công nghệ thôn tin and gênder = female*/
select student_code, student_name, birth_day, geneder, factulty_name
from Student inner join Factulty on Student.factulty_id = Factulty.factulty_id
where factulty_name = N'Công nghệ thông tin' and geneder = 'female';

/*get student with factulty_name = Công nghệ thôn tin and gênder = female*/
select student_code, student_name, birth_day, geneder, factulty_name
from Student inner join Factulty on Student.factulty_id = Factulty.factulty_id
where factulty_name = N'Công nghệ thông tin' and geneder = 'female' and MONTH(birth_day) > 6;

/*get student with factulty_name is Công nghệ thông tin and Điện tử viễn thông and gênder = male*/
select student_code, student_name, birth_day, geneder, factulty_name
from Student inner join (
	select factulty_id, factulty_code, factulty_name
	from Factulty
	group by factulty_id, factulty_code, factulty_name
) as TwoFactulties on Student.factulty_id = TwoFactulties.factulty_id
where geneder = 'male';

/*create funcion get student_code-student_name*/
select CONCAT(student_code, ' - ', student_name) from Student;

drop function get_student_code_and_student_name;
create function get_student_code_and_student_name (@studentCode varchar(10))
returns nvarchar(200)
as
begin
	declare @result nvarchar(200) = ''

	select @result =  CONCAT(student_code, ' - ', student_name)
	from Student 
	where student_code = @studentCode;

	return @result;
end;

PRINT dbo.get_student_code_and_student_name('1912111008');

/*create procedure */

create procedure add_new_student(
	@studentCode varchar(10),
	@studentName nvarchar(200),
	@birthDay date,
	@geneder varchar(20),
	@factultyId int
)
as
begin
	insert into Student (student_code, student_name, birth_day, geneder, factulty_id) 
	values (@studentCode, @studentName, @birthDay, @geneder, @factultyId);
end
go

exec add_new_student @studentCode = '1912111021', @studentName = N'Vũ Quốc Huy', @birthDay = '2001-04-21', @geneder = 'male', @factultyId = '1';
go

create procedure update_student(
	@studentCode varchar(10),
	@studentName nvarchar(200),
	@birthDay date,
	@geneder varchar(20),
	@factultyId int
)
as
begin
	update Student set student_name = @studentName, birth_day = @birthDay, geneder = @geneder, factulty_id = @factultyId where student_code = @studentCode;
end
go

exec update_student @studentCode = '1912111021', @studentName = N'Vũ Quốc Thanh', @birthDay = '2001-04-21', @geneder = 'female', @factultyId = '1';
go

create procedure delete_student(@studentCode varchar(10))
as
begin
	delete from Student where student_code = @studentCode
end
go

exec delete_student @studentCode = '1912111021';
go

create procedure search_student(
	@studentCode varchar(10) = 'none',
	@studentName nvarchar(200) = 'none',
	@birthDayStart date = null,
	@birthDayEnd date = null,
	@geneder varchar(20) = 'none'
)
as
begin
	select * 
	from Student 
	where student_code like CONCAT('%',@studentCode, '%') or 
		  student_name like CONCAT('%', @studentName, '%') or 
		  geneder = @geneder or 
		  birth_day >= @birthDayStart and birth_day <= @birthDayEnd
end
go

exec search_student @geneder = 'male';
go
