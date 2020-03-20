SET NAMES UTF8;
DROP DATABASE IF EXISTS oa666;
CREATE DATABASE oa666 CHARSET=UTF8;
USE oa666;


/**用户信息**/
CREATE TABLE oa666_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),          #工号
  upwd VARCHAR(32),           #密码
  user_name VARCHAR(32),      #姓名，如王小明
  department VARCHAR(16),     #部门
  did INT,                    #部门编号
  position VARCHAR(16),       #职位
  p_level INT,                #职级
  phone VARCHAR(16),          #手机号
  email VARCHAR(64),          #邮箱
  d_charge VARCHAR(16),       #直接主管
  avatar VARCHAR(128),        #头像图片路径
  gender INT,                 #性别  0-女  1-男
  isLeader INT,               #是否部门负责人  0-否  1-是
  first_char VARCHAR(8)       #姓名首字母
);

/**出差工作流**/
CREATE TABLE oa666_bt(
  bid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,                  #用户ID
  uname VARCHAR(32),        #提交人工号
  user_name VARCHAR(32),    #提交人姓名姓名
  serial VARCHAR(32),       #工作流编号
  type VARCHAR(16),         #单据类型
  origin VARCHAR(16),       #出发城市
  destination VARCHAR(32),  #目的城市
  startdate VARCHAR(32),    #开始时间
  enddate VARCHAR(32),      #结束时间
  status INT,               #工作流状态  0-待提交 1-已提交  2-审核中  3-审批完成  4-已退回
  stime BIGINT,             #工作流发起时间
  current VARCHAR(16),      #当前审批人
  remark VARCHAR(128),      #摘要
  ftime BIGINT,             #最后处理时间
  expense FLOAT(10,2),      #费用预估
  spyj VARCHAR(128)         #审批意见
);


/*******************/
/******数据导入******/
/*******************/
INSERT INTO oa666_user VALUES
#人事部
(NULL,'admin','123456','admin','总经办', 1 ,'权限管理员',5,'18812345673','admin@best.com','王思聪','http://127.0.0.1:3030/tx/01.jpg',1,0,'a'),
(NULL,'A0005','123456','王思聪','总经办', 1 ,'总经理',6,'18812345678','wangsicong@best.com','王思聪','http://127.0.0.1:3030/tx/06.jpg',1,1,'W'),
(NULL,'A0001','123456','曹操','人事部', 8 ,'人事助理',1,'18812345674','caocao@best.com','刘备','http://127.0.0.1:3030/tx/02.jpg',1,0,'C'),
(NULL,'A0002','123456','周瑜','人事部', 8 ,'人事专员',2,'18812345675','zhouyu@best.com','刘备','http://127.0.0.1:3030/tx/03.jpg',1,0,'Z'),
(NULL,'A0003','123456','刘备','人事部', 8 ,'人事主管',3,'18812345676','liubei@best.com','狄仁杰','http://127.0.0.1:3030/tx/04.jpg',1,0,'L'),
(NULL,'A0004','123456','狄仁杰','人事部', 8 ,'人事经理',4,'18812345677','direnjie@best.com','王思聪','http://127.0.0.1:3030/tx/05.jpg',1,1,'D'),

#财务部
(NULL,'A0006','123456','安其拉','财务部', 2 ,'财务经理',4,'18812345611','anqila@best.com','王思聪','http://127.0.0.1:3030/tx/07.jpg',1,1,'A'),
(NULL,'A0007','123456','妲己','财务部', 2 ,'财务助理',1,'18812345612','daji@best.com','大乔','http://127.0.0.1:3030/tx/08.jpg',1,0,'D'),
(NULL,'A0008','123456','小乔','财务部', 2 ,'财务助理',1,'18812345613','xiaoqiao@best.com','大乔','http://127.0.0.1:3030/tx/09.jpg',1,0,'X'),
(NULL,'A0009','123456','大乔','财务部', 2 ,'财务主管',3,'18812345614','daqiao@best.com','安其拉','http://127.0.0.1:3030/tx/10.jpg',1,0,'D'),
#运营部
(NULL,'A0010','123456','张良','运营部', 3 ,'运营经理',4,'18812345621','zhangliang@best.com','王思聪','http://127.0.0.1:3030/tx/11.jpg',1,1,'Z'),
(NULL,'A0011','123456','姜子牙','运营部', 3 ,'运营助理',1,'18812345622','ziya@best.com','花木兰','http://127.0.0.1:3030/tx/12.jpg',1,0,'J'),
(NULL,'A0012','123456','赵云','运营部', 3 ,'运营助理',1,'18812345623','yun@best.com','花木兰','http://127.0.0.1:3030/tx/13.jpg',1,0,'Z'),
(NULL,'A0013','123456','花木兰','运营部', 3 ,'运营主管',3,'18812345624','mulan@best.com','张良','http://127.0.0.1:3030/tx/14.jpg',1,0,'H'),

#业务部
(NULL,'A0014','123456','项羽','业务部', 4 ,'业务经理',4,'18812345631','yu@best.com','王思聪','http://127.0.0.1:3030/tx/15.jpg',1,1,'X'),
(NULL,'A0015','123456','兰陵王','业务部', 4 ,'业务助理',1,'18812345632','lan@best.com','高渐离','http://127.0.0.1:3030/tx/16.jpg',1,0,'L'),
(NULL,'A0016','123456','李白','业务部', 4 ,'业务助理',1,'18812345633','bai@best.com','高渐离','http://127.0.0.1:3030/tx/17.jpg',1,0,'L'),
(NULL,'A0017','123456','高渐离','业务部', 4 ,'业务主管',3,'18812345634','gao@best.com','项羽','http://127.0.0.1:3030/tx/18.jpg',1,0,'G'),
#研发部
(NULL,'A0018','123456','哪吒','研发部', 5 ,'研发经理',4,'18812345661','zha@best.com','王思聪','http://127.0.0.1:3030/tx/19.jpg',1,1,'N'),
(NULL,'A0019','123456','王昭君','研发部', 5 ,'研发助理',1,'18812345662','jun@best.com','蔡文姬','http://127.0.0.1:3030/tx/20.jpg',1,0,'W'),
(NULL,'A0020','123456','鲁班','研发部', 5 ,'研发助理',1,'18812345663','ban@best.com','蔡文姬','http://127.0.0.1:3030/tx/21.jpg',1,0,'L'),
(NULL,'A0021','123456','蔡文姬','研发部', 5 ,'研发主管',3,'18812345664','wenji@best.com','哪吒','http://127.0.0.1:3030/tx/22.jpg',1,0,'C');




INSERT INTO oa666_bt VALUES
(NULL,'2','测试','测试','ccsq20191114001','出差申请单','长沙','深圳','20191114','20191118',1,"20191114",'测试4','2019年11月11日长沙-深圳大会出差','20191115',2000.00,'同意');

