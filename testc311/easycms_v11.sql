/*
Navicat MySQL Data Transfer

Source Server         : 192.168.2.139
Source Server Version : 50621
Source Host           : 192.168.2.139:3306
Source Database       : easycms_v11

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-08-27 11:12:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `ec_department`
-- ----------------------------
DROP TABLE IF EXISTS `ec_department`;
CREATE TABLE `ec_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `department_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '部门名称',
  `parent_id` int(11) DEFAULT NULL COMMENT '父级部门ID',
  `top_role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `department_fk` (`parent_id`),
  KEY `fk_role` (`top_role_id`),
  CONSTRAINT `ec_department_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `ec_department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_role` FOREIGN KEY (`top_role_id`) REFERENCES `ec_role` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ec_department
-- ----------------------------
INSERT INTO `ec_department` VALUES ('1', 'TOP', null, '1');

-- ----------------------------
-- Table structure for `ec_members`
-- ----------------------------
DROP TABLE IF EXISTS `ec_members`;
CREATE TABLE `ec_members` (
  `id` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT 'UUID',
  `login_id` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '登录ID',
  `firstname` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Firstname',
  `lastname` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Lastname',
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'email',
  `register_time` datetime NOT NULL COMMENT '注册时间',
  `register_ip` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '注册IP',
  `current_login_time` datetime DEFAULT NULL COMMENT '当前登录时间',
  `current_login_ip` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '当前登录IP',
  `last_login_time` datetime DEFAULT NULL COMMENT '上次登录时间',
  `last_login_ip` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '上次登录IP',
  `is_del` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除标识',
  `login_times` int(11) DEFAULT NULL COMMENT '登录次数',
  `account_type` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ec_members
-- ----------------------------
INSERT INTO `ec_members` VALUES ('297efa124f6cd885014f6cd947400000', 'chenglong', 'chenglong', 'wang', '594afe5e1f8ac83827ca43434f7dae1a', 'chenglong@globalroam.com', '2015-08-27 09:50:23', '192.168.2.139', null, '192.168.2.139', null, null, '0', null, 'FRONTEND');
INSERT INTO `ec_members` VALUES ('297efa124f6d016e014f6d06341e0000', 'jiepeng', 'jiepeng', 'deng', '46c1f4de4c61dd8621e270eb0b078125', 'jiepeng@globalroam.com', '2015-08-27 10:39:27', '192.168.2.139', null, '192.168.2.139', null, null, '0', null, 'FRONTEND');

-- ----------------------------
-- Table structure for `ec_menu`
-- ----------------------------
DROP TABLE IF EXISTS `ec_menu`;
CREATE TABLE `ec_menu` (
  `id` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'UID',
  `menu_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'menu name',
  `seq` int(255) NOT NULL DEFAULT '0' COMMENT 'sequence',
  `icon_path` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'icon path',
  `style` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'menu style',
  `privilege_id` int(255) DEFAULT NULL,
  `parent_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'parent ID',
  PRIMARY KEY (`id`),
  KEY `m_p_fk` (`privilege_id`),
  KEY `m_m_fk` (`parent_id`),
  CONSTRAINT `ec_menu_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `ec_menu` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `ec_menu_ibfk_2` FOREIGN KEY (`privilege_id`) REFERENCES `ec_privilege` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ec_menu
-- ----------------------------
INSERT INTO `ec_menu` VALUES ('297efa124f4fe4a4014f4fed6b500000', 'Option', '0', '', 'icon-cogs', null, null);
INSERT INTO `ec_menu` VALUES ('297efa124f4fe4a4014f4fede9ca0001', 'Setting', '0', '', null, '1939', '297efa124f4fe4a4014f4fed6b500000');
INSERT INTO `ec_menu` VALUES ('4028820b4de223b4014de223c2d20000', 'Menu', '10', '', '', '1913', '4028820b4de2263e014de22707420000');
INSERT INTO `ec_menu` VALUES ('4028820b4de223b4014de223c32a0001', 'Create Menu', '10', '', '', '1914', '4028820b4de223b4014de223c2d20000');
INSERT INTO `ec_menu` VALUES ('4028820b4de223b4014de223c35d0002', 'Edit Menu', '9', '', '', '1915', '4028820b4de223b4014de223c2d20000');
INSERT INTO `ec_menu` VALUES ('4028820b4de223b4014de223c39f0003', 'Delete Menu', '0', '', '', '1916', '4028820b4de223b4014de223c2d20000');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22707420000', 'Menu Management', '0', '', 'icon-list-alt', null, null);
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22937af0001', 'Operator', '0', '', 'icon-group', null, null);
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22960f90002', 'Operator Management', '10', '', '', '1918', '4028820b4de2263e014de22937af0001');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22984c40003', 'Create Operator', '0', '', '', '1919', '4028820b4de2263e014de22960f90002');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de229a3440004', 'Edit Operator', '0', '', null, '1921', '4028820b4de2263e014de22960f90002');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de229d3790005', 'View Operator', '0', '', '', '1920', '4028820b4de2263e014de22960f90002');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de229efbd0006', 'Delete Operator', '0', '', '', '1922', '4028820b4de2263e014de22960f90002');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22bb0d70007', 'Role Management', '9', '', '', '1929', '4028820b4de2263e014de22937af0001');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22bdbc60008', 'Create Role', '0', '', '', '1930', '4028820b4de2263e014de22bb0d70007');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22d141a0009', 'Edit Role', '0', '', '', '1931', '4028820b4de2263e014de22bb0d70007');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22d59ab000a', 'Dispatch Role', '0', '', null, '1923', '4028820b4de2263e014de22960f90002');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22d87ea000b', 'Reset Password', '0', '', null, '1924', '4028820b4de2263e014de22960f90002');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22dc365000c', 'Delete Role', '0', '', '', '1932', '4028820b4de2263e014de22bb0d70007');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22e1e36000d', 'Department Management', '0', '', '', '1925', '4028820b4de2263e014de22937af0001');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22e441a000e', 'Create Department', '0', '', null, '1926', '4028820b4de2263e014de22e1e36000d');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22e6c7a000f', 'Edit Department', '0', '', null, '1927', '4028820b4de2263e014de22e1e36000d');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22e8abf0010', 'Delete Department', '0', '', null, '1928', '4028820b4de2263e014de22e1e36000d');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22ec9f70011', 'Privilege', '0', '', null, '1933', '4028820b4de2263e014de22707420000');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22eee690012', 'Create Privilege', '0', '', null, '1934', '4028820b4de2263e014de22ec9f70011');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22f12ea0013', 'Edit Privilege', '0', '', null, '1935', '4028820b4de2263e014de22ec9f70011');
INSERT INTO `ec_menu` VALUES ('4028820b4de2263e014de22f383c0014', 'Delete Privilege', '0', '', null, '1936', '4028820b4de2263e014de22ec9f70011');
INSERT INTO `ec_menu` VALUES ('4028824c4de6705f014de6e17f6c0036', 'Upload Icon', '0', '', null, '1937', '4028820b4de223b4014de223c2d20000');

-- ----------------------------
-- Table structure for `ec_privilege`
-- ----------------------------
DROP TABLE IF EXISTS `ec_privilege`;
CREATE TABLE `ec_privilege` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'default ID',
  `privilege_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'privilege name',
  `uri` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'privilege URI',
  `menu_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `p_m_fk` (`menu_id`),
  CONSTRAINT `ec_privilege_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `ec_menu` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2052 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ec_privilege
-- ----------------------------
INSERT INTO `ec_privilege` VALUES ('1913', 'Menu', '/management/menu', '4028820b4de223b4014de223c2d20000', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1914', 'Create Menu', '/management/menu/add', '4028820b4de223b4014de223c32a0001', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1915', 'Edit Menu', '/management/menu/edit', '4028820b4de223b4014de223c35d0002', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1916', 'Delete Menu', '/management/menu/delete', '4028820b4de223b4014de223c39f0003', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1918', 'Operator Management', '/management/user', '4028820b4de2263e014de22960f90002', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1919', 'Create Operator', '/management/user/add', '4028820b4de2263e014de22984c40003', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1920', 'View Operator', '/management/user/show', '4028820b4de2263e014de229d3790005', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1921', 'Edit Operator', '/management/user/edit', '4028820b4de2263e014de229a3440004', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1922', 'Delete Operator', '/management/user/delete', '4028820b4de2263e014de229efbd0006', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1923', 'Dispatch Role', '/management/user/role', '4028820b4de2263e014de22d59ab000a', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1924', 'Reset Password', '/management/user/password', '4028820b4de2263e014de22d87ea000b', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1925', 'Department Management', '/management/department', '4028820b4de2263e014de22e1e36000d', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1926', 'Create Department', '/management/department/add', '4028820b4de2263e014de22e441a000e', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1927', 'Edit Department', '/management/department/edit', '4028820b4de2263e014de22e6c7a000f', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1928', 'Delete Department', '/management/department/delete', '4028820b4de2263e014de22e8abf0010', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1929', 'Role Management', '/management/role', '4028820b4de2263e014de22bb0d70007', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1930', 'Create Role', '/management/role/add', '4028820b4de2263e014de22bdbc60008', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1931', 'Edit Role', '/management/role/edit', '4028820b4de2263e014de22d141a0009', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1932', 'Delete Role', '/management/role/delete', '4028820b4de2263e014de22dc365000c', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1933', 'Privilege Management', '/management/privilege', '4028820b4de2263e014de22ec9f70011', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1934', 'Create Privilege', '/management/privilege/add', '4028820b4de2263e014de22eee690012', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1935', 'Edit Privilege', '/management/privilege/edit', '4028820b4de2263e014de22f12ea0013', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1936', 'Delete Privilege', '/management/privilege/delete', '4028820b4de2263e014de22f383c0014', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1937', 'Upload Icon', '/management/privilege/upload', '4028824c4de6705f014de6e17f6c0036', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('1939', 'Setting', '/management/settings/website', '297efa124f4fe4a4014f4fede9ca0001', '2015-06-11 18:13:35', null);
INSERT INTO `ec_privilege` VALUES ('2044', 'Operator', '/management/usergroup', null, '2015-08-21 18:37:10', null);
INSERT INTO `ec_privilege` VALUES ('2045', 'Option', '/management/settings', null, '2015-08-21 18:37:10', null);

-- ----------------------------
-- Table structure for `ec_role`
-- ----------------------------
DROP TABLE IF EXISTS `ec_role`;
CREATE TABLE `ec_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '角色名',
  `parent_id` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `coexist` tinyint(1) DEFAULT NULL COMMENT '并存',
  PRIMARY KEY (`id`),
  KEY `ec_parent_fk` (`parent_id`),
  CONSTRAINT `ec_parent_fk` FOREIGN KEY (`parent_id`) REFERENCES `ec_role` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ec_role
-- ----------------------------
INSERT INTO `ec_role` VALUES ('1', '管理员', null, '1', '0');
INSERT INTO `ec_role` VALUES ('2', '网站编辑', '1', '2', '1');
INSERT INTO `ec_role` VALUES ('3', '超级管理员', null, '1', '0');
INSERT INTO `ec_role` VALUES ('4', '美工', '2', '3', '0');
INSERT INTO `ec_role` VALUES ('5', '测试人员', '3', '2', '1');

-- ----------------------------
-- Table structure for `ec_role_menu`
-- ----------------------------
DROP TABLE IF EXISTS `ec_role_menu`;
CREATE TABLE `ec_role_menu` (
  `role_id` int(255) NOT NULL,
  `menu_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  KEY `r_middle_fk` (`role_id`),
  KEY `m_middle_fk` (`menu_id`),
  CONSTRAINT `ec_role_menu_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `ec_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ec_role_menu_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `ec_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ec_role_menu
-- ----------------------------
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22937af0001');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22960f90002');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22d87ea000b');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22d59ab000a');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de229efbd0006');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de229d3790005');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de229a3440004');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22984c40003');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22bb0d70007');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22dc365000c');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22d141a0009');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22bdbc60008');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22e1e36000d');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22e8abf0010');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22e6c7a000f');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22e441a000e');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22707420000');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de223b4014de223c2d20000');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de223b4014de223c32a0001');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de223b4014de223c35d0002');
INSERT INTO `ec_role_menu` VALUES ('3', '4028824c4de6705f014de6e17f6c0036');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de223b4014de223c39f0003');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22ec9f70011');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22f383c0014');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22f12ea0013');
INSERT INTO `ec_role_menu` VALUES ('3', '4028820b4de2263e014de22eee690012');
INSERT INTO `ec_role_menu` VALUES ('3', '297efa124f4fe4a4014f4fed6b500000');
INSERT INTO `ec_role_menu` VALUES ('3', '297efa124f4fe4a4014f4fede9ca0001');
INSERT INTO `ec_role_menu` VALUES ('4', '4028820b4de2263e014de22707420000');
INSERT INTO `ec_role_menu` VALUES ('4', '4028820b4de223b4014de223c2d20000');
INSERT INTO `ec_role_menu` VALUES ('4', '4028820b4de223b4014de223c32a0001');
INSERT INTO `ec_role_menu` VALUES ('4', '4028820b4de223b4014de223c35d0002');
INSERT INTO `ec_role_menu` VALUES ('4', '4028824c4de6705f014de6e17f6c0036');
INSERT INTO `ec_role_menu` VALUES ('4', '4028820b4de223b4014de223c39f0003');
INSERT INTO `ec_role_menu` VALUES ('4', '4028820b4de2263e014de22ec9f70011');
INSERT INTO `ec_role_menu` VALUES ('4', '4028820b4de2263e014de22f383c0014');
INSERT INTO `ec_role_menu` VALUES ('4', '4028820b4de2263e014de22f12ea0013');
INSERT INTO `ec_role_menu` VALUES ('4', '4028820b4de2263e014de22eee690012');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22937af0001');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22960f90002');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22d87ea000b');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22d59ab000a');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de229efbd0006');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de229d3790005');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de229a3440004');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22984c40003');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22bb0d70007');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22dc365000c');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22d141a0009');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22bdbc60008');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22e1e36000d');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22e8abf0010');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22e6c7a000f');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22e441a000e');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22707420000');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de223b4014de223c2d20000');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de223b4014de223c32a0001');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de223b4014de223c35d0002');
INSERT INTO `ec_role_menu` VALUES ('1', '4028824c4de6705f014de6e17f6c0036');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de223b4014de223c39f0003');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22ec9f70011');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22f383c0014');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22f12ea0013');
INSERT INTO `ec_role_menu` VALUES ('1', '4028820b4de2263e014de22eee690012');
INSERT INTO `ec_role_menu` VALUES ('1', '297efa124f4fe4a4014f4fed6b500000');
INSERT INTO `ec_role_menu` VALUES ('1', '297efa124f4fe4a4014f4fede9ca0001');
INSERT INTO `ec_role_menu` VALUES ('2', '4028820b4de2263e014de22707420000');
INSERT INTO `ec_role_menu` VALUES ('2', '4028820b4de223b4014de223c2d20000');
INSERT INTO `ec_role_menu` VALUES ('2', '4028820b4de223b4014de223c32a0001');
INSERT INTO `ec_role_menu` VALUES ('2', '4028820b4de223b4014de223c35d0002');
INSERT INTO `ec_role_menu` VALUES ('2', '4028824c4de6705f014de6e17f6c0036');
INSERT INTO `ec_role_menu` VALUES ('2', '4028820b4de223b4014de223c39f0003');
INSERT INTO `ec_role_menu` VALUES ('2', '4028820b4de2263e014de22ec9f70011');
INSERT INTO `ec_role_menu` VALUES ('2', '4028820b4de2263e014de22f383c0014');
INSERT INTO `ec_role_menu` VALUES ('2', '4028820b4de2263e014de22f12ea0013');
INSERT INTO `ec_role_menu` VALUES ('2', '4028820b4de2263e014de22eee690012');
INSERT INTO `ec_role_menu` VALUES ('2', '297efa124f4fe4a4014f4fed6b500000');
INSERT INTO `ec_role_menu` VALUES ('2', '297efa124f4fe4a4014f4fede9ca0001');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22937af0001');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22960f90002');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22d87ea000b');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22d59ab000a');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de229efbd0006');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de229d3790005');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de229a3440004');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22984c40003');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22bb0d70007');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22dc365000c');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22d141a0009');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22bdbc60008');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22e1e36000d');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22e8abf0010');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22e6c7a000f');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22e441a000e');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22707420000');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de223b4014de223c2d20000');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de223b4014de223c32a0001');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de223b4014de223c35d0002');
INSERT INTO `ec_role_menu` VALUES ('5', '4028824c4de6705f014de6e17f6c0036');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de223b4014de223c39f0003');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22ec9f70011');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22f383c0014');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22f12ea0013');
INSERT INTO `ec_role_menu` VALUES ('5', '4028820b4de2263e014de22eee690012');
INSERT INTO `ec_role_menu` VALUES ('5', '297efa124f5f13ee014f5f3157ca0000');
INSERT INTO `ec_role_menu` VALUES ('5', '297efa124f5f13ee014f5f3176a80001');
INSERT INTO `ec_role_menu` VALUES ('5', '297efa124f5f13ee014f5f322e2b0004');
INSERT INTO `ec_role_menu` VALUES ('5', '297efa124f5f13ee014f5f31f2000003');
INSERT INTO `ec_role_menu` VALUES ('5', '297efa124f5f13ee014f5f31cc3c0002');
INSERT INTO `ec_role_menu` VALUES ('5', '297efa124f4fe4a4014f4fed6b500000');
INSERT INTO `ec_role_menu` VALUES ('5', '297efa124f4fe4a4014f4fede9ca0001');

-- ----------------------------
-- Table structure for `ec_role_privilege`
-- ----------------------------
DROP TABLE IF EXISTS `ec_role_privilege`;
CREATE TABLE `ec_role_privilege` (
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `privilege_id` int(11) NOT NULL COMMENT '权限ID',
  PRIMARY KEY (`role_id`,`privilege_id`),
  KEY `fk_role_privilege` (`role_id`),
  KEY `fk_privilege_role` (`privilege_id`),
  CONSTRAINT `ec_role_privilege_ibfk_1` FOREIGN KEY (`privilege_id`) REFERENCES `ec_privilege` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ec_role_privilege_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `ec_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ec_role_privilege
-- ----------------------------

-- ----------------------------
-- Table structure for `ec_site`
-- ----------------------------
DROP TABLE IF EXISTS `ec_site`;
CREATE TABLE `ec_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '默认ID',
  `site_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '网站名称',
  `site_domain` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '域名',
  `site_key` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '关键字',
  `site_describe` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '网站描述',
  `site_tpl_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '模板名称',
  `upload_max_size` int(11) DEFAULT '0' COMMENT '上传文件大小',
  `upload_tpl_dir` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '模板上传目录',
  `tpl_file_type` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '模板上传类型',
  `upload_res_dir` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '资源上传目录',
  `is_local_site` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否本地站点',
  `app_path` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '站点绝对路径',
  `i18n_path` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '国际化目录',
  `pagesize_list` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pagesize` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ec_site
-- ----------------------------
INSERT INTO `ec_site` VALUES ('9', 'EasycmsV1.1', 'easycms.com', 'easycms', 'easycms', 'easycms', null, null, null, null, '1', '/', null, '10,20,50,100', '20');

-- ----------------------------
-- Table structure for `ec_user`
-- ----------------------------
DROP TABLE IF EXISTS `ec_user`;
CREATE TABLE `ec_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '默认ID',
  `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名唯一',
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `real_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '真是姓名',
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'email',
  `register_time` datetime NOT NULL COMMENT '注册时间',
  `register_ip` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '127.0.0.1' COMMENT '注册IP',
  `current_login_time` datetime DEFAULT NULL COMMENT '当前登录时间',
  `current_login_ip` varchar(50) COLLATE utf8_unicode_ci DEFAULT '127.0.0.1' COMMENT '当前登录IP',
  `last_login_time` datetime DEFAULT NULL COMMENT '上次登录时间',
  `last_login_ip` varchar(50) COLLATE utf8_unicode_ci DEFAULT '127.0.0.1' COMMENT '上次登录IP',
  `login_times` int(11) DEFAULT NULL COMMENT '登录次数',
  `is_default_admin` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否默认管理员',
  `is_del` tinyint(1) DEFAULT '0',
  `device` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `parent_id` int(100) DEFAULT NULL,
  `department_id` int(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `fk_parent` (`parent_id`),
  KEY `fk_department` (`department_id`),
  CONSTRAINT `fk_department` FOREIGN KEY (`department_id`) REFERENCES `ec_department` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_parent` FOREIGN KEY (`parent_id`) REFERENCES `ec_user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ec_user
-- ----------------------------
INSERT INTO `ec_user` VALUES ('8', 'admin', '594afe5e1f8ac83827ca43434f7dae1a', '邓洁芃', '', '2014-01-01 18:20:59', '127.0.0.1', '2015-08-27 10:55:14', '192.168.2.139', '2015-08-27 10:45:13', '192.168.2.139', '1630', '1', '0', 'zzzzzz', null, null);

-- ----------------------------
-- Table structure for `ec_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `ec_user_role`;
CREATE TABLE `ec_user_role` (
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `fk_ec_user_role` (`user_id`),
  KEY `fk_ec_role_user` (`role_id`),
  CONSTRAINT `ec_user_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `ec_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ec_user_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `ec_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ec_user_role
-- ----------------------------
INSERT INTO `ec_user_role` VALUES ('160', '120');
INSERT INTO `ec_user_role` VALUES ('161', '118');
INSERT INTO `ec_user_role` VALUES ('162', '128');
INSERT INTO `ec_user_role` VALUES ('171', '129');
INSERT INTO `ec_user_role` VALUES ('172', '119');
INSERT INTO `ec_user_role` VALUES ('177', '125');
INSERT INTO `ec_user_role` VALUES ('178', '122');
INSERT INTO `ec_user_role` VALUES ('179', '121');
INSERT INTO `ec_user_role` VALUES ('180', '127');
INSERT INTO `ec_user_role` VALUES ('181', '124');
INSERT INTO `ec_user_role` VALUES ('182', '126');
INSERT INTO `ec_user_role` VALUES ('197', '147');
INSERT INTO `ec_user_role` VALUES ('199', '149');
