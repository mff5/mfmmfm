------------------------------------------sequence--------------------------------------

create sequence member_seq start with 1 increment by 1 nocache nocycle;
create sequence manager_seq start with 1 increment by 1 nocache nocycle;
create sequence admin_seq start with 1 increment by 1 nocache nocycle;
create sequence office_seq start with 1 increment by 1 nocache nocycle;
create sequence office_image_seq start with 1 increment by 1 nocache nocycle;
create sequence notice_seq start with 1 increment by 1 nocache nocycle;
create sequence review_seq start with 1 increment by 1 nocache nocycle;
create sequence wish_seq start with 1 increment by 1 nocache nocycle;
create sequence booking_seq start with 1 increment by 1 nocache nocycle;

-------------------------------------------table-----------------------------------------
drop table member;
create table member (
                        no       number default member_seq.nextval primary key,             -- 구분 코드
                        id       varchar2(30) check ( length(id) >= 6 ) not null unique,    -- 아이디 (6자 이상 12자 이하 한글x)
                        pw       varchar2(100) not null,           							-- 비밀번호 (8자 이상 16자 이하 한글x, 영문 대문자, 소문자, 숫자, 특수문자 각 1개씩 포함)
                        name     nvarchar2(30) check ( length(name) >= 2 ) not null,         -- 이름 (2자 이상 12자 이하 영어x)
                        phone    char(11) null,                                         -- 번호 (번호, 이메일 둘 중 하나만 필수)
                        email    varchar2(32) default null,                                 -- 이메일 (번호, 이메일 둘 중 하나만 필수)
                        birth    date not null,                                             -- 생일
                        gender   varchar2(1) default null,                                  -- 성별 ('M', 'W' // 선택)
                        reg_date date default systimestamp                                  -- 가입일
);
ALTER TABLE member MODIFY phone NULL;

-----------------------------------------------------------------------------------------

create table manager (
                         no       number default manager_seq.nextval primary key,            -- 구분 코드
                         id       varchar2(12) check ( length(id) >= 6 ) not null unique,    -- 오피스 관리자 아이디 (6자 이상 12자 이하 한글x)
                         pw       varchar2(100) not null,   								    -- 오피스 관리자 비밀번호 (8자 이상 16자 이하 한글x, 영문 대문자, 소문자, 숫자, 특수문자 각 1개씩 포함)
                         name     varchar2(12) check ( length(name) >= 2 ) not null,         -- 오피스 관리자 이름 (2자 이상 12자 이하 영어x)
                         phone    char(11) not null,                                         -- 오피스 관리자 번호 (번호, 이메일 둘 중 하나만 필수)
                         email    varchar2(32) default null,                                 -- 오피스 관리자 이메일 (번호, 이메일 둘 중 하나만 필수)
                         reg_date date default systimestamp                                  -- 가입일
);

-----------------------------------------------------------------------------------------
drop table admin;
create table admin (
                       no       number default admin_seq.nextval primary key,              -- 구분 코드
                       id       varchar2(12) not null unique,  	                        -- 총 관리자 아이디 (6자 이상 12자 이하 한글x)
                       pw       varchar2(100) not null,         							-- 총 관리자 비밀번호 (8자 이상 16자 이하 한글x, 영문 대문자, 소문자, 숫자, 특수문자 각 1개씩 포함)
                       reg_date date default systimestamp                                	-- 가입일
);

-----------------------------------------------------------------------------------------
drop table office;
create table office (
                        no           number default office_seq.nextval primary key,
                        manager_no   number,
                        title        varchar2(255),
                        average_rating float,
                        address      varchar2(255) ,
                        zip_code     varchar2(20),
                        latitude     float,
                        longitude    float ,
                        content      nvarchar2(2000),
                        price        number,
                        capacity     number ,
                        title_img    nvarchar2(255),
                        sub_img1     nvarchar2(255) ,
                        sub_img2     nvarchar2(255) ,
                        availability char(1) default 1,
                        reg_date     date default systimestamp
);


-----------------------------------------------------------------------------------------

create table notice (
                        no         number default notice_seq.nextval primary key,           -- 구분 코드
                        title      varchar2(100) not null,                                  -- 제목
                        content    varchar2(4000) not null,                                 -- 내용
                        view_count number not null,            		                        -- 조회 수
                        reg_date   date default systimestamp                                -- 생성일
);

-----------------------------------------------------------------------------------------
drop table review;
create table review (
                        no        number default review_seq.nextval primary key,            -- 구분 코드
                        member_no number												    -- 작성자
                            references member ( no )
                                on delete cascade,
                        office_no number												    -- 오피스
                            references office ( no )
                                on delete cascade,
                        rating    number check ( rating between 0 and 5 ) not null, 	    -- 점수
                        content   varchar2(4000) not null,         						    -- 내용
                        reg_date  date default systimestamp        						    -- 생성일
);

-----------------------------------------------------------------------------------------


drop sequence reservation_seq;
create sequence reservation_seq start with 1 increment by 1;
drop table reservation;
create table reservation (
                         no         number default reservation_seq.nextval primary key,          -- 구분 코드
                         office_no  number,					                        -- 오피스 번호
                         member_no  number,                  -- 멤버
                         guests number not null,			                        -- 예약자
                         payment_method    nvarchar2(20) not null,			                        -- 결제 수단
                         start_date date not null,               	                        -- 예약 시작일
                         end_date   date not null,               	                        -- 예약 종료일
                         price      number(10) not null,        		                        -- 예약 금액
                         reg_date   date default systimestamp, 		                        -- 예약일
                         constraint chk_date check ( start_date <= end_date )                -- 예약 조건
);


SELECT
    CASE
        WHEN TRUNC(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 10 AND 19 THEN '10대'
        WHEN TRUNC(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 20 AND 29 THEN '20대'
        WHEN TRUNC(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 30 AND 39 THEN '30대'
        WHEN TRUNC(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 40 AND 49 THEN '40대'
        WHEN TRUNC(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 50 AND 59 THEN '50대'
        ELSE '60대 이상'
        END AS ageGroup,
    COUNT(*) AS memberCount
FROM member
GROUP BY CASE
             WHEN TRUNC(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 10 AND 19 THEN '10대'
             WHEN TRUNC(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 20 AND 29 THEN '20대'
             WHEN TRUNC(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 30 AND 39 THEN '30대'
             WHEN TRUNC(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 40 AND 49 THEN '40대'
             WHEN TRUNC(MONTHS_BETWEEN(SYSDATE, birth) / 12) BETWEEN 50 AND 59 THEN '50대'
             ELSE '60대 이상'
             END;


SELECT COUNT(*)
FROM member
WHERE reg_date >= TRUNC(ADD_MONTHS(SYSDATE, -1))
  AND reg_date < TRUNC(SYSDATE);


select count(*) from MEMBER where GENDER = 'M';

SELECT count(*) FROM MEMBER
WHERE REG_DATE >= '2024-08-01'
  and REG_DATE < '2024-08-10'